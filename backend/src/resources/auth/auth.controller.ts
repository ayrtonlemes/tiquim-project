import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { checkCredentials } from "./auth.service";
import { LoginDto } from "./auth.types";
import { CreateUserDto, TypeUser } from "../user/user.types";
import { createUser } from "../user/user.service";

const signup = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Cria um usuário.'
   #swagger.parameters['tipoUsuario'] = { description: 'Tipo do usuário' }
  #swagger.parameters['body'] = {
  in: 'body',
  schema: { $ref: '#/definitions/CreateUsuarioDto' }
  }
  #swagger.responses[200] = {
  schema: { $ref: '#/definitions/Usr' }
  }
  */
  const user = req.body as CreateUserDto;
  try {
    const newUser = await createUser(user);
    res.status(StatusCodes.CREATED).json(newUser);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const login = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Faz a sessão do usuário.'
  #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/LoginDto' }
  }
  #swagger.responses[200] = {
  schema: { $ref: '#/definitions/UsuarioDto' }
  }
  */
  const credentials = req.body as LoginDto;
  try {
    const user = await checkCredentials(credentials);
    if (!user) return res.status(StatusCodes.UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED);
    req.session.uid = user.id;
    req.session.userTypeId = user.userTypeId;
    res.status(StatusCodes.OK).json(user);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const logout = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Desfazer a sessão do usuário.'
  */
  if (req.session.uid) {
    req.session.destroy(() => res.status(StatusCodes.OK).json(ReasonPhrases.OK));
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED);
  }
};

const logged = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Retorna o usuário logado.'
  */
  if (req.session.uid) {
    res.status(StatusCodes.OK).json(req.session.uid);
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED);
  }
};

export default { signup, login, logout, logged };
