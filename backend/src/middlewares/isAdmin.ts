import { Request, Response, NextFunction } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { UserType } from "../resources/userType/userType.constants";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userTypeId === UserType.ADMIN) next();
  else return res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userTypeId === UserType.CLIENT || req.session.userTypeId === UserType.ADMIN)
    next();
  else return res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
};
