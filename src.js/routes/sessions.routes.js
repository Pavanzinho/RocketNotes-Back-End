const { Router } = require('express')

const sessionsRoutes = Router()

const SessionsControllers = require('../controllers.js/SessionsControllers')
const sessionsControllers = new SessionsControllers

sessionsRoutes.post('/', sessionsControllers.create)

module.exports = sessionsRoutes;