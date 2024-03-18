import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export interface ICustomerCleanValue {
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  address: string,
  role: string,
}

export interface ICustomerClean extends Model<InferAttributes<ICustomer>, InferCreationAttributes<ICustomer>> {
  id: CreationOptional<number>,
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  address: string,
  role: string,
}

export interface ICustomer extends ICustomerClean {
  id: CreationOptional<number>,
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  address: string,
  role: string,
  password: string,
}

export const CustomerModel = (sequelize: Sequelize) => {
  return sequelize.define<ICustomer>("customer", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: "user"
    }
  });
};