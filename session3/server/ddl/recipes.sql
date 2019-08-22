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

select r.id, r.name, r.chef_id, c.name as chef_name 
from recipes r
join chefs c on c.id = r.chef_id
where r.id=1 