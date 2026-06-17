import * as authService from '../services/auth.service.js'
import asyncHandler from '../utils/asyncHandler.js'

export const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body)
  res.status(201).json({ success: true, ...result })
})

export const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body)
  res.status(200).json({ success: true, ...result })
})

export const logout = asyncHandler(async (req, res) => {
  const result = await authService.logout()
  res.status(200).json({ success: true, ...result })
})

export const forgotPassword = asyncHandler(async (req, res) => {
  const result = await authService.forgotPassword(req.body.email)
  res.status(200).json({ success: true, ...result })
})

export const resetPassword = asyncHandler(async (req, res) => {
  const result = await authService.resetPassword(req.body.password)
  res.status(200).json({ success: true, ...result })
})
