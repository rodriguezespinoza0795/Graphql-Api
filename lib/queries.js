const connectDb = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
    getEmployees: async () => {
      let db
      let employees = []

      try {
        db = await connectDb()
        employees = await db.db('restaurant').collection('employee').find().toArray()
      } catch (error) {
        errorHandler(error)
      }

      return employees
    },
    getEmployee: async (root, { id }) => {
      let db
      let employee

      try {
        db = await connectDb()
        employee = await db.db('restaurant').collection('employee').findOne({ _id: ObjectID(id) })
      } catch (error) {
        errorHandler(error)
      }

      return employee
    },
    getCompanies: async () => {
        let db
        let restaurants = []
  
        try {
          db = await connectDb()
          restaurants = await db.db('restaurant').collection('restaurant').find().toArray()
        } catch (error) {
          errorHandler(error)
        }
  
        return restaurants
      },
      getCompany: async (root, { id }) => {
        let db
        let restaurant
  
        try {
          db = await connectDb()
          restaurant = await db.db('restaurant').collection('restaurant').findOne({ _id: ObjectID(id) })
        } catch (error) {
          errorHandler(error)
        }
  
        return restaurant
      },
      searchItems: async (root, { keyword }) => {
        let db
        let items
        let employees
        let companies
  
        try {
          db = await connectDb()
          employees = await db.db('restaurant').collection('employee').find({ $text: {$search:keyword} }).toArray()
          companies = await db.db('restaurant').collection('restaurant').find({ $text: {$search:keyword} }).toArray()
          items = [...employees, ...companies]
        } catch (error) {
          errorHandler(error)
        }
  
        return items
      }
  }