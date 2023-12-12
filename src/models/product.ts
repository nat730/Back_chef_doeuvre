import { DataTypes, Sequelize } from "sequelize"
import CATEGORY from "./category";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
})

const PRODUCT = sequelize.define('Product', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    price_per_kg: {
      type: DataTypes.FLOAT,
    },
    price_special: {
      type: DataTypes.FLOAT,
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
    },
  });

PRODUCT.belongsTo(CATEGORY, { foreignKey: 'category_id' });
CATEGORY.hasMany(PRODUCT, { foreignKey: 'category_id' });

export default PRODUCT;