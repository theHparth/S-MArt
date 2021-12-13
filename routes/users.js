const express = require('express');
const router = express.Router();
const data = require('../data');
const user = data.user;
const shopData = data.shop;
const productData = data.products;
var xss = require('xss');
var validator = require("email-validator");
const userdata = require('../data/user')
const userdata2 = userdata
const ObjectId = require('mongodb').ObjectId;


// router.get('/', async (req, res) => {
//     try {
//         const userList = await user.getAll();
//         const data = {
//             title: "All user",
//             alluser: userList,
//         };
//         res.render('allUser', data);
//     } catch (e) {
//         res.status(404).json({
//             error: e
//         });
//     }
// });


router.get('/:id1/allshop', async (req, res) => {
  

    try {

        const userid = req.params.id1;
        const restaurantList = await shopData.getShopWithItem();

        const userInfo = await user.getUser(userid);
        if(userInfo=='404'|userInfo==null|!userInfo){
            res.status(404).render('pages/error404', {message:"page not found"})
            return
        }
        var userId = userInfo._id
        var noRest;
        var restaurantListData;
        if (restaurantList.length == 0) {
            noRest = "Sorry No Restaurent found with good Deal"
        } else {
            restaurantListData = restaurantList;
        }
        const data = {
            title: "Shop List",
            allShop: restaurantListData,
            noData: noRest,
            userdata: userInfo,
            userId: userId
        };
        res.render('allShopUserView', data);
    } catch (e) {
        
        res.status(404).render('pages/error404', {message:"page not found"})
    }
});

router.get('/:idUser/shop/:shopId', async (req, res) => {
    try {
        const userid = req.params.idUser;
        const shopId = req.params.shopId;
        const userInfo = await user.getUser(userid);
        const shopDetail = await shopData.getAllDataOfShop(shopId);
        const getShopbyId = await productData.getAllProduct(shopId);
        var shopComment = shopDetail.comment;
        var overallRatings = shopDetail.overallRating;
        var noComments;
        var commentForShop;
        var noRatig;
        var or;

        if (getShopbyId.comment.length != 0) {
            commentForShop = shopComment
        } else {
            noComments = "No review for this shop"
        }
        if (overallRatings == 0) {
            noRatig = "No Review for this Shop"
        } else {
            or = overallRatings;
        }


        var shopName = shopDetail.ShopName;
        var shopAdd = shopDetail.Address;
        var shopIdd = shopDetail._id;
        var shopPin = shopDetail.pincode;
        if (getShopbyId) {
            const dataa = {
                allItem: getShopbyId.item,
                shopName: shopName,
                pincode: shopPin,
                shopId: shopIdd,
                userData: userInfo,
                shopDetail: shopDetail,
                commentForShop: commentForShop,
                noComment: noComments,
                noRating: noRatig,
                averageRating: or,
                shopAddress: shopAdd
            };
            res.render('userView', dataa);
            return;
        }

    } catch (e) {
        res.status(404).render('pages/error404', {message:"page not found"})
    }
});

