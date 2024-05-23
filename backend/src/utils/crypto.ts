import { hashSync, compareSync } from 'bcryptjs'

export const hashPassword = (plainPassword: string): string => {
  return hashSync(plainPassword, 10)
}

export const comparePassword = (
  plainPassword: string,
  hashedPassword: string
): boolean => {
  return compareSync(plainPassword, hashedPassword)
}
