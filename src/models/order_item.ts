import { DataTypes, Sequelize } from "sequelize";

export const OrderItemModel = (sequelize: Sequelize) => {
  return sequelize.define("order_item", {
    quantity: DataTypes.INTEGER,
    price_by_unity: DataTypes.FLOAT,
    unity_value: DataTypes.FLOAT,
    unity_symbol: DataTypes.ENUM('Litre','KiloGrammes','unity'),
    price_asso: DataTypes.FLOAT,
    price_per_kg_asso: DataTypes.FLOAT,
  });
};
