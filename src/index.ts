import "dotenv/config";
import express from "express";
import { Sequelize} from "sequelize";
import { CategoryModel } from "./models/category";
import { CustomerModel } from "./models/customer";
import { OrderItemModel} from "./models/order_item";
import { OrderModel } from "./models/order";
import { ProductModel } from "./models/product";
import { BlackListModel } from "./models/black_list";
import cors from "cors";

import { addCategoryRouter} from "./router/Category/add_category";
import { delCategoryRouter} from "./router/Category/del_category";
import { getCategoryRouter} from "./router/Category/get_category";
import { updCategoryRouter} from "./router/Category/update_category";
import { passwordcustomerRouter} from "./router/Customer/change_password";
import { mailcustomerRouter} from "./router/Customer/change_mail";
import { phonecustomerRouter} from "./router/Customer/change_phone";
import { logincustomerRouter} from "./router/Customer/login";
import { logoutcustomerRouter} from "./router/Customer/logout";
import { registercustomerRouter} from "./router/Customer/register";
import { addproductRouter} from "./router/Product/add_product";
import { delproductRouter} from "./router/Product/del_product";
import { getproductRouter} from "./router/Product/get_product";
import { updproductRouter} from "./router/Product/update_product";


export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
});

export const Category = CategoryModel(sequelize);
export const Customer = CustomerModel(sequelize);
export const OrderItem = OrderItemModel(sequelize);
export const Order = OrderModel(sequelize);
export const Product = ProductModel(sequelize);
export const BlackList = BlackListModel(sequelize);

Customer.hasMany(Order, { foreignKey: 'customer_id' });
Order.belongsTo(Customer, { foreignKey: 'customer_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

Product.belongsTo(Category, { foreignKey: 'category_id', as: 'productCategory' });
Category.hasMany(Product, { foreignKey: 'category_id', as: 'categoryProducts' });




// sequelize.sync({ force: true });
sequelize.sync();

const app = express();

app.use(cors());

app.use(express.json());

// Routes pour la gestion des catégories
app.use(addCategoryRouter);
app.use(delCategoryRouter);
app.use(getCategoryRouter);
app.use(updCategoryRouter);

// Routes pour la gestion des clients
app.use(passwordcustomerRouter);
app.use(mailcustomerRouter);
app.use(phonecustomerRouter);
app.use(logincustomerRouter);
app.use(logoutcustomerRouter);
app.use(registercustomerRouter);

// Routes pour la gestion des produits
app.use(addproductRouter);
app.use(delproductRouter);
app.use(getproductRouter);
app.use(updproductRouter);


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});