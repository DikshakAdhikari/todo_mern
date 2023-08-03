const express = require('express');
const { Todo } = require('../models/todos');
const verifyJwt = require('../middleware/verifyJwt');
const router= express.Router();

router.post('/todo', verifyJwt, async (req,res)=> {
    try{
        const {title, description}= req.body;
        const done= false
        const userId= req.id.id;
        const obj= {title, description,done,userId};
        const todos = new Todo(obj);
        await todos.save();
        res.json(todos);
    }catch(err){
        res.status(403).json(err)
    }
});

router.get('/todo', verifyJwt, async(req,res)=> {
    try{
        const todos= await Todo.find({});
        res.json({todos});

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
})


module.exports= router