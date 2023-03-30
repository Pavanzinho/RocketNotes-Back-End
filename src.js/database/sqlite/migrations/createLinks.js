const createLinks = `
CREATE TABLE IF NOT EXISTS links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  note_id INTEGER REFERENCES notes(id) ON DELETE CASCADE,
  url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

module.exports = createLinks;