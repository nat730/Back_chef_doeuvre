import { Sequelize, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

interface IProduct extends Model<InferAttributes<IProduct>, InferCreationAttributes<IProduct>> {
  id: CreationOptional<number>,
  name: string,
  description: string,
  category_id: string,
  unit_value: string
}

export const ProductModel = (sequelize: Sequelize) => {
  return sequelize.define<IProduct>("product", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    unit_value: DataTypes.ENUM('litre', 'kilogramme', 'unit')
  });
};
