import db from '../config/db.js';

const getAll = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM example_table');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM example_table WHERE id = $1', [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ message: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await db.query('INSERT INTO example_table (name) VALUES ($1) RETURNING id', [name]);
    res.status(201).json({ id: result.rows[0].id, name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name } = req.body;
    await db.query('UPDATE example_table SET name = $1 WHERE id = $2', [name, req.params.id]);
    res.json({ message: 'Updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await db.query('DELETE FROM example_table WHERE id = $1', [req.params.id]);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getAll, getById, create, update, remove };
