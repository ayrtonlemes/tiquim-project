import { Request, Response } from "express";
import { CreateCampaignDto, UpdateCampaignDto } from "./campaign.types";
import {
  closeCampaign,
  createCampaign,
  deleteCampaign,
  listCampaigns,
  listRegionalCampaigns,
  listUserCampaigns,
  readCampaign,
  updateCampaign,
} from "./campaign.service";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import fs from "fs";
import path from "path";

const index = async (req: Request, res: Response) => {
  try {
    /*
      #swagger.summary = 'Cria um usuário novo.'
      #swagger.parameters['tipoUsuario'] = { description: 'Tipo do usuário' }
      #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/CreateUsuarioDto' }
      }
      #swagger.responses[200] = {
      schema: { $ref: '#/definitions/Usuario' }
      }
      */
    const searchTerm = req.query.q ? req.query.q.toString() : "";
    const skip = req.query.skip ? parseInt(req.query.skip.toString()) : undefined;
    const take = req.query.take ? parseInt(req.query.take.toString()) : undefined;
    const campaigns = await listCampaigns(searchTerm, skip, take);
    res.status(StatusCodes.OK).json(campaigns);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const campaign = req.body as CreateCampaignDto;
  try {
    /*
      #swagger.summary = 'Cria um usuário novo.'
      #swagger.parameters['tipoUsuario'] = { description: 'Tipo do usuário' }
      #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/CreateUsuarioDto' }
      }
      #swagger.responses[200] = {
      schema: { $ref: '#/definitions/Usuario' }
      }
      */
    const uid = req.session.uid!;

    if (req.file) {
      campaign.imageUrl = req.file.filename;
    }
    const newCampaign = await createCampaign(campaign, uid);
    res.status(StatusCodes.OK).json(newCampaign);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const read = async (req: Request, res: Response) => {
  try {
    /*
      #swagger.summary = 'Cria um usuário novo.'
      #swagger.parameters['tipoUsuario'] = { description: 'Tipo do usuário' }
      #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/CreateUsuarioDto' }
      }
      #swagger.responses[200] = {
      schema: { $ref: '#/definitions/Usuario' }
      }
      */
    const { id } = req.params;
    const campaign = await readCampaign(id);
    if (!campaign) return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    res.status(StatusCodes.OK).json(campaign);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const update = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Modifica os atributos de um usuário.'
  #swagger.parameters['id'] = { description: 'ID do usuário' }
  #swagger.parameters['body'] = {
  in: 'body',
  schema: { $ref: '#/definitions/UpdateUsuarioDto' }
  }
  #swagger.responses[200] = {
  schema: { $ref: '#/definitions/Usuario' }
  }
  */
  const { id } = req.params;
  const uid = req.session.uid!;
  const updatedCampaign = req.body as UpdateCampaignDto;

  if (req.file) {
    const oldImageUrl = updatedCampaign.imageUrl;

    if (oldImageUrl) {
      const filePath = path.join(__dirname, "..", "..", "uploads", "campaigns", oldImageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    updatedCampaign.imageUrl = req.file.filename;
  }

  try {
    const campaign = await updateCampaign(id, updatedCampaign, uid);

    if (!campaign) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Campanha não encontrada ou usuário não autorizado" });
    }

    return res.status(StatusCodes.OK).json(campaign);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro ao atualizar a campanha", error });
  }
};

const remove = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Apaga um usuário com base no ID.'
  #swagger.parameters['id'] = { description: 'ID do usuário' }
  */
  const { id } = req.params;
  const uid = req.session.uid!;
  try {
    const deletedCampaign = await deleteCampaign(id, uid);
    const oldImageUrl = deletedCampaign.imageUrl;

    if (oldImageUrl) {
      const filePath = path.join(__dirname, "..", "..", "uploads", "campaigns", oldImageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.status(StatusCodes.NO_CONTENT).json();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const indexUser = async (req: Request, res: Response) => {
  const uid = req.query.userId ? req.query.userId.toString() : req.session.uid!;
  const searchTerm = req.query.q ? req.query.q.toString() : "";
  const { userId } = req.query;
  const skip = req.query.skip ? parseInt(req.query.skip.toString()) : undefined;
  const take = req.query.take ? parseInt(req.query.take.toString()) : undefined;
  try {
    const campaigns = await listUserCampaigns(searchTerm, uid, skip, take, userId as string);
    res.status(StatusCodes.OK).json(campaigns);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const indexRegion = async (req: Request, res: Response) => {
  const { city, state } = req.query;
  const skip = req.query.skip ? parseInt(req.query.skip.toString()) : undefined;
  const take = req.query.take ? parseInt(req.query.take.toString()) : undefined;

  try {
    const campaigns = await listRegionalCampaigns(city as string, state as string, skip, take);
    res.status(StatusCodes.OK).json(campaigns);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const close = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const campaign = await closeCampaign(id);

    if (!campaign) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Campanha não encontrada ou usuário não autorizado" });
    }

    return res.status(StatusCodes.OK).json(campaign);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro ao atualizar a campanha", error });
  }
};

export default { index, create, read, update, remove, indexUser, indexRegion, close };
