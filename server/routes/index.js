const express = require('express');
const router = express.Router();

// ROUTES
const authRoute = require('./auth.route')
const userRoute = require('./user.route');
const articlesRoute = require('./article.route');

const routesIndex = [
    {
        path:'/auth',
        route:authRoute
    },
    {
        path:'/users',
        route:userRoute
    },
    {
        path:'/article',
        route:articlesRoute
    }
]

// router.use(path,file)
routesIndex.forEach((route)=>{
    router.use(route.path,route.route);
})


module.exports = router