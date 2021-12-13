const session = require('express-session')
const express = require("express");
const methodOverride = require('method-override');
const app = express();
const routes = require("./routes");
const exphbs = require('express-handlebars');
app.engine("handlebars", exphbs({defaultLayout : "main"}));
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));

// app.use(express.bodyParser())
// app.use(express.methodOverride())

app.use(methodOverride('_method'));

// GOOGLE login



app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}));


  // app.use(async(req,res,next)=>{
  //   user_status= "(Non-Authenticated User)"
  
  //   if(req.session.user){
  //     user_status="(Authenticated User)"
  //   }
    
  //   console.log(`[${new Date().toUTCString()}] : ${req.method} ${req.originalUrl} ${user_status}`);
  //   next()
  // })
  

  app.get('/',(req,res,next)=>{
      if(req.session.user){

        return  res.redirect(`/users/${req.session.user.id}/allshop`)
      }else if(req.session.shop){
        if(req.session.shop.authenticatedUser ){
        res.redirect(`/shopId/${req.session.shop.authenticatedUser._id}`);}
        else{
          res.redirect(`/shopId/${req.session.shop._id}`)
        }

      }else{
        next()
      }




  })
  app.get('/users/login', (req, res, next) => {
 
    if (req.session.user) {
      //req.method = 'GET';
     // res.redirect(`/users/${id2}/allshop`)
     //console.log(req.session.user)
      return  res.redirect(`/users/${req.session.user.id}/allshop`)
    } else if(req.session.shop) { if(req.session.shop.authenticatedUser ){
      res.redirect(`/shopId/${req.session.shop.authenticatedUser._id}`);}
      else{
        res.redirect(`/shopId/${req.session.shop._id}`)
      }}
     else{
      //here I',m just manually setting the req.method to post since it's usually coming from a form
     next()
    }
  });
  app.use('/users/:id/shop/:id', (req,res,next)=>{
    if(!req.session.user){
       return res.redirect('/users/login');
    }
    next();
  })
  app.use('/users//shop/:id', (req,res,next)=>{
    if(!req.session.user){
       return res.redirect('/users/login');
    }
    next();
  })
// app.use('/private', (req,res,next)=>{
//     if(!req.session.username){
//        return res.redirect('/');
//     }
//     else{
//         next();
//     }
// });
app.use('/users/profile', (req,res,next)=>{
  if(!req.session.user){
     return res.redirect('/users/login');
  }
  else{
      next();
  }
});
app.use('/users/:id/allshop', (req,res,next)=>{
  if(!req.session.user){
     return res.redirect('/users/login');
  }
  else{
      next();
  }
});



app.get('/users/signup', (req, res, next) => {
 
  if (req.session.user) {
    //req.method = 'GET';
    return res.redirect(`/users/${req.session.user.id}/allshop`);
  } else if(req.session.shop){ if(req.session.shop.authenticatedUser ){
    res.redirect(`/shopId/${req.session.shop.authenticatedUser._id}`);}
    else{
      res.redirect(`/shopId/${req.session.shop._id}`)
    }
  } else{
    //here I',m just manually setting the req.method to post since it's usually coming from a form
   next()
  }
});


app.get('/users/logout',(req,res,next)=>{
  if(req.session.user){
     req.session.destroy()
    } else if(req.session.shop) { if(req.session.shop.authenticatedUser ){
      res.redirect(`/shopId/${req.session.shop.authenticatedUser._id}`);}
      else{
        res.redirect(`/shopId/${req.session.shop._id}`)
      }    }
  else{
    return res.redirect('/users/login');
  }
  next()

});
  
app.get('/users/seeprofile', (req, res, next) => {
 
  if (req.session.user) {
    //req.method = 'GET';
    next()
    
  } else {
    //here I',m just manually setting the req.method to post since it's usually coming from a form
    return res.redirect('/users/login'); }});
  app.get('/users/profiledetail', (req, res, next) => {
 
    if (req.session.user) {
      //req.method = 'GET';
      next()
      
    } else {
      //here I',m just manually setting the req.method to post since it's usually coming from a form
      return res.redirect('/users/login');
    }});
    app.get('/users/updateprofile', (req, res, next) => {
 
      if (req.session.user) {
        //req.method = 'GET';
        next()
        
      } else {
        //here I',m just manually setting the req.method to post since it's usually coming from a form
        return res.redirect('/users/login');
      }});




      

      app.use('/shop/signup', (req,res,next)=>{
        if(req.session.shop){

           if(req.session.shop.authenticatedUser ){
        res.redirect(`/shopId/${req.session.shop.authenticatedUser._id}`);}
        else{
          res.redirect(`/shopId/${req.session.shop._id}`)
        }
        }else if(req.session.user){
           res.redirect(`/users/${req.session.user.id}/allshop`)
        }
        else{
          next();
        }
      });
      app.use('/shop/login', (req,res,next)=>{
        if(req.session.shop){
          if(req.session.shop.authenticatedUser ){
            res.redirect(`/shopId/${req.session.shop.authenticatedUser._id}`);}
            else{
              res.redirect(`/shopId/${req.session.shop._id}`)
            } 
        } else if(req.session.user){
          res.redirect(`/users/${req.session.user.id}/allshop`)
        }
        else{
          next()
        }
      });
      // app.get('/shop/logout',(req,res,next)=>{
      //   if(req.session.shop){
      //      req.session.destroy()
      //      //req.session.destroy()
      //      res.redirect('/shop/login');
      //     }
      //   else{
      //     return res.redirect('/shop/login');
      //   }
      //   next()
      // });
      app.get('/edit/shop/:id', (req,res,next)=>{
        if(!req.session.shop){
          res.redirect('/shop/login');
          return;
        }
        next();
      })
      // app.use('/edit/shop/:id', (req,res,next)=>{
      //   if(!req.session.shop){
      //     next();
      //   }
      //   else{
      //     res.redirect("shop/login");
      //     return;
      //   }
      // });
      // app.use('/allProduct', async(req,res,next)=>{
      //   if(req.session.user){
      //     res.render
      //   }
      // })
      app.get('/shop/edit/:id', (req,res,next)=>{
        if(!req.session.shop){
          res.redirect('/shop/login');
          return;
        }
        next();
      })
      app.get('/shopId/:id', (req,res,next)=>{
        if(!req.session.shop){
          res.redirect('/shop/login');
          return;
        }
        next();
      })
      app.use(`/shop/shopId/:id`, (req,res,next)=>{
        if(!req.session.shop){
          res.redirect('/shop/login');
        }else{
        next();}
      })
      app.use(`/shopid/editItem/:id`, (req,res,next)=>{
        if(!req.session.shop){
          res.redirect('/shop/login');
        }
        next();
      })


// app.use('shop/addItem/:id', (req,res,next)=>{
//   if(req.session.)
// })

// app.use((req,res,next)=>{
//     if(req.body._mehtod === "DELETE"){
//         req.method = "delete"
//     }
//     next();
// })



// app.use((req,res,next)=>{
//     let str = "";
//     if(req.session.username)
//         str = "User is authenticated";
//     else
//         str = "User is not authenticated";
//     console.log(new Date().toUTCString(), req.method, req.originalUrl, str);
//     next();
// })

routes(app);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
// app.listen(port);
 

app.listen(port, () => {
    console.log("Your server started at http://localhost:3000");
})