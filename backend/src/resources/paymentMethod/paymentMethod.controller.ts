import { Request, Response } from "express";
import { CreatePaymentMethodDto, PaymentMethodDto, PaymentType } from "./paymentMethod.types";
import {
  createPaymentMethod,
  deletePaymentMethod,
  listPaymentMethods,
  readPaymentMethod,
  updatePaymentMethod,
} from "./paymentMethod.service";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

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
    const skip = req.query.skip ? parseInt(req.query.skip.toString()) : undefined;
    const take = req.query.take ? parseInt(req.query.take.toString()) : undefined;
    const uid = req.session.uid!;
    const paymentMethods = await listPaymentMethods(uid, skip, take);
    res.status(StatusCodes.OK).json(paymentMethods);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const { type } = req.body as { type: string };
  try {
    /*
      #swagger.summary = 'Cria um método de pagamento.'
      #swagger.parameters['tipoUsuario'] = { description: 'método de pagamento' }
      #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/PaymentMethodDto' }
      }
      #swagger.responses[200] = {
      schema: { $ref: '#/definitions/PaymentMethod' }
      }
      */
    const uid = req.session.uid!;
    const nemPaymentMethod = await createPaymentMethod({ type });
    res.status(StatusCodes.OK).json(nemPaymentMethod);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const read = async (req: Request, res: Response) => {
  try {
    /*
      #swagger.summary = 'Retorna um método de pagamento'
      #swagger.parameters['tipoUsuario'] = { description: 'Tipo de pagamento' }
      #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/PaymentMethodDto' }
      }
      #swagger.responses[200] = {
      schema: { $ref: '#/definitions/PaymentMethod' }
      }
      */
    const { id } = req.params;
    const uid = req.session.uid!;
    const paymentMethod = await readPaymentMethod(id, uid);
    if (!paymentMethod) return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    res.status(StatusCodes.OK).json(paymentMethod);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const update = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Modifica os atributos de um método de pagamento.'
  #swagger.parameters['id'] = { description: 'ID do método de pagamento' }
  #swagger.parameters['body'] = {
  in: 'body',
  schema: { $ref: '#/definitions/PaymentMethodDto' }
  }
  #swagger.responses[200] = {
  schema: { $ref: '#/definitions/PaymentMethod' }
  }
  */
  const { id } = req.params;
  const uid = req.session.uid!;
  const updatedPaymentMethod = req.body as PaymentMethodDto;

  try {
    const paymentMethod = await updatePaymentMethod(id, updatedPaymentMethod, uid);

    if (!paymentMethod) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Método de pagamento não encontrado ou usuário não autorizado" });
    }

    return res.status(StatusCodes.OK).json(paymentMethod);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro ao atualizar o método de pagamento", error });
  }
};

const remove = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Apaga um método de pagamento com base no ID.'
  #swagger.parameters['id'] = { description: 'ID do método de pagamento / transação' }
  */
  const { id } = req.params;
  try {
    const deletedProduct = await deletePaymentMethod(id);
    res.status(StatusCodes.NO_CONTENT).json();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export default { index, create, read, update, remove };
