DROP DATABASE IF EXISTS tungsten_db;
CREATE DATABASE tungsten_db;

USE tungsten_db;

CREATE TABLE tools
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
    available BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);

SELECT * FROM tools;