import "dotenv/config";
import express from "express";
import cors from "cors";
import { Sequelize } from "sequelize";

// Importez les modèles
import { CategoryModel } from "./models/category";
import { CustomerModel } from "./models/customer";
import { OrderItemModel } from "./models/order_item";
import { OrderModel } from "./models/order";
import { ProductModel } from "./models/product";
import { BlackListModel } from "./models/black_list";
import { CatalogModel } from "./models/catalog";
import { CatalogItemModel } from "./models/catalog_item";


// Importez les routes
import { categoryRouter } from "./router/Category";
import { authRouter } from "./router/Customer";
import { productRouter } from "./router/Product";
import { catalogRouter } from "./router/Catalog";
import { orderRouter } from "./router/Order";
import { orderItemRouter } from "./router/Orderitem";
import { productCatalogItemRouter } from "./router/Product_catalogitem";


// Initialisez Sequelize avec votre configuration
const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  dialectOptions: { ssl: true, }
});


// Définissez vos modèles
export const Category = CategoryModel(sequelize);
export const Customer = CustomerModel(sequelize);
export const OrderItem = OrderItemModel(sequelize);
export const Order = OrderModel(sequelize);
export const Product = ProductModel(sequelize);
export const BlackList = BlackListModel(sequelize);
export const Catalog = CatalogModel(sequelize);
export const CatalogItem = CatalogItemModel(sequelize);


Customer.hasMany(Order, { foreignKey: "customer_id" });
Order.belongsTo(Customer, { foreignKey: "customer_id" });

Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Product.hasMany(OrderItem, { foreignKey: "product_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });

Product.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasOne(Product, { foreignKey: 'category_id' });

Product.hasMany(CatalogItem, { foreignKey: 'product_id' });
CatalogItem.belongsTo(Product, { foreignKey: 'product_id' });

Catalog.belongsToMany(Product, { through: CatalogItem, foreignKey: 'catalog_id' });
Product.belongsToMany(Catalog, { through: CatalogItem, foreignKey: 'product_id' });

// sequelize.sync({ force: true });
sequelize.sync();

// Configuration d'Express et écoute sur le port
const app = express();
app.use(cors());
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use("/categories", categoryRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/product", productRouter);
apiRouter.use("/order", orderRouter);
apiRouter.use("/orderitem", orderItemRouter);
apiRouter.use("/catalog", catalogRouter);
apiRouter.use("/productcatalogitem", productCatalogItemRouter);


app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
