const Sequelize = require('sequelize');
const express = require('express');
const path = require('path');

const sequelize = new Sequelize('postgres', 'malcolmkente', null, {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false
});

const User = sequelize.define('user', {
    name: Sequelize.STRING
});
const Languages = sequelize.define('language', {
    name: Sequelize.STRING
});
const Fluency = sequelize.define('fluency', {
    level: Sequelize.STRING
});

/* 
- Establish M:M / many-many association between tables. 
    belongsToMany() : 
*/
User.belongsToMany(Languages, {
    through: Fluency
});
Languages.belongsToMany(User, {
    through: Fluency
});

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    Promise.all([
		User.findAll(),
		Languages.findAll(),
		Fluency.findAll()
	]).then((entities) => {
        let persons = entities[0].map(function (row) {
            return {
                id: row.dataValues.id,
                name: row.dataValues.name
            };
        });
        console.log('The people: ', persons);

        let languages = entities[1].map(function (row) {
            return {
                id: row.dataValues.id,
                name: row.dataValues.name
            };
        });
        console.log('The languages: ', languages);

        let fluencys = entities[2].map(function (row) {
            let personName = persons.find(function (person) {
                return person.id === row.dataValues.userId;
            }).name;
            let languageName = languages.find(function (language) {
                return language.id === row.dataValues.languageId;
            }).name;

            return {
                userId: row.dataValues.userId,
                userName: personName,
                languageId: row.dataValues.languageId,
                languageName: languageName,
                level: row.dataValues.level
            };
        });

        console.log('The fluencys: ', fluencys);

        res.render('index', {
            persons: persons,
            languages: languages,
            fluencys: fluencys
        });
    });
});

app.post('/users', (req, res) => {
    User.create({
        name: req.body.name
    }).then(() => {
        res.redirect('/');
    })
});

app.post('/languages', function (req, res) {
    console.log(req.body.name)
    Languages.create({
        name: req.body.name
    }).then(function () {
        res.redirect('/');
    })
});

app.post('/fluency', function (req, res) {
    Fluency.create({
        level: req.body.level,
        languageId: req.body.languageId,
        userId: req.body.userId
    }).then(function () {
        res.redirect('/');
    }, function () {
        res.redirect('/');
    });
});



// App listen
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Listening to port ${3000}`);
    });
});
