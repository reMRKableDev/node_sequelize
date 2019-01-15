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
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
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
- Update data post table in database
*/
sequelize.sync().then(() => {
    /*Post.update({
        title: 'Really Last One'
    }, {
        where: {
            title: 'Last one'
        }
    }).then((retrievedPost) => {
        console.log(retrievedPost);
    }, (error) => {
        console.log(`Something went wrong when updating: ${error.stack}`)
    });*/

    Post.findOne({
        where: {
            title: 'Really Last One'
        }
    }).then((retrievedPost) => {
        retrievedPost.update({
            title: 'Last LAST one'
        });
    }, (error) => {
        console.log(`Something went wrong when updating: ${error.stack}`)
    });
});
