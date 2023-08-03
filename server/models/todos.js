const mongoose = require('mongoose');
const express = require('express');

const todoSchema= mongoose.Schema({
    title: String,
    description: String,
    done: Boolean,
    userId:String
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports= {Todo}