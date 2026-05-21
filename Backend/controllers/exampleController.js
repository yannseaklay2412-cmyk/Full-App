const db = require('../config/db');

const getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM example_table');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM example_table WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const [result] = await db.query('INSERT INTO example_table (name) VALUES (?)', [name]);
    res.status(201).json({ id: result.insertId, name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name } = req.body;
    await db.query('UPDATE example_table SET name = ? WHERE id = ?', [name, req.params.id]);
    res.json({ message: 'Updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await db.query('DELETE FROM example_table WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
