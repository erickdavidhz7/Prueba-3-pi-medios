import { Request, Response } from 'express'
import roleServices from '../services/role.services'
import getErrorMessage from '../utils/get-error-message'
import { Roles } from '../models/role.model'

const RoleControllers = {
  CreateRole: async (req: Request, res: Response) => {
    try {
      const { role } = req.body
      if(!role) return res.status(400).json({ok: false, message: `No role was found to be added`})
      const validateRole = await Roles.findOne({
        where: {name: role },
      })
      if (validateRole) return res.status(400).json({ok: false, message: `The role: ${role} is already in our system.`})
      await roleServices.CreateRole(role)
      return res.status(201).json({ok: true, message: `The role: ${role} has been added succesfully`})
    } catch (error) {
      return res.status(500).json({ ok: false, message: 'Internal server error', error: getErrorMessage(error) })
    }
  },
  getAllRoles: async(req: Request, res: Response) => {
    try {
      const allRoles = await roleServices.getAllRoles()
      return res.status(200).json(allRoles)
    } catch (error) {
      return res.status(500).json({ ok: false, message: 'Internal server error', error: getErrorMessage(error) })
    }
  }
}

export default RoleControllers
