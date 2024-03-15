import { Sequelize, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

interface ICatalogitem extends Model<InferAttributes<ICatalogitem>, InferCreationAttributes<ICatalogitem>> {
  id: CreationOptional<number>,
  price: number,
  price_asso: number,
  image: string,
  product_id: number
}

export const CatalogItemModel = (sequelize: Sequelize) => {
  return sequelize.define<ICatalogitem>("CatalogItem", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement:true
    },
    price: DataTypes.FLOAT,
    price_asso: DataTypes.FLOAT,
    image: DataTypes.STRING,
    product_id: DataTypes.NUMBER
  });
}
