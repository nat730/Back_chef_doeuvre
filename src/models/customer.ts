import { DataTypes, Sequelize } from "sequelize";

export const CustomerModel = (sequelize: Sequelize) => {
  return sequelize.define('customer', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
  });
};
