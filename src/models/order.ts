import { DataTypes, Sequelize } from "sequelize"

export const OrderModel = (sequelize: Sequelize) => {
  return sequelize.define('order', {
    order_date: DataTypes.STRING,
    status: DataTypes.STRING,
  });
}