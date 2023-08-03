const express = require("express");
const app= express();
app.use(express.json());
require('dotenv').config();
const PORT=process.env.PORT|| 3001
const mongoose = require('mongoose');
const userRouter = require('./routes/user')
const todosRouter= require('./routes/todos')
app.use('/user',userRouter)
app.use('/todos',todosRouter)


mongoose.connect(process.env.MONGO_URI).then(()=> console.log('DB connected successfully')).catch((err)=> console.log(err))

app.listen(PORT, ()=> console.log(`Server listening at port ${PORT}`));