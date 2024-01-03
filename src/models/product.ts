import { DataTypes, Sequelize } from "sequelize"


export const ProductModel = (sequelize: Sequelize) => {
  return sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    priceperkg: DataTypes.FLOAT,
    priceasso: DataTypes.FLOAT,
    priceperkgasso: DataTypes.FLOAT,
    stock_quantity: DataTypes.STRING,
    FKcategory: {
      type: DataTypes.STRING,
      references: {
        model: 'CategoryModel',
        key: 'ID',
      },
    },
  }    , {
    timestamps: false, // Désactive les timestamps
  });
};