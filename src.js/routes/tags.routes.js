const { Router } = require("express")
const tagsRoutes = Router();

const TagsController = require("../controllers.js/TagsControllers")
const tagsController = new TagsController();

const ensureAuthentication = require("../midllewares/ensureAuthentication")



tagsRoutes.get("/", ensureAuthentication, tagsController.index) // não precisa passar como parametro, pq é query no insomnia.



module.exports = tagsRoutes;
//exportando para poder usar em qualquer lugar.