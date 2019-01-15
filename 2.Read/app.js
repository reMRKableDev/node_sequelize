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
- Read from post table in database:
    > findOne() - Search for attributes.
    > findById() - Search for known ids.
    > findByPk() - Search for known primary keys.
    > findAll()*2 - Search for multiple elements in the database.
    > findOrCreate() - Search if an element already exists in the database. If the element does not yet exist, it will be created. Returns an array containing the object that was found or created and a boolean that will be 'true' if a new object was created and 'false' if not.
    
*/
sequelize.sync().then(() => {
    // findOne()
    /*Post.findOne({
        where: {
            title: 'Last one'
        }
    }).then((retrievedOne) => {
        console.log(retrievedOne.dataValues);
    }, (error) => {
        console.log(`Something went wrong when reading with findOne(): ${error.stack}`)
    });*/

    //findById
    /*Post.findById(2).then((retrievedPost) => {
        console.log(retrievedPost.dataValues);
    }, (error) => {
        console.log(`Something went wrong when reading with findById(): ${error.stack}`)
    });*/

    //findByPk
    /*Post.findByPk(2).then((retrievedPost) => {
        console.log(retrievedPost.dataValues);
    }, (error) => {
        console.log(`Something went wrong when reading with findById(): ${error.stack}`)
    });*/

    // findAll() - gets a specific post from your posts table by the id.
    /*Post.findAll({
        where: {
            id: 3
        }
    }).then((retrievedPost) => {
        //console.log(retrievedPost);
        console.log(retrievedPost[0].dataValues);
    }, (error) => {
        console.log(`Something went wrong when reading with findAll(): ${error.stack}`)
    });*/

    // findAll() - gets all data in your posts table
    /*Post.findAll().then((retrievedPostsArray) => {
        let dataValuesFromRetrievedPostArray = retrievedPostsArray.map((retrievedPost) => {
            return {
                title: retrievedPost.dataValues.title,
                body: retrievedPost.dataValues.body
            };
        });

        console.log(dataValuesFromRetrievedPostArray);
    }, (error) => {
        console.log(`Something went wrong when reading with findAll(): ${error.stack}`)
    });*/


    // .spread() - Like calling .then(), but the fulfillment value must be an array.
    /*Post.findOrCreate({
        where: {
            title: 'Extra post'
        },
        defaults: {
            body: 'More and More text to fill this body up'
        }
    }).spread((post, created) => {
        console.log(post.get({
            plain: true
        }));
        console.log(created);
    });*/

});
