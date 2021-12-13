
const express = require('express');
const router = express.Router();
const {
    ObjectId
} = require('bson');
const data = require('../data');
var shop = data.shop
var product = data.products
var productDatas = data.products
var xss = require("xss");
const routesvalidation = require('../validation/routesvalidation');

router.get("/", async(req,res)=>{
    
    res.render("pages/home");
});


router.get("/allProduct", async(req, res) => {
    var allProduct = await productDatas.getAll();
    var user = req.session.user;
  var data = {
       allProducts:  allProduct,
       userId: user
    }
    res.render("productList", data);
})

router.post("/search.html", async (req, res) => {
    const body = req.body;
    try {
      let productList = await productDatas.getProductsViaSearch(body.search);
      var user = req.session.user;
      let newProductList = [];
        for (product of productList) {
          if (product.reviews&&product.reviews.length > 0) {
              product.rated = true;
          } else {
              product.rated = false;
          }
          newProductList.push(product);
        }
      
      if (productList.length > 0) {
        res.status(200).render("productList", { allProducts: productList,
            userId: user});
      } else {
        res.status(200).render("productList", { allProducts: [],
            userId: user});
      }
    } catch (e) {
      console.log(e);
      res.status(500).render('pages/error500', {message:e})
    }
  })

router.get("/login", async (req, res) => {
    // console.log(req.session.user.authenticatedUser._id)

    var id = (req.session.userId)
    // console.log("--------------------------------")
    // console.log(id)
    // var shopId = id.toString();
    if (req.session.username) {
        res.redirect(`/shopId/${id}`);
        //     res.redirect(`/shopId/${req.session._id}`);
        return;
    } else {
        res.render("s_login/s_login");
        return;
    }
});

router.get("/signup", async (req, res) => {
    // if(req.session.username){
    //     res.redirect(`/shopId/${req.session._id}`);
    //     return;
    // }
    // else{
    res.render("s_signup/s_signup");
    return;
    // }
});

router.post("/signup", async (req, res) => {
    routesvalidation.routeshopNamevalidation(xss(req.body.ShopName));
    routesvalidation.routeuserNamevalidation(xss(req.body.username));
    routesvalidation.routefirstnamevalidation(xss(req.body.ownerFirstname));
    routesvalidation.routelastnamevalidation(xss(req.body.ownerLastname));
    routesvalidation.routeemailvalidation(xss(req.body.email));
    routesvalidation.routepincodevalidation(xss(req.body.pincode));
    routesvalidation.routephonenumbervalidation(xss(req.body.phoneNumber));
    routesvalidation.routepasswordValidation(xss(req.body.password));
    try {
        try {
            // console.log(req.body.username);
            // console.log(req.body.password);
            console.log("aa---------------------------------------------------")
            const newShopkeeper = await shop.createShopkeeper(
                    xss(req.body.ShopName), 
                    xss(req.body.username),
                    xss(req.body.ownerFirstname),
                    xss(req.body.ownerLastname),
                    xss(req.body.Address),
                    xss(req.body.email),
                    xss(req.body.pincode),
                    xss(req.body.phoneNumber),
                    xss(req.body.password),
                    xss(req.body.overallRating),
                    xss(req.body.item),
                    xss(req.body.message),
                    xss(req.body.comment),
                    xss(req.body.rating));
            console.log(newShopkeeper)
            if (newShopkeeper.userInsterted) {
                res.redirect("/shop/login");
                return;
            }
        } catch (e) {
            res.status(400).render("s_signup/s_signup", {
                "error": e
            });
            return;
        }
    } catch (e) {
        
        res.status(500).render('pages/error500', {message:"Internal server error"})

        return;
    }
});

router.post("/login", async (req, res) => {
    try {
        try {
            // console.log(req.body.username);
            // console.log(req.body.password);
            const existingUser = await shop.checkShopkeeper(
                xss(req.body.username),
                 xss(req.body.password));
          //  console.log("check------------------------------------------------")
             req.session.shop = existingUser;
            // console.log(existingUser)
            if (existingUser) {
                req.session.username = req.body.username;
                var shopId = existingUser.authenticatedUser._id.toString();
                req.session.userId = existingUser.authenticatedUser._id.toString();
                // res.redirect(`/shopId/${shopId}`);
                res.status(200).json({message : "Successfully logged in", shopId : shopId});
                return;
            } else {
                res.status(400).render("s_login/s_login", {
                    "error": "Either username or password is incorrect"
                });
            }
        } catch (e) {
            console.log(e);
            res.status(400).render("s_login/s_login", {
                "error": "Either the username or password is incorrect"
            });
        }
    } catch (e) {
        res.status(500).render('pages/error500', {message:"Internal server error"})

    }
});

router.get(`/shopId/:id`, async (req, res) => {
    var idd = req.params.id
    try {
        const User = await shop.get(idd);
        console.log(User)

        if (User) {
            // req.session.username = req.body.username;
            // req.session.userId = User._id.toString();
            res.render("s_private/s_private", {
                username: User.username
            });
            return;
        }
    } catch (e) {
        console.log(e);
    }
});

