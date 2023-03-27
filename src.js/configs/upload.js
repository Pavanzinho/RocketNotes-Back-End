//ARQUIVO DE CONFIGURAÇÕES DE UPLOADS QUE UTILIZAREMOS NA APLICAÇÃO.

const path = require("path")
const multer = require("multer")
const crypto = require("crypto")

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp") // pasta temporária, upload)onde imagem chega.
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads") // onde imagem irá realmente ficar.

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER, //para onde vai mandar o arquivo, neste caso, para a pasta temporária quando for carregado pela app.
        filename(request, file, callback) { //definindo nome do arquivo.

            /*  usando hash para gerar um numero aleatório, para combinar com o nome do arquivo,
            para garantir que o usuário não tenha imagem duplicadas sendo puxadas, caso ocorra de obterem o mesmo nome.*/
            const fileHash = crypto.randomBytes(10).toString("hex")
            const fileName = `${fileHash}-${file.originalname}` //combinação do nome com hash;

            return callback(null, fileName)
        }
    })
}
module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER
}

