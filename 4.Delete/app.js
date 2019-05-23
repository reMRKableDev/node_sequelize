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
    dialect: "postgres",
    operatorsAliases: false
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
- Delete data post table in database
*/
connector.sync().then(() => {
  Post.destroy({
    where: {
      id: 3
    }
  }).then(console.log("Successfully deleted row"));
});
