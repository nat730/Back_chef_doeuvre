import { DataTypes, Sequelize } from "sequelize";

export const CustomerModel = (sequelize: Sequelize) => {
  return sequelize.define("customer", {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('admin','user'),
      defaultValue: "user"
    } 
  });
};