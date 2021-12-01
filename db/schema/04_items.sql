DROP TABLE IF EXISTS items CASCADE;
CREATE TABLE items (
 id SERIAL PRIMARY KEY NOT NULL,
 user_id INTEGER,
 menu_id INTEGER,
 menu_name VARCHAR(255),
 price INTEGER,
 quantity SMALLINT,
 order_menu_total INTEGER DEFAULT 0
);
