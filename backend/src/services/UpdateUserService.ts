import { compare, hash } from "bcryptjs";
import { getRepository } from "typeorm";
import AppError from "../errors/AppError";
import Users from "../models/Users";

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password: string;
  old_password: string;
  cell: string;
}

export default class UpdateUserService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
    cell,
  }: IRequest): Promise<Users> {
    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError("User not found.", 401);
    }

    const findEmail = await usersRepository.findOne({
      where: { email },
    });

    if (findEmail && findEmail.id !== user_id) {
      throw new AppError("E-mail already in use.", 401);
    }

    const findCell = await usersRepository.findOne({
      where: { cell },
    });

    if (findCell && findCell.id !== user_id) {
      throw new AppError("Cell already in use.", 401);
    }

    user.name = name;
    user.email = email;
    user.cell = cell;

    if (password && !old_password) {
      throw new AppError(
        "You need to enter the old password to set a new password.",
        401
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Old password does not match.", 401);
      }
      user.password = await hash(password, 8);
    }

    return usersRepository.save(user);
  }
}
