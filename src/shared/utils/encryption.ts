import * as bcrypt from 'bcrypt';

export async function encrypt(value: string, saltRounds?: number) {
  const salt = saltRounds
    ? bcrypt.genSaltSync(saltRounds)
    : await bcrypt.genSalt();
  return bcrypt.hashSync(value, salt);
}

export function compare(value: string, encryptedValue: string) {
  return bcrypt.compareSync(value, encryptedValue);
}
