const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/database';

class Database {
    async userRegistration(userName, email, password) {
        try {
            await MongoClient.connect(url, async (err, client) => {
                const db = await client.db('database');
                const collection = await db.collection('users');
                const user = {userName, email, password};
                const coincidenceName = await collection.findOne({userName});

                if(coincidenceName.userName !== user.userName) {
                    await collection.insertOne(user, (err, result) => {
                    if(err){ 
                        return console.log(err);
                    }
                });
                } else {
                    return console.log('Имя уже существует!');
                }

            });
            console.log('Подключение создано')
        }catch(err) {
            console.log(err);
        } finally {
            await MongoClient.close();
        }
    }
}

module.exports = Database;