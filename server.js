const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3000

async function main() {
    await mongoose.connect('mongodb+srv://soorajcpchathanathparampil:Todo_password@cluster0.5iova.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
}

main()
.then(()=> {
    console.log("DB Connected")
})

const TodoSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const Todo = mongoose.model('todos', TodoSchema);

app.use(express.json())
app.use((req, res, next) => {
    console.log("Successfully Reached")
    next()
})

app.get('/todos', async (req, res) => {
    try{
      const todos = await Todo.find({});
      res.json(todos);
    }catch (err) {
      res.status(500).json({ error: 'Error when fetching todos' });
    }
});
  
app.post('/todos', (req, res) => {
    let todos = new Todo(req.body)
    todos.save(todos)
    res.send("Reponse for POST requsest")
})

app.put('/todos/:idx', (req, res) => {
    let idx = req.params.idx
    let todos = req.body
    Todo.findByIdAndUpdate(idx, todos).exec()
    res.send("Reponse for PUT requsest")
})

app.delete('/todos/:idx', (req, res)=> {
    let idx = req.params.idx
    Todo.findByIdAndDelete(idx).exec()
    res.send("Reponse for DELETE requsest")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
