const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class MadLibForm extends Model {}

MadLibForm.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        template_name: {
            type: DataTypes.STRING,
        },
        text: {
            type: DataTypes.TEXT,
        },
        num_blanks: {
            type: DataTypes.INTEGER,
        },
        user_id: {
            type: DataTypes.INTEGER,
            defaultValue: 'NULL',
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'madlib_form',
    }
);

module.exports = MadLibForm;