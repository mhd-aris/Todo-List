CREATE DATABASE todolist;

CREATE TABLE todos(
    todo_id SERIAL NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(500) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    PRIMARY KEY ( todo_id)
);


