const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blanks extends Model {}

Blanks.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        typeOfSpeech: {
            type: DataTypes.STRING,
            allowNull: false, 
            // unique: false,
        },
        madLib_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'madLib',
              key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blanks',
    },
);

module.exports = Blanks;