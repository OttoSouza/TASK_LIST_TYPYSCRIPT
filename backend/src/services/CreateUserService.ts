import { getRepository } from "typeorm";
import Users from "../models/Users";
import { hash } from "bcryptjs";
import AppError from "../errors/AppError";

interface IRequest {
  name: string;
  email: string;
  password: string;
  cell: string;
}
/**
 * ```
 * Service de criar usuario
 * ```
 * @param IRequest é uma interface que recebe atributos do usuario.
 * @param nome o do usuario
 * @param email do usuario. Esse campo é unico.
 * @param password  do usuariosera criptografado ao persistir no banco de dados
 * @param cell do usuario, esse campo é unico.
 * @returns retorna um usuario persistido no banco.
 *
 * ```
 * * O usuairo ira informar os dados.
 * * Ira ocorrer uma verificaçao no email e celular, se ambos ja existirem tera que ser informado um novo numero de celular
 * * hash é uma funçao da biblioteca bycrpyt para criptografias de senhas.
 * * Com isso sera salvo no banco e retonado o usuario.
 * ```
 */
export default class CreateUserService {
  public async execute({
    name,
    email,
    password,
    cell,
  }: IRequest): Promise<Users> {
    const usersRepository = getRepository(Users);

    //recuperaro celular
    const checkCellPhone = await usersRepository.findOne({
      where: { cell },
    });

    //recuperar o email
    const checkEmail = await usersRepository.findOne({
      where: { email },
    });

    //se existir, nao deixe salvar
    if (checkEmail) {
      throw new AppError("Email already exists.");
    }

    //se existir, nao deixe salvar
    if (checkCellPhone) {
      throw new AppError("Cell already exists.");
    }

    //criptografar a senha com o bycrypty
    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      cell,
    });

    await usersRepository.save(user);

    return user;
  }
}
