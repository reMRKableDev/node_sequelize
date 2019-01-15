const Sequelize = require('sequelize');

/* 
- Connect to db Alt.1 (alternative-way is in alternatives.txt file) 
- operatorsAliases: false -> Removes deprecated error which shows up on terminal. 
*/
const sequelize = new Sequelize('<DATABASE_NAME>', '<DATABASE_OWNER/USER>', '<DATABASE_PASSWORD>', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false
});

/* Test database connection */
sequelize
    .authenticate()
    .then(() => {
        console.log(`Connection has been established successfully.`);
    })
    .catch(err => {
        console.error(`Unable to connect to the database: ${err}`);
    });

/* 
- Define Model for Post.
- Models are defined with sequelize.define('name', {attributes}, "{options}").
*/
const Post = sequelize.define('post', {
    title: Sequelize.STRING,
    body: Sequelize.TEXT
});

/* 
- Delete data post table in database
*/
sequelize.sync().then(() => {
    /*Post.destroy({
        where: {
            id: 3
        }
    }).then(console.log('Successfully deleted row'));*/

    Post.findOne({
        where: {
            title: 'Extra post'
        }
    }).then((retrievedPost) => {
        retrievedPost.destroy();
    });
});
