import { Sequelize, DataTypes } from "sequelize";

export const ProductModel = (sequelize: Sequelize) => {
  return sequelize.define('product', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price_unity: DataTypes.FLOAT,
    unity_value: DataTypes.FLOAT,
    unity_symbol: DataTypes.ENUM('litre','kilogramme','unit'),
    price_asso: DataTypes.FLOAT,
    price_per_kg_asso: DataTypes.FLOAT,
    stock_quantity: DataTypes.INTEGER,
  });
};
