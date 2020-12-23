import { getRepository } from "typeorm";
import Users from "../models/Users";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";
import AppError from "../errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Users;
  token: string;
}

export default class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getRepository(Users);

    //procurar o usuario que ira ser autenticado.
    const user = await userRepository.findOne({ where: { email } });

    //verificar se o usuario existe
    //caso nao retorne um erro
    if (!user) {
      throw new AppError("Name or password are wrongs", 401);
    }

    //descriptografar a senha
    const decodedPass = await compare(password, user.password);

    //verificar se ela foi informada.
    if (!decodedPass) {
      throw new AppError("Name / password are wrongs 2", 401);
    }

    //gerar o token, 
    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
