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
- Create new table from model above & populate with data.
- {force: true} will drop the table if it already exists.
*/

sequelize.sync({
    force: true
}).then(() => {
    Post.create({
        title: 'New Artwork',
        body: 'This is a body text for some artwork'
    });
    Post.create({
        title: 'Some other random post',
        body: 'More random text for this post'
    });
    Post.create({
        title: 'Last one',
        body: 'You should really be getting some sleep now'
    });
}, (error) => {
    console.log(`Something went wrong when creating data for table: ${error.stack}`);
});
