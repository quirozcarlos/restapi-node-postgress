const { Pool } = require('pg')
const {
  INSERT_WITH_FK,
  INSERT_WITHOUT_FK,
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
  database: 'parcial2',
  port: 5432
})

const createUser = async (req, res) => {
  const { id_country, gender, birthday, name, lastname, nickname, email } = req.body

  if(id_country && isNaN(parseInt(id_country, 10))){
    res.status(400).json("Field id_country must be a valid number");
    return
  }

  if (!gender || !birthday || !name || !lastname || !nickname || !email) {
    res.status(400).json('Some fields are required');
    return
  }

  try {
    const response = await pool.query(
      INSERT_WITH_FK,
      [id_country, gender, birthday, name, lastname, nickname, email]
    )
    res.status(200).json({
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
  if (!name || !price || (!offer && offer !== 0)) {
    res.status(400).json('Some fields are required');
    return
  }
  try {
    const response = await pool.query(
      INSERT_WITHOUT_FK,
      [name, price, offer]
    )
    res.status(200).json({
      message: 'Item added succesfully',
      body: {
        item: { name, price, offer }
      }
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
}

// update with FK
const updateUser = async (req, res) => {
  const id = req.params.id
  const values = req.body;

  if(values?.id_country && parseInt(values?.id_country, 10) === NaN){
    res.status(400).json("Field id_country must be a valid number");
    return
  }

  const user = {}
  let str = ''

  Object.keys(values).map(key => {
    if (key === 'id_country') {
      user[key] = parseInt(values?.id_country, 10)
      str += `${key} = ${values[key]},`
    } else {
      user[key] = values[key]
      str += `${key} = '${values[key]}',`
    }
  })

  const query = `UPDATE users SET ${str.slice(0, -1)} WHERE id = ${id}`

  try {
    const response = await pool.query(query)
    res.status(200).json('User updated succesfully');
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const updateOs = async (req, res) => {
  const id = req.params.id
  const { name } = req.body
  if (!name) {
    res.status(400).json('The field name are required');
    return
  }
  try {
    const response = await pool.query(UPDATE_WITHOUT_FK, [name, id])
    res.status(200).json('OS updated succesfully');
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

const getCountryWithUser = async (req, res) => {
  try {
    const response = await pool.query(GET_MORE_THAN_A_TABLE)
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const getItemsGroupBy = async (req, res) => {
  try {
    const response = await pool.query(GET_GROUP_ONE_TABLE)
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const getCountryWithUserGrouped = async (req, res) => {
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
  updateUser,
  updateOs,
  getItems,
  getCountryWithUser,
  getItemsGroupBy,
  getCountryWithUserGrouped
}
