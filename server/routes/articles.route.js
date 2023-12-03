const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles.controller');
const { addArticleValidator } =  require('../middleware/validation');

const auth = require('../middleware/auth');

router.post('/',auth('createAny','articles'),addArticleValidator, articlesController.createArticle)

// ById
router.route('/article/:id')
.get(auth('readAny','articles'),articlesController.getArticleById)


module.exports = router;


