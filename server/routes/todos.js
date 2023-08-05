const express = require('express');
const { Todo } = require('../models/todos');
const verifyJwt = require('../middleware/verifyJwt');
const { User } = require('../models/user');
const router= express.Router();

router.post('/todo', verifyJwt, async (req,res)=> {
    try{
        const {title, description}= req.body;
        const done= false
        const userId= req.id.id;
        const obj= {title, description,done,userId};
        const todos = new Todo(obj);
        const newTodo= await todos.save();
       // console.log(newTodo);
        res.json(newTodo);
    }catch(err){
        res.status(403).json(err)
    }
});

router.get('/todo', verifyJwt, async(req,res)=> {
    try{
         const todos= await Todo.find({});
        //console.log(todos);
        const userId= req.id.id;
       // console.log(userId);
        const userTodos =  todos.filter((t)=> t.userId === userId)
        //console.log(userTodos);
        res.json({userTodos});
        

    }catch(err){
        res.json(err);
    }
})

router.patch('/:courseId/done', verifyJwt, async (req,res)=> {
    try{
        const {courseId} = req.params;
       
        const userId= req.id.id;
        const updatedTodo= await Todo.findOneAndUpdate({_id:courseId, userId:userId}, {done: true}, {new:true});
        if(updatedTodo){
            return res.json(updatedTodo);
        }else
        return res.json({message:'Todo not found'})
    }catch(err){
        res.status(403).json(err)
    }
});




module.exports= router