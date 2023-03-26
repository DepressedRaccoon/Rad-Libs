const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserInput extends Model {}

UserInput.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        blank_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'blank',
                key: 'id',
            },
        },
        model_instance_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'model_instance',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'user_input',
    },
);

module.exports = UserInput;