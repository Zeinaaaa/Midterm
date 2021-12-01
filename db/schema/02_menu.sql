DROP TABLE IF EXISTS menu CASCADE;
CREATE TABLE menu (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  components VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  type VARCHAR(225) NOT NULL
  img VARCHAR(255)
);
