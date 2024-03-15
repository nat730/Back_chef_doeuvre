import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

interface IOrder extends Model<InferAttributes<IOrder>, InferCreationAttributes<IOrder>> {
  id: CreationOptional<number>,
  order_date: Date,
  status: string,
  collect_schedule: number,
}

export const OrderModel = (sequelize: Sequelize) => {
  return sequelize.define<IOrder>("order", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement:true
    },
    order_date: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM("payed", "canceled", "pending"),
      defaultValue: "pending"
    },
    collect_schedule: DataTypes.DATE, //date de récupération
  });
};
