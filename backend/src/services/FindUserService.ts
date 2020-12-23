import { getRepository } from "typeorm";
import Users from "../models/Users";


export default class FindUserService {
  public async execute(): Promise<Users[]> {
    const usersRepository = getRepository(Users);

    const findUsers = await usersRepository.find();

    return findUsers;
  }
}
