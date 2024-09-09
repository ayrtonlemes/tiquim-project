import { Request, Response } from "express";
import { CreateRewardDto } from "./reward.types";
import {
  createReward,
  listRewards,
  readReward,
  deleteReward,
  updateReward,
} from "./reward.service";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

// Listar recompensas
const index = async (req: Request, res: Response) => {
  try {
    /*
      #swagger.summary = 'Lista as recompensas'
      #swagger.parameters['campaign'] = {
        in: 'query',
        description: 'ID da campanha para filtrar as recompensas',
        required: false,
        type: 'string'
      }
      #swagger.parameters['skip'] = {
        in: 'query',
        description: 'Número de recompensas a pular (para paginação)',
        required: false,
        type: 'integer'
      }
      #swagger.parameters['take'] = {
        in: 'query',
        description: 'Número de recompensas a retornar',
        required: false,
        type: 'integer'
      }
      #swagger.responses[200] = {
        description: 'Lista de recompensas',
        schema: { type: 'array', items: { $ref: '#/definitions/Reward' } }
      }
      #swagger.responses[500] = {
        description: 'Erro interno do servidor'
      }
    */
    const campaignId = req.query.campaign ? req.query.campaign.toString() : "";
    const skip = req.query.skip ? parseInt(req.query.skip.toString()) : undefined;
    const take = req.query.take ? parseInt(req.query.take.toString()) : undefined;
    const rewards = await listRewards(campaignId, skip, take);
    res.status(StatusCodes.OK).json(rewards);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Criar uma nova recompensa
const create = async (req: Request, res: Response) => {
  const reward = req.body as CreateRewardDto;
  try {
    /*
      #swagger.summary = 'Cria uma nova recompensa'
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Dados da nova recompensa',
        required: true,
        schema: { $ref: '#/definitions/CreateRewardDto' }
      }
      #swagger.responses[201] = {
        description: 'Recompensa criada com sucesso',
        schema: { $ref: '#/definitions/Reward' }
      }
      #swagger.responses[500] = {
        description: 'Erro interno do servidor'
      }
    */
    const newReward = await createReward(reward);
    res.status(StatusCodes.CREATED).json(newReward);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Ler uma recompensa pelo ID
const read = async (req: Request, res: Response) => {
  try {
    /*
      #swagger.summary = 'Obtém uma recompensa específica'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID da recompensa',
        required: true,
        type: 'string'
      }
      #swagger.responses[200] = {
        description: 'Dados da recompensa',
        schema: { $ref: '#/definitions/Reward' }
      }
      #swagger.responses[404] = {
        description: 'Recompensa não encontrada'
      }
      #swagger.responses[500] = {
        description: 'Erro interno do servidor'
      }
    */
    const { id } = req.params;
    const reward = await readReward(id);
    if (!reward) return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    res.status(StatusCodes.OK).json(reward);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Atualizar uma recompensa pelo ID
const update = async (req: Request, res: Response) => {
  const reward = req.body as Partial<CreateRewardDto>;
  try {
    /*
      #swagger.summary = 'Atualiza uma recompensa'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID da recompensa',
        required: true,
        type: 'string'
      }
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Dados atualizados da recompensa',
        required: true,
        schema: { $ref: '#/definitions/CreateRewardDto' }
      }
      #swagger.responses[200] = {
        description: 'Recompensa atualizada com sucesso',
        schema: { $ref: '#/definitions/Reward' }
      }
      #swagger.responses[404] = {
        description: 'Recompensa não encontrada'
      }
      #swagger.responses[500] = {
        description: 'Erro interno do servidor'
      }
    */
    const updatedReward = await updateReward(req.params.id, reward);
    if (!updatedReward) return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    res.status(StatusCodes.OK).json(updatedReward);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Deletar uma recompensa pelo ID
const remove = async (req: Request, res: Response) => {
  try {
    /*
      #swagger.summary = 'Deleta uma recompensa'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID da recompensa',
        required: true,
        type: 'string'
      }
      #swagger.responses[200] = {
        description: 'Recompensa deletada com sucesso',
        schema: { $ref: '#/definitions/Reward' }
      }
      #swagger.responses[404] = {
        description: 'Recompensa não encontrada'
      }
      #swagger.responses[500] = {
        description: 'Erro interno do servidor'
      }
    */
    const { id } = req.params;
    const deletedReward = await deleteReward(id);
    if (!deletedReward) return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    res.status(StatusCodes.OK).json(deletedReward);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export default { index, create, read, update, remove };
