import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

interface IOrderItem extends Model<InferAttributes<IOrderItem>, InferCreationAttributes<IOrderItem>> {
  id: CreationOptional<number>,
  quantity: number,
  price_by_unity: number,
  unity_value: number,
  unity_symbol: string,
  price_asso: string,
  price_per_kg_asso: string,
}

export const OrderItemModel = (sequelize: Sequelize) => {
  return sequelize.define<IOrderItem>("order_item", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true
    },
    quantity: DataTypes.INTEGER,
    price_by_unity: DataTypes.FLOAT,
    unity_value: DataTypes.FLOAT,
    unity_symbol: DataTypes.ENUM('litre', 'kilogramme', 'unit'),
    price_asso: DataTypes.FLOAT,
    price_per_kg_asso: DataTypes.FLOAT,
  });
};
