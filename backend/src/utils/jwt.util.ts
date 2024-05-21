import jwt from 'jsonwebtoken'
import { envs } from './constants'
import JwtPayloadI from '../interfaces/jwt-payload.interface'

const verifyOptions: jwt.VerifyOptions = {
  issuer: envs.jwt.JWT_ISSUER,
  maxAge: envs.jwt.JWT_EXPIRATION,
}

const signOptions: jwt.SignOptions = {
  expiresIn: envs.jwt.JWT_EXPIRATION,
  issuer: envs.jwt.JWT_ISSUER,
}

export const signToken = (payload: JwtPayloadI) => {
  return jwt.sign(payload, envs.jwt.JWT_SECRET, signOptions)
}

export const verifyToken = (token: string) => {
  try {
    const data = jwt.verify(token, envs.jwt.JWT_SECRET, verifyOptions)
    return data as jwt.JwtPayload
  } catch (error) {
    console.log(error)
    throw error
  }
}
