const { ObjectID } = require('mongodb')
const connectDb = require('./db')

module.exports = {
    createEmployee:async (root, {input}) => {
        
        const defaults = {
            // id_supervisor=0
        }
        const newEmployee = Object.assign(defaults,input)
        let db
        let employee
        try {
            db= await connectDb()
            employee= await db.db('restaurant').collection('employee').insertOne(newEmployee)
            newEmployee._id = employee.insertedId
        } catch (error) {
            console.log(error);
        }
        return newEmployee
    },
    createCompany:async (root, {input}) => {
        const defaults = {
            // id_supervisor=0
        }
        const newRestaurant = Object.assign(defaults,input)
        let db
        let restaurant
        try {
            db= await connectDb()
            restaurant= await db.db('restaurant').collection('restaurant').insertOne(newRestaurant)
            newRestaurant._id = restaurant.insertedId
        } catch (error) {
            console.log(error);
        }
        return newRestaurant
    },
    editEmployee:async (root, {id,input}) => {
        let db
        let employee
        try {
            db= await connectDb()
            employee= await db.db('restaurant').collection('employee').updateOne(
                {_id : ObjectID(id)},
                { $set : input}
                )
            employee = await db.db('restaurant').collection('employee').findOne({ _id: ObjectID(id) })

        } catch (error) {
            console.log(error);
        }
        return employee
    },
    editCompany:async (root, {id, input}) => {
        let db
        let restaurant
        try {
            db= await connectDb()
            restaurant= await db.db('restaurant').collection('restaurant').updateOne(
                {_id : ObjectID(id)},
                { $set : input}
                )
                restaurant = await db.db('restaurant').collection('restaurant').findOne({ _id: ObjectID(id) })

        } catch (error) {
            console.log(error);
        }
        return restaurant
    },
    deleteEmployee: async (root, { id }) => {
        let db
        try {
        db = await connectDb()
        await db.db('restaurant').collection('employee').deleteOne({ _id: ObjectID(id)})
        } catch (error) {
            console.error(error)
        }
        return true
      },
      deleteCompany:async (root, { id }) => {
        let db
        try {
        db = await connectDb()
        await db.db('restaurant').collection('restaurant').deleteOne({ _id: ObjectID(id)})
        } catch (error) {
            console.error(error)
        }
        return true
        },
        addEmployee: async (root, {RestaurantID, EmployeeID}) => {
            let db
            let restaurant
            let employee
            try {
                db = await connectDb()
                restaurant = await db.db('restaurant').collection('restaurant').findOne({ _id: ObjectID(RestaurantID) })
                employee = await db.db('restaurant').collection('employee').findOne({ _id: ObjectID(EmployeeID) })
                if (!restaurant || !employee) throw new error('El Restaurant o Empleado no existe')
                await db.db('restaurant').collection('restaurant').updateOne(
                    {_id : ObjectID(RestaurantID)},
                    { $addToSet : {employees:ObjectID(EmployeeID)}}
                    )
            } catch (error) {
                console.error(error)
            }
            return restaurant
        }
    

}