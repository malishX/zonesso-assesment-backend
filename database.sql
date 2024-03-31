CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    google_id VARCHAR(100),
    facebook_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    category_id INT,
    showroom_id INT,
    price DECIMAL,
    year INT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (showroom_id) REFERENCES showrooms(id)
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE showrooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    location VARCHAR(255)
);

CREATE TABLE filters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE vehicle_filters (
    id SERIAL PRIMARY KEY,
    vehicle_id INT,
    filter_id INT,
    value VARCHAR(100),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    FOREIGN KEY (filter_id) REFERENCES filters(id)
);

CREATE TABLE chats (
    id SERIAL PRIMARY KEY,
    user1_id INT,
    user2_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user1_id) REFERENCES users(id),
    FOREIGN KEY (user2_id) REFERENCES users(id)
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    chat_id INT,
    sender_id INT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_id) REFERENCES chats(id),
    FOREIGN KEY (sender_id) REFERENCES users(id)
);