router.post('/:idUser/shop/:shopId', async (req, res) => {
    const userid = req.params.idUser;
    const shopId = req.params.shopId;

    const {
        message,
        comment,
        review,
        replayMessage
    } = req.body;


    try {
        const userInfo = await user.getUser(userid);
        const shopInfo = await shopData.getAllDataOfShop(shopId);
        const getShopbyId = await productData.getAllProduct(shopId);
        var shopComment = shopInfo.comment;
        var noComment;

        var msgs;
        var coms;
        if (message) {
            msgs = "Thanks for sending replay"
        }
        if (comment) {
            coms = "Thanks For sending Comment"
        }


        if (review) {


            var checkuser = await shopData.checkuser(userInfo, shopId, review)
            if (checkuser != undefined) {
                const getShopbyId = await productData.getAllProduct(shopId);

                const shopInfonew = await shopData.getAllDataOfShop(shopId);
                var noRating;
                var averageRating;
                if (shopInfonew.overallRating != 0) {
                    averageRating = shopInfonew.overallRating
                } else {
                    noRating = "No Review for this Shop"
                }
                var commentss;
                var noComments;
                if (getShopbyId.comment.length != 0) {
                    commentss = shopComment
                }
                if (getShopbyId.comment.length == 0) {
                    noComments = "No Review for this Shop"
                }
                var noSecond = "You can not add rating second time"
                var shopName = shopInfo.name
                var shopIdd = shopInfo._id;
                if (getShopbyId) {
                    const dataa = {
                        noSecond: noSecond,
                        averageRating: averageRating,
                        noRating: noRating,
                        commentForShop: commentss,
                        noComment: noComments,
                        allItem: getShopbyId.item,
                        shopName: shopName,
                        shopId: shopIdd,
                        userData: userInfo,
                        shopDetail: shopInfo,
                        mess: msgs,
                        comm: coms
                    };
                    // res.render('userView', dataa);
                    // return;
                    var idu=req.session.user.id
                    const shopid1=shopInfo._id.toString()
                    a=`/users/${idu}/shop/${shopid1}`
                    res.redirect(`/users/${idu}/shop/${shopid1}`)
                }
                return;
            }
            var average = await shopData.review(userInfo, shopId, xss(review))
            const getShopbyId = await productData.getAllProduct(shopId);

            const shopInfonew = await shopData.getAllDataOfShop(shopId);

            var noRating;
            var averageRating;
            if (shopInfonew.overallRating != 0) {
                averageRating = shopInfonew.overallRating
            } else {
                noRating = "No Review for this Shop"
            }
            var commentss;
            var noComments;
            if (getShopbyId.comment.length != 0) {
                commentss = shopComment
            }
            if (getShopbyId.comment.length == 0) {
                noComments = "No Review for this Shop"
            }
            var forRating = "Thanks for rating"

            var shopName = shopInfo.name
            var shopIdd = shopInfo._id;
            if (getShopbyId) {
                const dataa = {
                    forRating: forRating,
                    averageRating: averageRating,
                    noRating: noRating,
                    commentForShop: commentss,
                    noComment: noComments,
                    allItem: getShopbyId.item,
                    shopName: shopName,
                    shopId: shopIdd,
                    userData: userInfo,
                    shopDetail: shopInfo,
                    mess: msgs,
                    comm: coms
                };
                // res.render('userView', dataa);
                // return;
                var idu=req.session.user.id
                const shopid1=shopInfo._id.toString()
                a=`/users/${idu}/shop/${shopid1}`
                res.redirect(`/users/${idu}/shop/${shopid1}`)
            }
        }

        if (message) {

            await shopData.message(userInfo, shopId, xss(message))
            const getShopbyId = await productData.getAllProduct(shopId);

            const shopInfonew = await shopData.getAllDataOfShop(shopId);
            var shopComment = shopInfonew.comment;
            var noRating;
            var averageRating;
            if (shopInfonew.overallRating != 0) {
                averageRating = shopInfonew.overallRating
            } else {
                noRating = "No Review for this Shop"
            }
            var commentss;
            var noComments;
            if (getShopbyId.comment.length != 0) {
                commentss = shopComment
            }
            if (getShopbyId.comment.length == 0) {
                noComments = "No Review for this Shop"
            }

            var shopName = shopInfo.name
            var shopIdd = shopInfo._id;
            if (getShopbyId) {
                const dataa = {
                    averageRating: averageRating,
                    noRating: noRating,
                    commentForShop: commentss,
                    noComment: noComments,
                    allItem: getShopbyId.item,
                    shopName: shopName,
                    shopId: shopIdd,
                    userData: userInfo,
                    shopDetail: shopInfo,
                    mess: msgs,
                    comm: coms
                };
                // res.render('userView', dataa);
                // return;
                var idu=req.session.user.id
                const shopid1=shopInfo._id.toString()
                a=`/users/${idu}/shop/${shopid1}`
                res.redirect(`/users/${idu}/shop/${shopid1}`)
            }
        }
        if (comment) {
            await shopData.comment(userInfo, shopId, xss(comment))
            const getShopbyId = await productData.getAllProduct(shopId);

            const shopInfonew = await shopData.getAllDataOfShop(shopId);
            var shopComment = shopInfonew.comment;
            var noRating;
            var averageRating;
            if (shopInfonew.overallRating != 0) {
                averageRating = shopInfonew.overallRating
            } else {
                noRating = "No Review for this Shop"
            }
            var commentss;
            var noComments;
            if (getShopbyId.comment.length != 0) {
                commentss = shopComment
            }
            if (getShopbyId.comment.length == 0) {
                noComments = "No Review for this Shop"
            }

            var shopName = shopInfo.name
            var shopIdd = shopInfo._id;
            if (getShopbyId) {
                const dataa = {
                    averageRating: averageRating,
                    noRating: noRating,
                    commentForShop: commentss,
                    noComment: noComments,
                    allItem: getShopbyId.item,
                    shopName: shopName,
                    shopId: shopIdd,
                    userData: userInfo,
                    shopDetail: shopInfo,
                    mess: msgs,
                    comm: coms
                };
                // res.render('userView', dataa);
                // return;
                var idu=req.session.user.id
               const shopid1=shopInfo._id.toString()
               a=`/users/${idu}/shop/${shopid1}`
               res.redirect(`/users/${idu}/shop/${shopid1}`)
            }
        }

    } catch (e) {
        res.status(404).render('pages/error404', {message:"page not found"})
    }
});



