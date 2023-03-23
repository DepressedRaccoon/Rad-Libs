const User = require('./user');
const MadLib = require('./madLib');
const Blanks = require('./blanks');

User.hasMany(MadLib, {
    foreignKey: 'user_id',
});

MadLib.belongsTo(User, {
    foreignKey: 'user_id',
});

MadLib.hasMany(Blanks, {
    foreignKey: 'madLib_id',
});

Blanks.belongsTo(MadLib, {
    foreignKey: 'madLib_id',
});

module.exports = { User, MadLib, Blanks };