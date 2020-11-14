const { ObjectID } = require('mongodb')
const connectDb = require('./db')


module.exports = {
    Restaurant: {
        employees: async ({employees}) => {
            let db
            let employeeData
            let ids
            try {
                db = await connectDb()
                ids = employees ? employees.map(id => ObjectID(id)) : []
                employeeData= ids.length > 0 ? await db.db('restaurant').collection('employee').find({_id:{$in:ids}}).toArray(): []
            } catch (error) {
                console.log(error);
            }
            return employeeData
        }

    },
    Company: {
        __resolveType: (company, context, info) => {
            if (company.phone) {
                return 'Provider'
            } else{
                return 'Restaurant'
            }

        }
    },
    GlobalSearch:{
        __resolveType: (item, context, info) => {
            if (item.phone) {
                return 'Provider'
            } else if(item.city){
                return 'Restaurant'
            } else {
                return 'Employee'
            }
        }
    }
}