router.delete('/:iduser/shop/:idshop/:messId', async (req, res) => {
    const messageId = req.params.messId;
    const iduser = req.params.iduser;
    const idshop = req.params.idshop;
    try {

        const shopDetailId = await user.removeMessage(messageId);
        res.redirect(`/users/${iduser}/shop/${idshop}`)

    } catch (e) {
        res.status(404).render('pages/error404', {message:"page not found"})
    }

})



router.get('/login', async (req, res) => {
    try {
        if (req.session.user) {
            res.redirect('/private')
        } else {
            let a = "login page"
            res.render('pages/login', {
                title: 'login page'
            })
        }

    } catch (e) {
        res.status(404).render('pages/error404', {message:"page not found"})
    }

})

router.post('/login', async (req, res) => {
    try {

        let a = "logined page"
        const ul = req.body;
        email = xss(ul.email)
        password = xss(ul.password)
        if (!email) throw "enter email"
        if (!password) throw "enter password"
        if (password.length < 6) throw "password should be more then 6 letters"
        if (validator.validate(email) == false) {
            throw "enter a valid email address"
        }
        emaillow = email.toLowerCase()
        logininfo = await userdata2.chkuser(emaillow, password)
        
        //logininfo={_id: ObjectId, firstname: 'kam', lastname: 'kim', email: 'ad1@gmail.com', address: '709 summit', …}
        const id2 = ObjectId(logininfo._id);
        req.session.user = {
            id: id2,
            firstName: logininfo.firstname,
            lastname: logininfo.lastname,
            email: logininfo.email,
            address: logininfo.address,
            city: logininfo.city,
            zipcode: logininfo.zipcode
        }
        if (logininfo.authenticated == false) {
            throw "there is some server issue"
        }
        //   /:idUser/shop/:shopId'
        res.redirect(`/users/${id2}/allshop`)
        // res.render('pages/seeprofile')

    } catch (e) {
        res.status(404)
        res.render('pages/login', {
            title: 'login page',
            message: e
        })
    }

})


