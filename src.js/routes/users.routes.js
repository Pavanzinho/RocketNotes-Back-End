const Router = require("express")
const usersRoutes = Router();

const multer = require("multer")
const uploadConfig = require("../configs/upload")
const upload = multer(uploadConfig.MULTER)

const UserController = require("../controllers.js/UsersControllers");
const userController = new UserController();

const UserAvatarControllers = require("../controllers.js/UserAvatarControllers");
const userAvatarControllers=new UserAvatarControllers();

const ensureAuthentication = require("../midllewares/ensureAuthentication")

usersRoutes.post("/", userController.create)
usersRoutes.put("/", ensureAuthentication, userController.update)
usersRoutes.patch("/avatar", ensureAuthentication, upload.single("avatar"),userAvatarControllers.update)
// antes, precisava colocar id do usuário,agora, não. Pois o id do usuário já está incorporado nas requisições: ensureAuthentication, linhas 17 a 28.


module.exports = usersRoutes;
//exportando para poder usar em qualquer lugar.

