const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();


const articleSchema = mongoose.Schema({
    title:{
        type:String,
        maxLength:100,
        required:[true,'You need a title']
    },
    content:{
        type:String,
        required:[true,'You need a content']
    },
    excerpt:{
        type:String,
        required:[true,'You need a excerpt'],
        maxLength:500,
    },
  
   
    
    status:{
        type:String,
        required:true,
        enum:['draft','public'],
        default:'draft',
        index:true
    },
   
    date:{
        type:Date,
        default: Date.now
    }
})

const Article = mongoose.model('Article', articleSchema);
module.exports = { Article }