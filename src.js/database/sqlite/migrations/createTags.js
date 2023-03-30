const createTags = `
CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  note_id INTEGER REFERENCES notes(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id),
  name TEXT
);
`;

module.exports = createTags;