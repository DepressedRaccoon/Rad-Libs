const sequelize = require('../config/connection');
const { User, MadLib, Blanks } = require('../models');

const userData = require('./userData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    // build MadLibForms

    // build MadLibFormInputs

    // build MadLibInstances

    // build UserInputs
    // 1 UserInput for each MadLibFormInput associated with 
    // a given MadLibForm order by MadLibFormInput.order ASC

    process.exit(0);
}

seedDatabase();