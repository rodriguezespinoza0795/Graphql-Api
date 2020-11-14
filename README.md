## Run Project

Clone this repository  
`git clone https://github.com/rodriguezespinoza0795/Graphql-Api.git`

Install dependencies  
`npm install`

This application has a connection to MongoDb, 
to create your own server visit this [page](https://docs.atlas.mongodb.com/tutorial/create-new-cluster/).  
When you have your own cluster, create a file with the new credentials.  
`touch .env`  

Example Format
```
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_NAME=
```
Connect to mongo db by terminal  
`mongo "mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority"`

create database  
`use menu`

create collections  
`db.createCollection("restaurant")`
`db.createCollection("menu")`

create index for each collection  
`db.restaurant.createIndex({"$**": "text"})` 

run as development  
`npm run dev`


## What can you do?
Show all restaurants|menus:
```
{
  getRestaurants{
    _id
    name
    menus{
      _id
      name
    }
  }
}
{
  getMenus{
    _id
    name
    calories 
  }  
}  
```
Create new restaurant|menu: 
```
mutation {
  createRestaurant(input:{name:"Starbucks Coffee Company"}){
    _id
  }
}
mutation {
  createMenu(input:{name:"White Chocolate Mocha", calories:430, drink_type:Hot }){
    _id
    name 
    calories 
  }
}
```
Search a restaurant|menu by ID: 
```
{
  getRestaurant(id:"5fb0133d7509912e881e2c2c"){
    _id
    name
  }  
}
{
  getMenu(id:"5fb05b9989eb525cec6826f2"){
    _id
    name
    calories
  }  
}

```
Delete a restaurant|menu by ID: 
```
mutation {
  deleteRestaurant(id:"5fb0133d7509912e881e2c2c") 
}
mutation {
  deleteMenu(id:"5fb05b9989eb525cec6826f2") 
}
```
Edit Restaurant|menu by ID 
```
mutation {
  editRestaurant(id:"5fb054119622290f641f75b9", input:{name:"Starbucks Coffee"}){
    _id
    name
  }
}
mutation {
  editMenu(id:"5fb05b9989eb525cec6826f2", input:{name:"White Chocolate Mocha", calories:450}){
    _id
    name
    calories
  }
}
```
Add menu to Restaurant
```
mutation {
  addMenu(MenuID:"5fb05fd960c6b735d81e9a28", RestaurantID:"5fb0601460c6b735d81e9a29"){
    _id
    name
  }
}
```
Global Search
```
{
  searchItems(keyword:"Starbucks"){
    __typename
    ... on Restaurant {
      name
    }
    ... on Food {
      name
    }
    ... on Drink {
      name
    }
  }
}
```