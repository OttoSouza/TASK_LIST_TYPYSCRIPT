import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";
import AppError from "../errors/AppError";

interface JWTToken {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuth(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  //verificar se o token foi informado
  if (!authHeader) {
    throw new AppError("Invalid token", 401);
  }

  //separar o bearer do token
  const [, token] = authHeader.split(" ");

  
  try {
    const decoded = verify(token, authConfig.jwt.secret) as JWTToken;

    // onde sera informado o id do usuario
    const { sub } = decoded;
    
    request.user = {
      id: sub,
    };
    
    return next();
  } catch (error) {
    throw new AppError("Invalid Token", 401);
  }
}
