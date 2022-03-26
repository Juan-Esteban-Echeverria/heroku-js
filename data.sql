CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    contrasenia varchar(255) NOT NULL,
    fecha DATE NOT NULL DEFAULT NOW()
);

INSERT INTO users (username, email, contrasenia) VALUES ('JuanJS', 'juan@js.com', '123');
INSERT INTO users (username, email, contrasenia) VALUES ('PedroHB', 'pedro@hb.com', '456');
INSERT INTO users (username, email, contrasenia) VALUES ('JuliaPG', 'julia@pg.com', '789');