router.get("/logout", async (req, res) => {
    console.log('inside logout')
    console.log(req.session)
    req.session.destroy();
    // var id = (req.session.userId)
    // // console.log("--------------------------------")
    // // console.log(id)
    // // var shopId = id.toString();
    // if (req.session.username) {
    //     res.redirect(`/shopId/${id}`);


    //if (!id) {
        res.redirect('/shop/login');
        return;
   // }
  
    // res.redirect(`/shopId/${id}`);
   // return;
});

router.get("/edit/:id", async (req, res) => {
    var idd = req.params.id;
    console.log(idd)
    //let details = req.session.user.authenticatedUser
    // req.session.destroy();

    var shopDetail = await shop.getAllDataOfShop(idd);
   // console.log(shopDetail)
   if(shopDetail=='404' |!shopDetail|shopDetail==null){
    res.status(404).render('pages/error404', {message:"page not found"})
    return;
   }
    req.session.shop = shopDetail;
    console.log(req.session.shop)
    // console.log(details)
    res.render("s_edit/s_edit", {
        userId: shopDetail
    });
    return;
});

router.put("/edit/shop/:id", async (req, res) => {
    var idd = req.params.id;
    let shopkeeper_info = req.body;
    // if(!(ObjectId.isValid(req.params.id))){
    //     res.status(400).render("s_edit/s_edit", {"error" : "There is no session created for this id"});
    // }
    
    var shopDetail = await shop.getAllDataOfShop(idd);
    req.session.usershop = shopDetail
    if (!shopkeeper_info) {
        res.status(400).render("s_edit/s_edit", {
            userId: shopDetail,
            "error": "Must provide every details in the edit form"
        });
        return;
    }
    // if (!shopkeeper_info.ShopName) {
    //     res.status(400).render("s_edit/s_edit", {
    //         userId: shopDetail,
    //         "error": "Must provide the Shop name"
    //     });
    //     return;
    // }
    if (!shopkeeper_info.username) {
        res.status(400).render("s_edit/s_edit", {
            userId: shopDetail,
            "error": "Must provide username"
        });
        return;
    }
    if (!shopkeeper_info.ownerFirstname) {
        res.status(400).render("s_edit/s_edit", {
            userId: shopDetail,
            "error": "Must provide First name"
        });
        return;
    }
    if (!shopkeeper_info.ownerLastname) {
        res.status(400).render("s_edit/s_edit", {
            userId: shopDetail,
            "error": "Must provide Last name"
        });
        return;
    }
    if (!shopkeeper_info.email) {
        res.status(400).render("s_edit/s_edit", {
            userId: shopDetail,
            "error": "Must provide email"
        });
        return;
    }
    if (!shopkeeper_info.phoneNumber) {
        res.status(400).render("s_edit/s_edit", {
            userId: shopDetail,
            "error": "Must provide phone number"
        });
    }
    routesvalidation.routeuserNamevalidation(xss(req.body.username));
    routesvalidation.routefirstnamevalidation(xss(req.body.ownerFirstname));
    routesvalidation.routelastnamevalidation(xss(req.body.ownerLastname));
    routesvalidation.routeemailvalidation(xss(req.body.email));
    routesvalidation.routepincodevalidation(xss(req.body.pincode));
    routesvalidation.routephonenumbervalidation(xss(req.body.phoneNumber));

    try {
        await shop.get(req.params.id)
    } catch (e) {
        res.status(500).render('pages/error500', {message:"Internal server error"})
        return;
    }
    try {
        console.log(req.body.username);
        console.log(req.body.password);
        const newShopkeeper = await shop.updateShopkeeper(
            req.params.id,
            xss(shopkeeper_info.username),
            xss(shopkeeper_info.ownerFirstname),
            xss(shopkeeper_info.ownerLastname),
            xss(shopkeeper_info.Address),
            xss(shopkeeper_info.email),
            xss(shopkeeper_info.pincode),
            xss(shopkeeper_info.phoneNumber)
        );
        console.log(newShopkeeper);
        if (newShopkeeper.updateInserted) {
            res.redirect(`/shopId/${idd}`);
            // console.log("EDIT//");
            return;
        }
    } catch (e) {
        res.status(400).render("s_edit/s_edit", {
            userId: shopDetail,
            "error": e
        });
        return;
    }


    // try{
    //     await shop.get(req.params.id)
    // }
    // catch(e){
    //     res.status(404).json({error : "Restaurant not found"});
    //     return;
    // }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        // const delete_id = await data.get(req.params.id);
        const remove_shop = await shop.removeShop(req.body.userId);
        if (remove_shop) {
            req.session.username = req.body.username;
            console.log(req.session.username);
            req.session.userId = existingUser.authenticatedUser._id.toString();
            console.log("Delete");
            if (remove_shop.deleted) {
                res.render("s_delete/s_delete", {
                    "message": "Account deleted successfully"
                });
                return;
            }
        }
    } catch (e) {
        //do nothing
    }
});


module.exports = router;

