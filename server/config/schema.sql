CREATE DATABASE stocks_app;

CREATE TABLE users(
    user_id uuid DEFAULT gen_random_uuid(),
    fullname VARCHAR NOT NULL,
    email VARCHAR UNIQUE,
    password VARCHAR,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
);

CREATE TYPE transaction_type_enum AS ENUM ('BUY', 'SELL');

CREATE TABLE transactions(
    transaction_id uuid DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES users(user_id),
    stock_name VARCHAR(10),
    quantity INT,
    price DECIMAL,
    transaction_type transaction_type_enum,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (transaction_id)
);

CREATE TABLE ownedStocks(
    user_id uuid REFERENCES User(user_id)
    stock_name VARCHAR(10),
    total_quantity INT, 
    total_price DECIMAL,
    PRIMARY KEY(user_id, stock_name)
);