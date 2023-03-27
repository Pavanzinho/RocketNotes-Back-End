class AppError{
    message;
    statusCode;
    constructor(message,statusCode=400){ // ao chamar a classe colocando parametro, já executa a constructor com seus parametros.
        this.message=message;
        this.statusCode=statusCode;
    }
}

module.exports=AppError;
