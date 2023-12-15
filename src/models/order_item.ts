import { DataTypes, Sequelize } from "sequelize";

export const OrderItemModel = (sequelize: Sequelize) => {
  return sequelize.define('orderitem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    Num_Order: {
      type: DataTypes.INTEGER,
      references: {
        model: 'OrderModel',
        key: 'ID',
      },
    },
  }    , {
    timestamps: false, // Désactive les timestamps
  });
};