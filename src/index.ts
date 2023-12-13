import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Sequelize, DataTypes} from "sequelize";

import { CategoryModel } from "./models/category";
import { CustomerModel } from "./models/customer";
import { OrderItemModel} from "./models/order_item";
import { OrderModel } from "./models/order";
import { ProductModel } from "./models/product";
import { BlackListModel } from "./models/black_list";


// import { officialGameRouter } from "./router/officialGame";
// import { freeGameRouter } from "./router/freeGame";
// import { authRouter } from "./router/auth";
// import { userRouter } from "./router/users";

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
});

export const Category = CategoryModel(sequelize);
export const Customer = CustomerModel(sequelize);
export const OrderItem = OrderItemModel(sequelize);
export const Order = OrderModel(sequelize);
export const Product = ProductModel(sequelize);
export const blacklist = BlackListModel(sequelize);



// sequelize.sync({ force: true });
sequelize.sync();

const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const apiRouter = express.Router();
// apiRouter.use('/auth', authRouter);
// apiRouter.use('/official-games', officialGameRouter );
// apiRouter.use('/free-games', freeGameRouter);
// apiRouter.use('/users', userRouter);

// app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});