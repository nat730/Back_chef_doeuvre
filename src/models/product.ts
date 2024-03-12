import { Sequelize, DataTypes } from "sequelize";

export const ProductModel = (sequelize: Sequelize) => {
  return sequelize.define("product", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    unit_value: DataTypes.ENUM('litre','kilogramme','unit'),
  });
};
