require("dotenv").config({ path: "../.env" });

const Sequelize = require("sequelize");

/* 
- Connect to db
- operatorsAliases: false -> Removes deprecated error which shows up on terminal. 
*/
const connector = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres"
  }
);

/* 
- Define Model for Post.
- Models are defined with sequelize.define('name', {attributes}, "{options}").
*/
const Post = connector.define("post", {
  title: Sequelize.STRING,
  body: Sequelize.TEXT
});

/* 
- Read from post table in database:
    > findOne() - Search for attributes
    > findByPk() - Search for known primary keys.
    > findAll()*2 - Search for multiple elements in the database.
    
*/
connector.sync().then(() => {
  // findOne()
  /*  Post.findOne({
    where: {
      title: "Last one"
    }
  })
    .then(retrievedOne => {
      console.log(retrievedOne.dataValues);
    })
    .catch(error => {
      console.error(
        `Something went wrong when reading with findOne(): ${error.stack}`
      );
    }); */
  //findByPk
  /*   Post.findByPk(2).then(
    retrievedPost => {
      console.log(retrievedPost.dataValues);
    },
    error => {
      console.(
        `Something went wrong when reading with findById(): ${error.stack}`
      );
    }
  ); */
  // findAll() - gets a specific post from your posts table by the id.
  /*   Post.findAll({
    where: {
      id: 3
    }
  }).then(
    retrievedPost => {
      //console.log(retrievedPost);
      console.log(retrievedPost[0].dataValues);
    },
    error => {
      console.error(
        `Something went wrong when reading with findAll(): ${error.stack}`
      );
    }
  ); */
  // findAll() - gets all data in your posts table
  Post.findAll().then(
    retrievedPostsArray => {
      //console.log(retrievedPostsArray);
      let dataValuesFromRetrievedPostArray = retrievedPostsArray.map(
        retrievedPost => {
          return {
            title: retrievedPost.dataValues.title,
            body: retrievedPost.dataValues.body
          };
        }
      );

      console.log(dataValuesFromRetrievedPostArray);
    },
    error => {
      console.error(
        `Something went wrong when reading with findAll(): ${error.stack}`
      );
    }
  );
});
