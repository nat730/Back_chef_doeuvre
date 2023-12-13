import { DataTypes, Sequelize } from "sequelize"

export const CustomerModel = (sequelize: Sequelize) => {
  return sequelize.define('category', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fistname: DataTypes.STRING,
    lastnam: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    adress: DataTypes.STRING,
  });
}