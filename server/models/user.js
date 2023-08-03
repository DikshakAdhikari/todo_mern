const mongoose = require('mongoose')
const express = require('express')

const userSchema= mongoose.Schema({
    username: String,
    password: String
})

const User= mongoose.model('User', userSchema);

module.exports= {User};