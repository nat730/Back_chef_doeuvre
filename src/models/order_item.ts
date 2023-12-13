import { DataTypes, Sequelize } from "sequelize";

export const OrderItemModel = (sequelize: Sequelize) => {
  return sequelize.define('orderitem', {
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
  });
}