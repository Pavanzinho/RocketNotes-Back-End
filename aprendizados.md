Este stage é o de API restfull, contudo, é preciso fazer a autenticação do usuário no back-end:

-Autentificação de usuários:
    *TOKEN de usuário: 
        é como se fosse um crachá que fornecemos ao cliente, para ele poder acessar o necessário de informações contidas no servidor. Isso, após passar por verificação(midlewares criados nos controllers, "SessionsControllers" neste caso)
    
    *composição token JWT:
        header: algorítimo e tipo do token
        payload: conteúdo do token->geralmente apenas o id
        verify signature: garante integridade do token.

-Configurando insomnia para, toda vez que a app fizer uma request de autentificação, já conseguir capturar o token automaticamente.
    -1°: menage Environments=> configurar utilizando " base environments"
    -2°: crtl + space para aparecer funções do insomnia.
    -3°: utilizar response=>body attribute   => acessar um atributo no corpo de alguma resposta
    -4°: configuração : 
        *Filter: $.token
        *Trigger Behavior: Always


-Gerando e configurando token para liberar acessos para cliente
    *Criação de um controller que identifique se as informações de login estão corretas, se sim, o token será inserido no id do usuário.(SessionsControllers)
       
    *Criação do middleware em sí:(ensureAuthentication)
        &Criar condicional que confere se existe token na request( request.headers.authorization) e gerar erro, caso não tenha.
        &Criar variável "token" utilizando   request.headers.authorization.split(é interessante atribuir request.headers.authorization a uma variável )
        &Verificar se a variável "token" confere com as configurações definidas em /configs.auth e renomear token, caso queira(user_id, por exemplo.)
            OBS: try, catch
        &Inserir uma propriedade "user" dentro de request atribuir o valor de token na  propriedade "id"  de "user"
        &Caso passe por todas as verificações, executar next() para para para a próxima função.

    OBS: lembrando que com o token criado, tendo suas configurações conferidas e sendo adicionado dentro do id do usuário, não precisa-se utilizar 
    params ou query, já que o token gerado pela verificação do usuário, já irá conter o id dentro dele

    &Bibliotecas : 
        bcryptjs: comparar senha passada pelo usuário com senha salva no banco de dados.
        jsonwebtoken: {sign}=>inserir id do usuário no token
        knex: acessar usuário na tabela sql.


-Configurando upload de imagem no back end.
    *Criação de um arquivo dentro de /configs que irá impedir a sobreposição de imagens dentro dos diretórios onde elas estaram presentes, pós upload do cliente. 
        Para isso, utiliza-se os modulos"multer", "path" e "crypto", todas presentes no proprio node modules.
            &path: definir diretório em uma variável, para adicionar as configurações no diretório, utilizando a variável como destino que "multer" irá configurar.
            &multer: é capaz de configurar especicificades sobre o arquivo no diretório contido dentro da variável criado por "path"
                -dentro desse arquivo, serão criados dois diretórios: diretório temporários e difinitivo.
                -a partir de multer.diskStorage é possível definir o destino das configuração(diretório temporário neste caso)  além dos parametros que irão ser utilizados nessa configuração, neste caso "file" que seria o nome do arquivo.
                -multer.diskStorage, fornece como parametro uma callback, que nesse caso, irá ter como parametro, a variável que foi alterada com a adição do hash, assim, como foi definida, uma variável que contém o diretório configurado(diskStorage), quando a variável for exportada, essas configurações já estarão imbutidas nela, o que justifica o próximo passo.
                assim, como 
            &crypto: neste caso, é utilizado para gerar um hash, que será unido como o nome da arquivo de imagem "file"(parametro da função multer.diskStorage), para asssim, cada imagem ter uma particularidade aleátoria que evitará sobreposições.

    *Encaminhamento e exclusão de imagens pós adição de hash.
        -Criar arquivo DiskStorage.js, que possuirá uma classe com funções:
            &uma delas move o arquivo do diretório temporário para o definitivo
            &outra exclui a imagem anterior, caso tenha, do diretório definitivo, pq o usuário possuíra só uma foto de perfil, a outra será excluida
            

    &Bibliotecas/e ou modulos :
    -path: insere diretório em uma variável
    -multer: (neste caso, utilizei apenas multer.diskStorage). adiciona configurações nos diretórios criado com "path" e gera call back que será atribuida automaticamente a esse diretório configurado.
    -crypto: geração de hash aleatório para ser combinado com o nome do arquivo, e assim criar uma variável que contenha o nome modificado que será atribuida na call back de multer.diskStorage
    -fs: mover e deletar as imagens/arquivos que estaram contidas dentro dos diretórios configurados por multer.diskStorage.


 





    
        


     


        





