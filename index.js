import express from 'express';
import { StatusCodes } from 'http-status-codes';

const app = express();
const PORT = process.env.PORT || 3000; //variável de ambiente ou valor default
let users = [
    { id: 1, name: 'Erick Luciano', age: 33 },
    { id: 2, name: 'Pedro Luciano', age: 11 },
];

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/', (request, response) => {
    return response.send('<h1>Trabalhando com servidor expess.</h1>');
});

app.get('/users', (request, response) => {                                //primeira rota
    return response.send(users);
});

app.get('/users/:userId', (request, response) => {   
    const userId = request.params.userId;
    const user = users.find(user => {                                    //find percore a lista de usuários, retorna o primeiro elemento
        return user.id === Number(userId);                               //number converte o parâmetro de rota de string para número
    });         
    return response.send(users);
});

app.post('/users', (request, response) => {                              //POST
    const newUser = request.body;                  

    users.push(newUser);

    return response.status(StatusCodes.CREATED).send(newUser);
});

app.put('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const updatedUser = request.body;

    users = users.map(user => {                                         //atualizar lista modificada e retornar novo usuário
        if (Number(userId) === user.id) {                               //PUT
            return updatedUser;
        }

        return user;
    });

    return response.send(updatedUser);
});

app.delete('/user/:userId', (request, response) => {
    const userId = request.params.userId;

    users = users.filter((user) => user.id !== Number(userId));

    return response.status(StatusCodes.NO_CONTENT).send();
});