const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blank extends Model {}

Blank.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        part_of_speech: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        madlib_form_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'madlib_form',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blank',
    },
);

module.exports = Blank;