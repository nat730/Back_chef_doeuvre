import { DataTypes, Sequelize } from "sequelize"


export const ProductModel = (sequelize: Sequelize) => {
  return sequelize.define('Product', {
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
    category: {
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