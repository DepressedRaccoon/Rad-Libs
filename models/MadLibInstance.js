const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class MadLibInstance extends Model {}

MadLibInstance.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        completed_text: {
            type: DataTypes.TEXT,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        madlib_form_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'madlib_form',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'madlib_instance',
    },
);