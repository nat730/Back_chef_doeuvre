import { Sequelize, DataTypes } from "sequelize";

export const CatalogueModel = (sequelize: Sequelize) => {
    return sequelize.define('catalogue', {
      store: DataTypes.STRING,
    });
  };
  