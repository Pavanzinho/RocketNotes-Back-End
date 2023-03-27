/*Aqui, serão criadas as funções que iram "atualizar" o upload da imagem" 
    -Sequencia de acontecimentos: deleta imagem que existe no diretório;
    -Mover arquivo de imagem da pasta temporário (TMP_FOLDER neste caso) para a pasta que realmente ficará a o upload da imagem do cliente.
    OBS: tudo isso será feito a partir do nome do arquivo, que lá em /configs.auth recebeu inclusao de um código aleátório para evitar sobreposição de 
    imagens.
*/

const fs = require("fs") // permite manipulação de arquivo dentro do node.
const path = require("path")
const uploadConfig = require("../configs/upload")


/* Quando a imagem chega no back, ela é carregada na pasta temporária, assim o back end pode decidir o que vai fazer com a imagem, porém, quando salva o
arquivo, precisa-se mover ela para pasta de upload, que é onde ela realmente vai ficar */
class DiskStorage {
    async saveFile(file) { //"file"= nome do arquivo.
        await fs.promises.rename(    //mover arquivo de lugar.
            path.resolve(uploadConfig.TMP_FOLDER, file), //acessando pasta temporaria
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)// acessando pasta onde upload realmente fica.
        )

        return file;
    }

    async deleteFile(file){
        const filePath=path.resolve(uploadConfig.UPLOADS_FOLDER,file);

        try{
            await fs.promises.stat(filePath); // conferindo se existe o arquivo no path passado como parametro(retorna um boolean)

        }catch{
            return // caso não tenha arquivo no diretório onde o upload realmente fica(UPLOAD_FOLDER), só retorna a função de delete e ela não acontece.
        }
        
        await fs.promises.unlink(filePath); //unlink: deleta.
    }
}

module.exports=DiskStorage;



