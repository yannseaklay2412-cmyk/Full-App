// controllers/user.controller.js
const UserModel = require('../models/user.model')

// GET /api/users/me
const getMyProfile = async (req, res, next) => {
  try {
    const data = await UserModel.getById(req.user.id)
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}

// PUT /api/users/me
const updateMyProfile = async (req, res, next) => {
  try {
    const { name, phone } = req.body
    const data = await UserModel.update(req.user.id, { name, phone })
    res.status(200).json({ success: true, message: 'Profile updated', data })
  } catch (err) { next(err) }
}

// PUT /api/users/me/password
const changePassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body
    await UserModel.changePassword(newPassword)
    res.status(200).json({ success: true, message: 'Password changed' })
  } catch (err) { next(err) }
}

// ── Admin ─────────────────────────────────────────────────

// GET /api/admin/users
const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserModel.getAll()
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}

// GET /api/admin/users/:id
const getUserById = async (req, res, next) => {
  try {
    const data = await UserModel.getById(req.params.id)
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}

// PUT /api/admin/users/:id
const updateUser = async (req, res, next) => {
  try {
    const data = await UserModel.update(req.params.id, req.body)
    res.status(200).json({ success: true, message: 'User updated', data })
  } catch (err) { next(err) }
}

// DELETE /api/admin/users/:id
const deleteUser = async (req, res, next) => {
  try {
    await UserModel.remove(req.params.id)
    res.status(200).json({ success: true, message: 'User deleted' })
  } catch (err) { next(err) }
}

module.exports = { getMyProfile, updateMyProfile, changePassword, getAllUsers, getUserById, updateUser, deleteUser }
