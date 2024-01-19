import { Sequelize, DataTypes } from "sequelize";

export const CatalogModel = (sequelize: Sequelize) => {
    return sequelize.define('Catalog', {
      store: DataTypes.STRING,
    });
  };
  