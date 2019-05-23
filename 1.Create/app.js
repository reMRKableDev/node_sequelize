require("dotenv").config({ path: "../.env" });

const Sequelize = require("sequelize");

/* 
- Connect to db.
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

/* Test database connection */
connector
  .authenticate()
  .then(() => {
    console.log(
      `Connection to ${process.env.DB_NAME} has been established successfully.`
    );
  })
  .catch(err => {
    console.error(
      `Unable to connect to the ${process.env.DB_NAME} database: ${err.stack}`
    );
  });

/* 
- Define Model for Post.
- Models are defined with sequelize.define('name', {attributes}, "{options}").
*/
const Post = connector.define("post", {
  title: Sequelize.STRING,
  body: Sequelize.STRING
});

/* 
- Create new table from model above & populate with data.
- {force: true} will drop the table if it already exists.
*/

connector
  .sync({ force: true })
  .then(() => {
    Post.create({
      title: "New Artwork",
      body: "This is a body text for some artwork"
    });
    Post.create({
      title: "Some other random post",
      body: "More random text for this post"
    });
    Post.create({
      title: "Last one",
      body: "You should really be getting some sleep now"
    });
  })
  .catch(error =>
    console.error(
      `Something went wrong when trying to create a table: ${error.stack}`
    )
  );
