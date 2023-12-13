import { DataTypes, Sequelize } from "sequelize"

export const OrderModel = (sequelize: Sequelize) => {
  return sequelize.define('order', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_date: DataTypes.STRING,
    status: DataTypes.STRING,
  });
}