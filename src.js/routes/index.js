const Router = require('express')

const usersRoutes = require('./users.routes')
const notesRoutes = require('./notes.routes')
const tagsRoutes = require('./tags.routes')
const sessionsRoutes = require('./sessions.routes')

const routes = Router()

routes.use('/users', usersRoutes) //quando a pessoa chamar pela /users, será direcionado para userRoutes
routes.use('/sessions', sessionsRoutes)
routes.use('/notes', notesRoutes)//quando a pessoa chamar pela /notes, será direcionado para userRoutes
routes.use('/tags', tagsRoutes)// quando chamar /tags, direcionária para tagsRoutes


module.exports = routes; 