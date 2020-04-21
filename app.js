const express = require('express');
const {MongoClient} = require ('mongodb');

const app = express();
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

let db;
let todo;


const client = MongoClient.connect("mongodb://localhost:27017/employeedb", 
{ useUnifiedTopology: true }, (error, client)=>{
    if(!error){
      console.log("database Connected");
       db = client.db('employeedb')
       todo = db.collection('todo')
    } else{
      console.log("Database not connected")
    }
});


const employees = [ 
    {
    name: "Tina Djorsu",
    position: "CEO",
    employeeID: "2001",
    },
    {
        name: "Lilian Cruse",
        position: "Project Manager",
        employeeID: "2002",
    },
    {
        name: "Felix Doe",
        position: "System Analyste",
        employeeID: "2003",
    },   
    {
        name: "Mark Dick",
        position: "Manager",
        employeeID: "2004",
    }


]


app.get('/',(req, res) => {
    res.render('home', {employees});
});

app.get('/todolist', async (req, res)=>{
    const result = await todo.find({}).toArray()
    console.table(result)
    res.render('todo', {result})

})


app.post('/todolist', async (req, res)=>{
    let info = {
        name: req.body.name,
        position: req.body.position,
        todo: req.body.todo
    }
    const result = await todo.insertOne(info);
    res.redirect('/todolist') 
});

const port = 3400;

app.listen(port, ()=>{
  console.log("Server started on port " + port)
}); 