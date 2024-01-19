import { Sequelize, DataTypes } from "sequelize";

export const CatalogueModel = (sequelize: Sequelize) => {
    return sequelize.define('catalogue', {
      order_date: DataTypes.DATE,
      status: DataTypes.STRING,
    }, {
      timestamps: false,
    });
  };
  