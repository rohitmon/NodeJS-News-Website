// https://raddy.dev/wp-json/wp/v2/posts

const express  = require('express');
const newsRouter = express.Router()
const axios = require('axios')

newsRouter.get('' , async(req , res) => {
   
   try {
    const newsAPI = await axios.get(`https://raddy.dev/wp-json/wp/v2/posts`)
    res.render('news' , {articles : newsAPI.data})
   } catch (err) {
     if(err.response){
        res.render('news' , {articles : null})
        console.log(err.response.data);
        console.log(err.response.header);
        console.log(err.response.status);
     } else if(err.request){
        res.render('news' , {articles : null})
        console.log(err.request);
     } else {
        console.error('Error' , err.message);
     }
   }
})

newsRouter.get('/:id' , async(req , res) => {

    let articleID = req.params.id;

    try {
     const newsAPI = await axios.get(`https://raddy.dev/wp-json/wp/v2/posts/${articleID}`)
     res.render('newsSingle' , {article : newsAPI.data})
    } catch (err) {
      if(err.response){
         res.render('news' , {article : null})
         console.log(err.response.data);
         console.log(err.response.header);
         console.log(err.response.status);
      } else if(err.request){
         res.render('news' , {article : null})
         console.log(err.request);
      } else {
         console.error('Error' , err.message);
      }
    }
 })

module.exports = newsRouter