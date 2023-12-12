import { DataTypes, Sequelize } from "sequelize";
import ORDER from "./order";
import PRODUCT from "./product";


const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
})

const ORDERITEM = sequelize.define('OrderItem', {
  item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  price: {
    type: DataTypes.FLOAT,
  },
});

ORDERITEM.belongsTo(ORDER, { foreignKey: 'order_id' });
ORDER.hasMany(ORDERITEM, { foreignKey: 'order_id' });

ORDERITEM.belongsTo(PRODUCT, { foreignKey: 'product_id' });
PRODUCT.hasMany(ORDERITEM, { foreignKey: 'product_id' });

export default ORDERITEM