router.get('/signup', async (req, res) => {
    try {
        res.render('pages/signup', {
            title: 'signup page'
        })

    } catch (e) {
        res.status(404).render('pages/error404', {message:"page not found"})
    }

})
router.post('/signup', async (req, res) => {
    try {
        chk = false
        const us = req.body;
        email = xss(us.email)
        firstname = xss(us.firstname)
        lastname = xss(us.lastname)
        zipcode = xss(us.zipcode)
        address = xss(us.address)
        password = xss(us.password)
        city = xss(us.city)
        //const { firstname, lastname,email,address,city, zipcode,password } = us; 
        pass = password
        if (!firstname) throw "enter first name"
        if (!lastname) throw "Enter last name"
        if (!pass) throw "Enter password"
        if (!email) throw "enter email id"
        if (!address) throw "enter address"
        if (!city) throw "enter city"
        if (!zipcode) throw "enter zipcode"

        function val(input, name) {
            if (/\s/g.test(input) == true) {
                throw `${name} cannot have empty space`;
            }
        }
        val(firstname, 'firstname')
        val(lastname, 'lastname')
        val(password, 'password')
        val(zipcode, 'zipcode')
        val(email, 'email')
        var pat1 = /(^\d{5}$)|(^\d{5}-\d{4}$)/
        if (pat1.test(zipcode) == false) {
            throw "enter a valid zipcode"
        }

        if (validator.validate(email) == false) {
            throw "enter a valid email address"
        }
        if (us.length < 4) throw "username should be 4 characters long"
        if (/\s/g.test(pass) == true) throw "password cannot have empty space"
        if (pass.length < 6) throw "Password should have atleast 6 characters"

        signupinfo = await userdata.create(firstname, lastname, email, address, city, zipcode, password)

        if (signupinfo == false) {
            throw "user has not created backend issue"
        } else {
            res.render('pages/login', {
                title: 'login page'
            })
        }

    } catch (e) {
        res.render('pages/signup', {
            title: 'signup page',
            message: e,
            user: req.body
        })
    }
})

router.get('/seeprofile', async (req, res) => {
    try {
        //let a = "profile"
        //const user=req.session.user

        res.render('pages/seeprofile')

    } catch (e) {
        res.status(404).render('pages/error404', {message:"page not found"})
    }
})

router.get('/profiledetail', async (req, res) => {
    try {
        //let a = "profile"
        const user = req.session.user
        // console.log(user)

        res.render('pages/profile', user);

    } catch (e) {
        res.status(404).render('pages/error404', {message:"page not found"})
    }
})
router.get('/updateprofile', async (req, res) => {
    try {
        let a = "profile"
        const user = req.session.user

        res.render('pages/updateprofile', {user: user});

    } catch (e) {
        res.status(404).render('pages/error404', {message:"page not found"})
    }
})

router.post('/updateprofile/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const us = req.body;
        id2 = xss(id)
        firstname = xss(us.firstname)
        lastname = xss(us.lastname)
        zipcode = xss(us.zipcode)
        address = xss(us.address)
        city = xss(us.city)
        if (!id2) throw "The id is not valid"
        if (!firstname) throw "enter first name"
        if (!lastname) throw "Enter last name"
        if (!address) throw "enter address"
        if (!city) throw "enter city"
        if (!zipcode) throw "enter zipcode"
        var pat1 = /(^\d{5}$)|(^\d{5}-\d{4}$)/
        if (pat1.test(zipcode) == false) throw "enter a valid zipcode"
        proinfo = await userdata2.userupdate(id2, firstname, lastname, address, city, zipcode)
        req.session.user = {
            id: id2,
            firstName: proinfo.firstname,
            lastname: proinfo.lastname,
            email: proinfo.email,
            address: proinfo.address,
            city: proinfo.city,
            zipcode: proinfo.zipcode
        }
        req.method = 'GET'
        res.redirect('/users/profiledetail');
    } catch (e) {
        res.render('pages/updateprofile', {
            title: 'updateprofile',
            message: e,
            user: req.session.user
        })
    }
})

router.get("/logout", async (req, res) => {
    try {
        let a = "login page"
        res.redirect('/users/login')
    } catch (e) {
        res.status(404).render('pages/error404', {message:"page not found"})
    }
});


module.exports = router;