import "dotenv/config";
import express from "express";
import cors from "cors";
import { Sequelize} from "sequelize";

//import model
import { CategoryModel } from "./models/category";
import { CustomerModel } from "./models/customer";
import { OrderItemModel} from "./models/order_item";
import { OrderModel } from "./models/order";
import { ProductModel } from "./models/product";
import { BlackListModel } from "./models/black_list";

//import router
import { categoryRouter} from "./router/Category";
import { authRouter} from "./router/Customer";
import { productRouter} from "./router/Product";


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

Product.hasOne(Category, { foreignKey: 'category_id'});

// sequelize.sync({ force: true });
sequelize.sync();

const app = express();  
app.use(cors());
app.use(express.json());


const apiRouter = express.Router();
apiRouter.use('/category', categoryRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/product',productRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});