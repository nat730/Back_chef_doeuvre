import { DataTypes, Sequelize } from "sequelize"
import CUSTOMER from "./customer";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
})

const ORDER = sequelize.define('Order', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_date: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
  });

ORDER.belongsTo(CUSTOMER, { foreignKey: 'customer_id' });
CUSTOMER.hasMany(ORDER, { foreignKey: 'customer_id' });

export default ORDER;