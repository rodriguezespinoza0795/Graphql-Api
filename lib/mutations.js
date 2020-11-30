const { ObjectID } = require("mongodb");
const connectDb = require("./db");

const { DB_NAME } = process.env;

module.exports = {
  createRestaurant: async (root, { input }) => {
    let db;
    let restaurant;
    try {
      db = await connectDb();
      restaurant = await db.db(DB_NAME).collection("restaurant").insertOne(input);
      input._id = restaurant.insertedId;
    } catch (error) {
      console.log(error);
    }
    return input;
  },
  deleteRestaurant: async (root, { id }) => {
    let db;
    try {
      db = await connectDb();
      await db.db(DB_NAME).collection("restaurant").deleteOne({ _id: ObjectID(id) });
    } catch (error) {
      console.error(error);
    }
    return true;
  },
  editRestaurant: async (root, { id, input }) => {
    let db;
    let restaurant;
    try {
      db = await connectDb();
      restaurant = await db.db(DB_NAME).collection("restaurant").updateOne(
        { _id: ObjectID(id) },
        { $set: input },
      );
      restaurant = await db.db(DB_NAME).collection("restaurant").findOne({ _id: ObjectID(id) });
    } catch (error) {
      console.log(error);
    }
    return restaurant;
  },
  createMenu: async (root, { input }) => {
    let db;
    let menu;
    try {
      db = await connectDb();
      menu = await db.db(DB_NAME).collection("menu").insertOne(input);
      input._id = menu.insertedId;
    } catch (error) {
      console.log(error);
    }
    return input;
  },
  editMenu: async (root, { id, input }) => {
    let db;
    let menu;
    try {
      db = await connectDb();
      menu = await db.db(DB_NAME).collection("menu").updateOne(
        { _id: ObjectID(id) },
        { $set: input },
      );
      menu = await db.db(DB_NAME).collection("menu").findOne({ _id: ObjectID(id) });
    } catch (error) {
      console.log(error);
    }
    return menu;
  },
  deleteMenu: async (root, { id }) => {
    let db;
    try {
      db = await connectDb();
      await db.db(DB_NAME).collection("menu").deleteOne({ _id: ObjectID(id) });
    } catch (error) {
      console.error(error);
    }
    return true;
  },
  addMenu: async (root, { MenuID, RestaurantID }) => {
    let db;
    let restaurant;
    let menu;
    try {
      db = await connectDb();
      restaurant = await db.db(DB_NAME).collection("restaurant").findOne({ _id: ObjectID(RestaurantID) });
      menu = await db.db(DB_NAME).collection("menu").findOne({ _id: ObjectID(MenuID) });
      if (!restaurant || !menu) throw new error("El Restaurant o Menu no existe");
      await db.db(DB_NAME).collection("restaurant").updateOne({ _id: ObjectID(RestaurantID) }, { $addToSet: { menus: ObjectID(MenuID) } });
    } catch (error) {
      console.error(error);
    }
    return menu;
  },
};
