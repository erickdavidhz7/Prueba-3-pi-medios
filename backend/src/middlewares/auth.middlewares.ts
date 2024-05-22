import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../utils/jwt.util'
import { Users } from '../models/user.model'
import { RolesId } from '../utils/constants' 
import { JwtPayload } from 'jsonwebtoken'
import userServices from '../services/users.services'

export const tokenValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['x-authorization'] as string

  interface CustomRequest extends Request {
    token: JwtPayload
  }

  if (!token) {
    return res.status(401).json({ ok: false, message: 'Token not found' })
  }

  try {
    const decoded = verifyToken(token) as JwtPayload
    (req as CustomRequest).token = decoded
    next()
  } catch (error) {
    return res.status(403).json({ ok: false, message: 'Invalid token' })
  }
}

export const uniqueDocumentValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { document } = req.body
    const existingDocument = await Users.findOne({ where: { document } })
    if (existingDocument)
      return res
        .status(400)
        .json({ ok: false, message: 'Document already exists in our system' })
    next()
  } catch (error) {
    console.error(
      'There was an error trying to verify the authenticity of the user: ' +
        error
    )
  }
}

export const checkAdminRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.headers.auth as string
    const userRoleId = await userServices.getRoleId(userId)
    if (userRoleId != RolesId.admin)
      return res
        .status(401)
        .json({ ok: false, message: 'You are not authorized' })
    next()
  } catch (error) {
    console.error(
      'There was an error trying to verify the authenticity of the user: ' +
        error
    )
  }
}

export const checkEmployeeRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.headers.auth as string
    const userRoleId = await userServices.getRoleId(userId)
    if (userRoleId != RolesId.employee)
      return res
        .status(401)
        .json({ ok: false, message: 'You are not authorized' })
    next()
  } catch (error) {
    console.error(
      'There was an error trying to verify the authenticity of the user: ' +
        error
    )
  }
}

export const checkEveryoneRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.headers.auth as string
    const userRoleId = await userServices.getRoleId(userId)
    if (userRoleId != RolesId.everyone)
      return res
        .status(401)
        .json({ ok: false, message: 'You are not authorized' })
    next()
  } catch (error) {
    console.error(
      'There was an error trying to verify the authenticity of the user: ' +
        error
    )
  }
}
