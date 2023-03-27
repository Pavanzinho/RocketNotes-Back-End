const Router = require("express")
const notesRoutes = Router();

const NotesController = require("../controllers.js/NotesControllers")
const notesController = new NotesController();

const ensureAuthentication = require("../midllewares/ensureAuthentication")

notesRoutes.use(ensureAuthentication) //aplicando o midleware para todas as rotas de uma vez.

notesRoutes.get("/", notesController.index) // não precisa passar como parametro, pq é query no insomnia.
notesRoutes.get('/:id', notesController.show)
notesRoutes.post("/", notesController.create)
notesRoutes.delete('/:id', notesController.delete)


module.exports = notesRoutes;
//exportando para poder usar em qualquer lugar.