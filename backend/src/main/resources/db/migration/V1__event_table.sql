create table events (
    id binary(16) default (uuid()) primary key,
    user_id binary(16) not null,
    start_at datetime not null,
    end_at datetime not null,
    event_text text(500) not null
)