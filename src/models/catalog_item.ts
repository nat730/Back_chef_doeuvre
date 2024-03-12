import { Sequelize, DataTypes } from "sequelize";

export const CatalogItemModel = (sequelize: Sequelize) => {
  return sequelize.define("CatalogItem", {
    price: DataTypes.FLOAT,
    price_asso: DataTypes.FLOAT,
    image: DataTypes.STRING,
  });
}
