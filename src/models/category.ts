import { Sequelize, DataTypes } from "sequelize";

export const CategoryModel = (sequelize: Sequelize) => {
  return sequelize.define('category', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    timestamps: false,
  });
};
