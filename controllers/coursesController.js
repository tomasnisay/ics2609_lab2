const db = require('../config/db');

exports.createCourse = (req, res) => {
  const { code, title, units } = req.body;
  if (!code || !title || units === undefined) {
    return res.status(400).json({ error: 'code, title, and units are required' });
  }

  const sql = 'INSERT INTO courses (code, title, units) VALUES (?, ?, ?)';
  db.query(sql, [code, title, units], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Course code must be unique' });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Course created', id: result.insertId });
  });
};

exports.getCourses = (req, res) => {
  db.query('SELECT * FROM courses', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getCourseById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM courses WHERE id = ?', [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) return res.status(404).json({ error: 'Course not found' });
    res.json(rows[0]);
  });
};

exports.updateCourse = (req, res) => {
  const { id } = req.params;
  const { code, title, units } = req.body;

  db.query(
    'UPDATE courses SET code = ?, title = ?, units = ? WHERE id = ?',
    [code, title, units, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Course not found' });
      res.json({ message: 'Course updated' });
    }
  );
};

exports.deleteCourse = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM courses WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Course not found' });
    res.json({ message: 'Course deleted' });
  });
}