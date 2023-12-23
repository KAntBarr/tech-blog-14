const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }


Comment.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        created_on: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        post_id: {
            type: DataTypes.UUID,
            references: {
                model: 'post',
                key: 'id',
            },
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;
