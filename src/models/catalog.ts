import { Sequelize, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

interface ICatalog extends Model<InferAttributes<ICatalog>, InferCreationAttributes<ICatalog>> {
  id?: CreationOptional<number>,
  store: string,
}


export const CatalogModel = (sequelize: Sequelize) => {
  return sequelize.define<ICatalog>("Catalog", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true
    },
    store: DataTypes.STRING,
  });
};
