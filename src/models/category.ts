import { Sequelize, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

interface ICategory extends Model<InferAttributes<ICategory>, InferCreationAttributes<ICategory>> {
  id: CreationOptional<number>,
  description: string,
  name: string,
}

export const CategoryModel = (sequelize: Sequelize) => {
  return sequelize.define<ICategory>("category", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  },
    {
      timestamps: false,
    },
  );
};
