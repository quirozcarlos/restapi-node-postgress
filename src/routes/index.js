const { Router } = require('express')
const router = Router()

const {
  createItem,
  createUser,
  updateDevice,
  updateOs,
  getItems,
  getOsName,
  getRepeatedItems,
  getDevicesMostUsed
} = require('../controllers/index.controller')

/**
 * Insercion en un objeto sin FK.
 */
router.post('/item', createItem)

/**
 * Insercion en un objeto con FK.
 */
router.post('/user', createUser)

/**
 * Actualizar un objeto con FK.
 */
router.put('/device/:id', updateDevice)

/**
 * Actualizar un objeto sin FK.
 */
router.put('/os/:id', updateOs)

/**
 * Consulta de una sola tabla.
 */
router.get('/items', getItems)

/**
 * Consulta de mas de una tabla.
 */
router.get('/osname', getOsName)

/**
 * Consulta utilizando agrupación una sola tabla.
 */
router.get('/repeateditems', getRepeatedItems)

/**
 * Consulta utilizando agrupacion varias tablas.
 */
router.get('/devicesmostused', getDevicesMostUsed)

module.exports = router
