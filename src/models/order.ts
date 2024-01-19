import { DataTypes, Sequelize } from "sequelize"

export const OrderModel = (sequelize: Sequelize) => {
  return sequelize.define('order', {
    order_date: DataTypes.DATE,
    status: DataTypes.ENUM('payed','canceled', 'completed'),
    defaultValue: 'pending',
    collect_schedule: DataTypes.DATE,
    customer_id: DataTypes.INTEGER,
  });
};

