//configurações de autor, para utilizar na hora de gerar o token para o usuário.

module.exports={
    jwt: {
        secret: process.env.AUTH_SECRET || "default",
        expiresIn: "1d"
    }
}

