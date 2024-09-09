import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createCreditCard,
  readCreditCard,
  updateCreditCard,
  deleteCreditCard,
} from "./creditCard.service";
import { CreateCreditCardDto, UpdateCreditCardDto } from "./creditCard.types";

const create = async (req: Request, res: Response) => {
  const uid = req.session.uid!;
  const creditCardData: CreateCreditCardDto = req.body;

  try {
    const newCreditCard = await createCreditCard(creditCardData, uid);
    res.status(StatusCodes.CREATED).json(newCreditCard);
  } catch (err) {
    console.error("Erro ao criar cartão de crédito:", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Não foi possível criar o cartão de crédito." });
  }
};

const read = async (req: Request, res: Response) => {
  const uid = req.session.uid!;

  try {
    const creditCards = await readCreditCard(uid);
    res.status(StatusCodes.OK).json(creditCards);
  } catch (err) {
    console.error("Erro ao buscar cartões de crédito:", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Não foi possível buscar os cartões de crédito." });
  }
};

const update = async (req: Request, res: Response) => {
  const uid = req.session.uid!;
  const { id } = req.params;
  const creditCardData: UpdateCreditCardDto = req.body;

  try {
    const updatedCreditCard = await updateCreditCard(id, uid, creditCardData);
    res.status(StatusCodes.OK).json(updatedCreditCard);
  } catch (err) {
    console.error("Erro ao atualizar cartão de crédito:", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Não foi possível atualizar o cartão de crédito." });
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedCreditCard = await deleteCreditCard(id);
    res.status(StatusCodes.OK).json(deletedCreditCard);
  } catch (err) {
    console.error("Erro ao deletar cartão de crédito:", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Não foi possível deletar o cartão de crédito." });
  }
};

export default { create, read, update, remove };
