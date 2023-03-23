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
    foreignKey: 'madlib_id',
});

Blanks.belongsTo(MadLib, {
    foreignKey: 'madlib_id',
});

module.exports = { User, MadLib, Blanks };