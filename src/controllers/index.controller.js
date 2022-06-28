const { Pool } = require('pg')
const {
  INSERT_WITH_FK,
  INSERT_WITHOUT_FK,
  UPDATE_WITH_FK,
  UPDATE_WITHOUT_FK,
  GET_ONE_TABLE,
  GET_MORE_THAN_A_TABLE,
  GET_GROUP_ONE_TABLE,
  GET_GROUP_MORE_THAN_A_TABLE
} = require('../db/queries.json')

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '1234',
  database: 'oltp_database_II',
  port: 5432
})

const createUser = async (req, res) => {
  const { id_country, gender, birthday, name, lastname, nickname, email } = req.body

  try {
    const response = await pool.query(
      INSERT_WITH_FK,
      [id_country, gender, birthday, name, lastname, nickname, email]
    )
    res.json({
      message: 'User added succesfully',
      body: {
        user: { id_country, gender, birthday, name, lastname, nickname, email }
      }
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const createItem = async (req, res) => {
  const { name, price, offer } = req.body
  try {
    const response = await pool.query(
      INSERT_WITHOUT_FK,
      [name, price, offer]
    )
    res.json({
      message: 'Item added succesfully',
      body: {
        item: { name, price, offer }
      }
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const updateDevice = async (req, res) => {
  const id = req.params.id
  const { name } = req.body
  try {
    const response = await pool.query(UPDATE_WITH_FK, [name, id])
    res.json('Device updated succesfully');
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const updateOs = async (req, res) => {
  const id = req.params.id
  const { name } = req.body
  try {
    const response = await pool.query(UPDATE_WITHOUT_FK, [name, id])
    res.json('OS updated succesfully');
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const getItems = async (req, res) => {
  try {
    const response = await pool.query(GET_ONE_TABLE)
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const getOsName = async (req, res) => {
  try {
    const response = await pool.query(GET_MORE_THAN_A_TABLE)
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const getRepeatedItems = async (req, res) => {
  try {
    const response = await pool.query(GET_GROUP_ONE_TABLE)
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const getDevicesMostUsed = async (req, res) => {
  try {
    const response = await pool.query(GET_GROUP_MORE_THAN_A_TABLE)
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = {
  createUser,
  createItem,
  updateDevice,
  updateOs,
  getItems,
  getOsName,
  getRepeatedItems,
  getDevicesMostUsed
}
