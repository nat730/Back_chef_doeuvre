import { DataTypes, INTEGER, Sequelize } from "sequelize"

export const CategoryModel = (sequelize: Sequelize) => {
  return sequelize.define('category', {
    idcategory: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  });
}
