import AppDataSource from '../../data-source';
import User from '../../entities/user.entity';
import AppError from '../../errors/AppError';

const deleteUserService = async (id: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const account = users.find((user) => user.id === id);

  if (!account) {
    throw new AppError('User Not Found', 404);
  }
  if (account.isActive === false) {
    throw new AppError('User Already Deleted', 400);
  }

  await userRepository.update(account!.id, { isActive: false });
};

export default deleteUserService;
