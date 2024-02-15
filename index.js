const express = require("express");
const route = require("./routes");
const mongoose=require('mongoose')
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/todo-list')

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

app.use(express.json());
app.use(route);

app.use((err, req, res, next) => {
res.status(404).json({ error: err.message });
});




const port = 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
