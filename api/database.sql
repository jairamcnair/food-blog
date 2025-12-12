
/*
Use PostgreSQL and Neon Database - you won't need a PHP file - use node and create a server file

Create a new project (database) in neon

In your project, open the terminal and paste:     npm install @neondatabase/serverless

Get the database URL from neon website (connect to your database => select Node.js and see the .env file)



*/

CREATE TABLE comments2 (
    comment_id SERIAL PRIMARY KEY,
    recipe INTEGER, /* FOREIGN KEY*/
    name VARCHAR(255),
    email VARCHAR(255),
    rating VARCHAR(1),
    comment VARCHAR(255),
    date DATE,
    replies JSONB
);

INSERT INTO comments2 (name, rating, comment, date, replies) VALUES (
    'This is the main post content.',
    '4',
    'This was good',
    '2025-12-09',
    '[
        {"user_id": 1, "username": "Alice", "comment": "Great post!"},
        {"user_id": 2, "username": "Bob", "comment": "I agree."},
        {"user_id": 3, "username": "Charlie", "comment": "Interesting perspective."}
    ]'::jsonb
);

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    recipe INTEGER, /* FOREIGN KEY*/
    name VARCHAR(255),
    email VARCHAR(255),
    rating VARCHAR(1),
    comment VARCHAR(255),
    date DATE,
    reply_to INTEGER
);

CREATE TABLE replies (
    reply_id SERIAL PRIMARY KEY,
    reply_to INTEGER,
    comment INTEGER, /* FOREIGN KEY*/
    name VARCHAR(255),
    email VARCHAR(255),
    reply VARCHAR(255),
    date DATE

    constraint fk_comment
     foreign key (comment) 
     REFERENCES comments (comment_id)
);

CREATE TABLE subscriptions (
    email_id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    date DATE
);

INSERT INTO subscriptions (email) VALUES ('jaimcnair10@gmail.com');
INSERT INTO comments (recipe, name, rating, comment, date) VALUES (1, 'Jane Doe', 4, 'This was super good!', '2025-12-9')