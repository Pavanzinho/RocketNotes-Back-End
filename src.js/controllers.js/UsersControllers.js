/* cada controller, pode ter no máximo 5 métodos*/

/*
    *index- GET para listar vários registros
    *show- GET para exibir registro específico.
    *create- POST para criar um registro
    *update- PUT para atualizar um regristro
    *delete- DELETE para deletar um registro
    */

const AppError = require('../utils/AppError');
const sqliteConnection = require('../database/sqlite');
const { hash, compare } = require('bcryptjs'); //biblioteca de criptografia de senha.(tem que ser passada dentro de chaves)

class UserController {

    async create(req, res) {
        const { name, email, password } = req.body;

        const database = await sqliteConnection();
        const checkuserExist = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

        if (checkuserExist) {
            throw new AppError('Este e-mail já está cadastrado')
        }

        const hashedPassword = await hash(password, 8) // (varíavel com senha contida; nível de criptografia)

        await database.run(
            'INSERT INTO users(name,email,password) VALUES(?,?,?)',
            [name, email, hashedPassword]);

        return res.status(201.).json();
    }

    async update(request, response) {

        const { name, email, newPassword, oldPassword } = request.body;

        if (!newPassword && !oldPassword) {
            throw new AppError("Nos informe a senha antiga e nova")
            //obs: password e oldPassword vão ser as senhas que o usuário irá digitar na att.
        }


        const user_id = request.user.id // existe user dentro da request, por meio do midleware que manipula o token:ensureAuthentication, linha 19
        const database = await sqliteConnection();
        const user = await database.get('SELECT * FROM users WHERE id = (?)', [user_id]);

        // console.log(`aaaaa${JSON.stringify(oldPassword)}`)
        if (!user) {
            throw new AppError("Usuário não cadastrado no banco de dados!")
        }

        const userWithUpdatedEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email])

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("Email já cadastrado!");
 
        }

        if (newPassword && !oldPassword) {
            throw new AppError("A senha antiga não foi informada")
            //obs: password e oldPassword vão ser as senhas que o usuário irá digitar na att.
        }

        if (newPassword && oldPassword) {
            const checkOldPassword = await compare(oldPassword, user.password)

            if (!checkOldPassword) {
                throw new AppError("Esta não é a senha antiga deste usuário")
                return
            }
        }

        user.name = name ?? user.name; // ??= se tem conteudo no name, é ele, se não, é user.name
        user.email = email ?? user.email;
        user.password = await hash(newPassword, 8);



        await database.run(`
            UPDATE users SET
            name=?,
            email=?,
            password=?,
            updated_at= DATETIME('now')
            WHERE id =?`,
            [user.name, user.email, user.password, user_id]
        );

        return response.status(200).json();
    }
}
module.exports = UserController;