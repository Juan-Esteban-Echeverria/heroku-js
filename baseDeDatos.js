require("dotenv").config()
const { Pool } = require("pg")

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:root@localhost:5432/simple_db2'

const pool = new Pool({
    connectionString: connectionString,
    ssl: {rejectUnauthorized: false}
})

//LISTAR
module.exports.getUser= async () => {
    const client = await pool.connect()
    try {
        const respuesta = await client.query("SELECT * FROM users;")
        return respuesta.rows
    } catch (error) {
        console.log(error)
        return error
    } finally {
        client.release()
    }
}

// CREAR 
module.exports.postUser = async (username, email, contrasenia) => {
    const client = await pool.connect()

    const query = {
        text: "INSERT INTO users (username, email, contrasenia) values ($1, $2, $3) RETURNING *",
        values: [username, email, contrasenia]
    }

    try {
        const respuesta = await client.query(query)
        return respuesta.rows
    } catch (error) {
        console.log(error)
        return error
    } finally {
        client.release()
    }
}

// ELIMINAR
module.exports.deleteUser = async (id) => {
    const client = await pool.connect()

    const query = {
        text: "DELETE FROM users WHERE id = $1 RETURNING *",
        values: [id]
    }

    try {
        const respuesta = await client.query(query)
        return respuesta.rows
    } catch (error) {
        console.log(error)
        return error
    } finally {
        client.release()
    }
}