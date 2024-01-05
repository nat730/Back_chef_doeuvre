import { DataTypes, Sequelize } from "sequelize"

export const CustomerModel = (sequelize: Sequelize) => {
  return sequelize.define('customer', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
  }    , {
    timestamps: false, // Désactive les timestamps
  });
};
