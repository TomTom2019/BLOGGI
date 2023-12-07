const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');
const { Article } = require('../models/article')

const addArticle = async(body) => {
 
  try{
        const article = new Article({
            ...body,
            score:parseInt(body.score)
        });
        await article.save();
        return article;
    }catch(error){
        throw error;
    }
}
const getArticleById = async(_id,user) => {
    try{
        if(user.role === 'user'){
            throw new ApiError(httpStatus.BAD_REQUEST,'Sorry you are not allowed')
        }
        const article = await Article.findById(_id);
        if(!article) throw new ApiError(httpStatus.NOT_FOUND,'Article not found');
        return article;
    }catch(error){
        throw error;
    }
}

const updateArticleById = async(_id,body) => {
    try{
        const article = await Article.findOneAndUpdate(
            {_id},
            {"$set":body },
            { new:true }
        )
        if(!article) throw new ApiError(httpStatus.NOT_FOUND,'Article not found')
        return article;
    }catch(error){
        throw error;
    }
}

const deleteArticleById = async(_id) => {
    try{
        const article = await Article.findByIdAndRemove(_id);
        if(!article) throw new ApiError(httpStatus.NOT_FOUND,'Article not found')
        return article;
    }catch(error){
        throw error;
    }
}

const getUsersArticleById  = async(_id) => {
    try{
        const article = await Article.findById(_id)
        if(!article) throw new ApiError(httpStatus.NOT_FOUND,'Article not found')

        if(article.status === 'draft'){
            throw new ApiError(httpStatus.BAD_REQUEST,'You are not allowed')
        }
        return article;
    }catch(error){
        throw error;
    }
}

const allArticles = async(req) => {
    ///  jsjs/sortby=_id&&order=desc&limit=3
    const sortby = req.query.sortby || "_id";
    const order = req.query.order || "desc";
    const limit =  req.query.limit || 2; 

    try{
       const articles =await Article
       .find({status:'public'})
       .populate('')
       .sort([
            [sortby,order]
       ])
       .limit(parseInt(limit));
        return articles;
    }catch(error){
        throw error;
    }
}




module.exports = {

    addArticle,
    getArticleById,
    updateArticleById,
    deleteArticleById,
    getUsersArticleById,
    allArticles
}