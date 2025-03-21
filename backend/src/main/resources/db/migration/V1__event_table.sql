CREATE TABLE events (
    id BINARY(16) PRIMARY KEY,
    user_id BINARY(16) NOT NULL,
    start_at DATETIME NOT NULL,
    end_at DATETIME NOT NULL,
    event_text VARCHAR(200) NOT NULL
);
