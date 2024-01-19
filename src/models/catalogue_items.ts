import { Sequelize, DataTypes } from "sequelize";

export const CatalogueItemModel = (sequelize: Sequelize) => {
    return sequelize.define('catalogue_item', {
      quantity: DataTypes.INTEGER,
      price_unity: DataTypes.FLOAT,
      product_id: DataTypes.INTEGER,
      catalogue_id: DataTypes.INTEGER,
    }, {
      timestamps: false,
    });
  };
  