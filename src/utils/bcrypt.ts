import * as bcrypt from 'bcrypt';
export const hashed = async (saltOrRounds: number, password: string) => {
  return await bcrypt.hash(password, saltOrRounds);
};

export const compare = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
