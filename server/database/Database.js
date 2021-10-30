const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/database';

class Database {
    async userRegistration(userName, email, password) {
        try {
            await MongoClient.connect(url, async (err, client) => {
                    const db = await client.db('database');
                    const collection = await db.collection('users');
                    const user = {userName, email, password};
                    await collection.findOne({userName})
                        .then(item => {
                            if(!item) {
                                 collection.insertOne(user, (err, result) => {
                                    if(err){
                                        return console.log(err);
                                    }
                                    console.log('Пользователь добавлен');
                                });
                            } else {
                                return console.log('Имя уже существует!');
                            }
                        })
                        // .then(item => {
                        //     client.close();
                        //     console.log('Подключение закрыто!')
                        // });
            });
        }catch(err) {
            throw err;
        }
    }
}

module.exports = Database;