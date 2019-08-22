CREATE TABLE recipes
(
  id                   INTEGER PRIMARY KEY,
  chef_id              INTEGER,
  name                 VARCHAR(255),
  steps                TEXT,
  created_at           datetime,
  updated_at           datetime,
  FOREIGN KEY(chef_id) REFERENCES chefs(id)
);