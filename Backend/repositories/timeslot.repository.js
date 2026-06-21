// repositories/timeslot.repository.js
import pool from '../config/db.js'

export const getAllSlots = async () => {
  const { rows } = await pool.query('SELECT id, start_time, end_time FROM timeslots ORDER BY start_time ASC')
  return rows
}

export const addSlot = async (start_time, end_time) => {
  const { rows } = await pool.query(
    'INSERT INTO timeslots (start_time, end_time) VALUES ($1, $2) RETURNING *',
    [start_time, end_time]
  )
  return rows[0]
}

export const deleteSlot = async (id) => {
  await pool.query('DELETE FROM timeslots WHERE id = $1', [id])
}