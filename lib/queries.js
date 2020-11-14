const connectDb = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')
const { DB_NAME } = process.env;

module.exports = {
    getRestaurants: async () => {
      let db
      let restaurants = []

      try {
        db = await connectDb()
        restaurants = await db.db(DB_NAME).collection('restaurant').find().toArray()
      } catch (error) {
        errorHandler(error)
      }
      return restaurants
    },
    getRestaurant: async (root, { id }) => {
        let db
        let restaurant
  
        try {
          db = await connectDb()
          restaurant = await db.db(DB_NAME).collection('restaurant').findOne({ _id: ObjectID(id) })
        } catch (error) {
          errorHandler(error)
        }
  
        return restaurant
      },
      getMenus: async () => {
        let db
        let restaurants = []
  
        try {
          db = await connectDb()
          restaurants = await db.db(DB_NAME).collection('menu').find().toArray()
        } catch (error) {
          errorHandler(error)
        }
        return restaurants
      },
    getMenu: async (root, { id }) => {
      let db
      let menu
      try {
        db = await connectDb()
        menu = await db.db(DB_NAME).collection('menu').findOne({ _id: ObjectID(id) })
      } catch (error) {
        errorHandler(error)
      }
      return menu
    },
      searchItems: async (root, { keyword }) => {
        let db
        let items
        let restaurants
        let menus
  
        try {
          db = await connectDb()
          restaurants = await db.db(DB_NAME).collection('restaurant').find({ $text: {$search:keyword} }).toArray()
          menus = await db.db(DB_NAME).collection('menu').find({ $text: {$search:keyword} }).toArray()
          items = [...restaurants, ...menus]
        } catch (error) {
          errorHandler(error)
        }
        return items
      }
  }