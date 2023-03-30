const User = require('./User');
const MadLibForm = require('./MadLibForm');
const Blank = require('./Blank');
const UserInput = require('./UserInput');
const MadLibInstance = require('./MadLibInstance');

User.hasMany(MadLibForm, {
    foreignKey: 'user_id',
});
MadLibForm.belongsTo(User);

MadLibForm.hasMany(Blank, {
    foreignKey: 'madlib_form_id',
});
Blank.belongsTo(MadLibForm);

User.hasMany(MadLibInstance, {
    foreignKey: 'user_id',
});
MadLibInstance.belongsTo(User);

MadLibForm.hasMany(MadLibInstance, {
    foreignKey: 'madlib_form_id',
});
MadLibInstance.belongsTo(MadLibForm);

Blank.hasMany(UserInput, {
    foreignKey: 'blank_id',
});
UserInput.belongsTo(Blank);

MadLibInstance.hasMany(UserInput, {
    foreignKey: 'madlib_instance_id',
});
UserInput.belongsTo(MadLibInstance);

module.exports = {
    User,
    MadLibForm,
    Blank,
    UserInput,
    MadLibInstance,
};