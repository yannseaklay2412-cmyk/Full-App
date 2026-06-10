import * as authService from '../services/auth.service.js'

export const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body)
    res.status(201).json({ success: true, ...result })
  } catch (err) { next(err) }
}

export const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body)
    res.status(200).json({ success: true, ...result })
  } catch (err) { next(err) }
}

export const logout = async (req, res, next) => {
  try {
    const result = await authService.logout()
    res.status(200).json({ success: true, ...result })
  } catch (err) { next(err) }
}

export const forgotPassword = async (req, res, next) => {
  try {
    const result = await authService.forgotPassword(req.body.email)
    res.status(200).json({ success: true, ...result })
  } catch (err) { next(err) }
}

export const resetPassword = async (req, res, next) => {
  try {
    const result = await authService.resetPassword(req.body.password)
    res.status(200).json({ success: true, ...result })
  } catch (err) { next(err) }
}