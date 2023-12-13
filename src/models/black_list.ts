import { DataTypes, Sequelize } from "sequelize";

export const BlackListModel = (sequelize: Sequelize) => {
    return sequelize.define('token-black-list', {
        token: DataTypes.STRING,
    });
}