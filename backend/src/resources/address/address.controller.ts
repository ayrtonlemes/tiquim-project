import { Request, Response } from "express";
import { createAddress, deleteUserAddress, listAddress, readUserAddress } from "./address.service";
import { StatusCodes } from "http-status-codes";
import { CreateAddressDto } from "./address.types";

const index = async (req: Request, res: Response) => {
  const uid = req.session.uid!;
  const skip = req.query.skip ? parseInt(req.query.skip.toString()) : undefined;
  const take = req.query.take ? parseInt(req.query.take.toString()) : undefined;
  try {
    const address = await listAddress(uid, skip, take);
    res.status(StatusCodes.OK).json(address);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  /*
      #swagger.summary = 'Cria um endereço novo.'
      #swagger.parameters['tipoEndereço'] = { description: 'Tipo endereço' }
      #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/CreateAddressDto' }
      }
      #swagger.responses[200] = {
      schema: { $ref: '#/definitions/Endereço' }
      }
    */
  const address = req.body as CreateAddressDto;

  const uid = req.session.uid!;
  try {
    const newAddress = await createAddress(address, uid);
    res.status(StatusCodes.OK).json(newAddress);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const read = async (req: Request, res: Response) => {
  const uid = req.session.uid!;

  try {
    const userAddress = await readUserAddress(uid);
    res.status(StatusCodes.OK).json(userAddress);
  } catch (err) {
    console.error("Erro ao buscar os endereços", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Não foi possível buscar os endereços." });
  }
};

const remove = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Apaga o endereço com base no ID.'
    #swagger.parameters['id'] = { description: 'ID do endereço' }
    */
  const { id } = req.params;
  const uid = req.session.uid!;
  try {
    const deletedCampaign = await deleteUserAddress(id, uid);
    res.status(StatusCodes.NO_CONTENT).json();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export default { index, read, create, remove };
