const { ObjectID } = require('mongodb')
const connectDb = require('./db')
const { DB_NAME } = process.env;


module.exports = {
    Restaurant: {
        menus: async ({menus}) => {
            let db
            let menuData
            let ids
            try {
                db = await connectDb()
                ids = menus ? menus.map(id => ObjectID(id)) : []
                menuData= ids.length > 0 ? await db.db(DB_NAME).collection('menu').find({_id:{$in:ids}}).toArray(): []
            } catch (error) {
                console.log(error);
            }
            return menuData
        }
    },
    Menu: {
        __resolveType: (menu, context, info) => {
            if (menu.drink_type) {
                return 'Drink'
            } else{
                return 'Food'
            }

        }
    },
    GlobalSearch:{
        __resolveType: (item, context, info) => {
            if (item.drink_type) {
                return 'Drink'
            } else if(item.food_type){
                return 'food'
            } else {
                return 'Restaurant'
            }
        }
    }
}