const sequelize = require('../config/connection');
const { User, MadLibForm, Blank, MadLibInstance, UserInput } = require('../models');

const userData = require('./userData.json');
const madLibFormData = require('./madLibFormData.json');
const blankData = require('./blankData.json');
const madLibInstanceData = require('./madLibInstanceData.json');
const userInputData = require('./userInputData.json');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        // The order we load data matters 

        await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
        });

        // build MadLibForms
        await MadLibForm.bulkCreate(madLibFormData);

        // build Blanks
        await Blank.bulkCreate(blankData);

        // build MadLibInstances
        await MadLibInstance.bulkCreate(madLibInstanceData);

        // build UserInputs
        await UserInput.bulkCreate(userInputData);

        process.exit(0);
    } catch (err) {
        console.error(err);
    }
}

seedDatabase();