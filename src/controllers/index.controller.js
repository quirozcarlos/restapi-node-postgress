const { Pool } = require('pg')
// queries
const {
  get_one_table
} = require('../db/queries.json')

//
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '1234',
  database: 'oltp_database_II',
  port: 5432
})

/**
 * CONSULTA DE UNA TABLA
 */
const getUsers = async (req, res) => {
  const response = await pool.query(get_one_table)
  res.status(200).json(response.rows);
}



//------------------------------------------------------------------//
/**
 * EXAMPLE OF INSERT
 */

// const createUser = async (req, res) => {
//   const { name, email } = req.body

//   const response = await pool.query(
//     'INSERT INTO users (name, email) VALUES ($1, $2)',
//     [name, email]
//   )
//   res.json({
//     message: 'user added succesfully',
//     body: {
//       user: { name, email }
//     }
//   });
// }

module.exports = {
  getUsers
}
