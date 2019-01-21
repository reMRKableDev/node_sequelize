const Sequelize = require('sequelize');

/*
- Setup connection to database with proper credentials
*/
const sequelize = new Sequelize('postgres', 'malcolmkente', null, {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false
});

/*
- Person: Model for the people table in your database. 
- License: Model for the drivers_license table in your database
*/
const Person = sequelize.define('person', {
    first_name: Sequelize.TEXT,
    last_name: Sequelize.TEXT,
    national_identification_number: Sequelize.INTEGER
});

const License = sequelize.define('drivers_license', {
    license_reference_number: Sequelize.INTEGER,
    allowed_vehicle: Sequelize.STRING,
    issue_date: Sequelize.DATEONLY,
    expiry_date: Sequelize.DATEONLY,
});


/* 
- Establishing 1:1 / one-one  association between the tables.
    belongsTo() : Sequelize method for establishing one-one relation.
*/
License.belongsTo(Person); // Adds personId column to 'drivers_license' table.

/*
- Create and populate tables.
    SQL QUERY TO TEST WITH ON POSTGRES: select * from people as p inner join drivers_licenses as l on p.id = l."personId";
*/
sequelize.sync({
        force: true
    })
    .then(() => {
        // These insert functions refer to the helper functions defined below. 
        insertIntoPeopleTable();
        insertIntoLicenseTable();
    })
    .catch((error) => {
        console.log(`Something went wrong when creating data for table: ${error.stack}`);
    });


/* HELPER FUNCTIONS */
function insertIntoPeopleTable() {
    Person.create({
        first_name: 'McLovin',
        last_name: 'McLovin',
        national_identification_number: 234987
    });
    Person.create({
        first_name: 'Jason',
        last_name: 'Bourne',
        national_identification_number: 999999
    });
}

function insertIntoLicenseTable() {
    License.create({
        license_reference_number: 214567,
        allowed_vehicle: 'B',
        issue_date: '2019-01-16',
        expiry_date: '2029-01-16',
        personId: 1
    });
    License.create({
        license_reference_number: 444444,
        allowed_vehicle: 'D',
        issue_date: '2018-02-16',
        expiry_date: '2028-02-16',
        personId: 2
    });
}
