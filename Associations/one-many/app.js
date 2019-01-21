const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', 'malcolmkente', null, {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false
});

/*
- Blogger: Model for the blogger table in your database. 
- Post: Model for the posts table in your database
*/
const Blogger = sequelize.define('blogger', {
    name: Sequelize.STRING
});

const Post = sequelize.define('post', {
    title: Sequelize.STRING,
    body: Sequelize.TEXT
});

/* 
- Establishing 1:M / one-many  association between the tables.
    hasMany() : Sequelize method for establishing one-many relation.
    belongsTo() : Sequelize method for establishing one-one relation.
*/
Blogger.hasMany(Post);
Post.belongsTo(Blogger);


/*
- Create and populate tables.
    SQL QUERY TO TEST WITH ON POSTGRES: select distinct b.* from bloggers b inner join posts p  on p."bloggerId" = p.id;
*/
sequelize.sync({
        force: true
    })
    .then(function () {
        Blogger.create({
                name: 'Whit Witwicki'
            })
            .then(function (person) {
                Post.create({
                    title: 'Sequelize for NodeJS',
                    body: 'Sequelize, a promise-based ORM for Node.',
                    bloggerId: 1
                });
                Post.create({
                    title: 'hasMany()',
                    body: 'One-To-Many associations are connecting one source with multiple targets.',
                    bloggerId: 1
                });
                Post.create({
                    title: 'Sequelize for NodeJS',
                    body: 'Sequelize, a promise-based ORM for Node.',
                    bloggerId: 1
                });
            });
    });
