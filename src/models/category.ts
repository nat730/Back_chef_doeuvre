import { DataTypes, Sequelize } from "sequelize";

export const CategoryModel = (sequelize: Sequelize) => {
  return sequelize.define('category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    timestamps: false, // Désactive les timestamps
  });
};
