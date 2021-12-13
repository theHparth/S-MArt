const mongoCollections = require("../config/mongoCollections");
const shop = mongoCollections.shopkeeper;
const messages = mongoCollections.message;
const reviews = mongoCollections.reviews;
const replayMessage = mongoCollections.replayMessages;
var mongoose = require("mongoose");
const user = require("./user");
const validation = require("../validation/validation");
const comments = mongoCollections.comment;
var userdata = mongoCollections.user;

const { ObjectId } = require("bson");
const bcrypt = require("bcrypt");
const saltRounds = 5;
const shopkeeper = mongoCollections.shopkeeper;

const exportedMethods = {
  async getAll() {
    const movieCollection = await shop();
    const movieList = await movieCollection.find({}).toArray();
    return movieList;
  },

  async getShopWithItem() {
    var shopListWithItem = [];
    var noshopWithItem;
    const movieCollection = await shop();
    const allShop = await movieCollection.find({}).toArray();
    allShop.forEach((i) => {
      i.item.forEach((element) => {
        if (element.length != 0) {
          shopListWithItem.push(i);
        }
      });
    });
    if (!shopListWithItem) {
      noshopWithItem = "No Item found in S-mart Deal";
      return noshopWithItem;
    }
    var x = [...new Set(shopListWithItem)];
    return x;
  },
  //getAllDataOfShop
  async getAllDataOfShop(id) {
    try {
      var x = id.toString();
      if (!x.match(/^[0-9A-Fa-f]{24}$/)) {
        return "404";
      }
      var convertId = mongoose.Types.ObjectId(id);
      const findShop = await shop();
      const shopData = await findShop.findOne({
        _id: convertId,
      });
      return shopData;
    } catch (e) {
      return "404";
    }
  },

  //     async create(name, address, pincode, item) {
  //         intPin = parseInt(pincode)
  //         const resaurantCollection = await shop();
  //         const newShop = {
  //             name: name,
  //             overallRating: 0,
  //             item: [],
  //             message: [],
  //             comment: [],
  //             rating: [],
  //             address: address,
  //             pincode: intPin
  //         };
  //         const newInsertInformation = await resaurantCollection.insertOne(newShop);
  //         const newId = newInsertInformation.insertedId;
  //         return await this.get(newInsertInformation.insertedId);
  //     },
  async getAllMessage(id) {
    var allMessag;
    const allMessage = await messages();
    var allMsg = await allMessage.find({}).toArray();
    allMsg.forEach((element) => {
      if (element._id == id) {
        allMessag = element;
      }
    });
    return allMessag;
  },
  async message(userInfo, shopId, message) {
    var id = mongoose.Types.ObjectId();
    var convertId = mongoose.Types.ObjectId(shopId);
    const resaurantCollection = await shop();
    const messageCollection = await messages();
    const userInformation = await user.getUser(userInfo._id);
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    var usermessage = {
      _id: id,
      idUser: userInformation._id,
      message: message,
      userName: userInformation.firstname,
      shopId: shopId,
      date: date,
    };
    const newaddedItem = await messageCollection.insertOne(usermessage);
    const newInsertInformation = await resaurantCollection.updateOne(
      {
        _id: convertId,
      },
      {
        $push: {
          message: usermessage,
        },
      }
    );
    return;
  },

  async getAllComment(id) {
    var allComment;
    const allCommentsdata = await comments();
    var allComments = await allCommentsdata.find({}).toArray();
    allComments.forEach((element) => {
      if (element._id == id) {
        allComment = element;
      }
    });
    return allComment;
  },
  async comment(userInfo, shopId, comment) {
    var id = mongoose.Types.ObjectId();
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var convertId = mongoose.Types.ObjectId(shopId);
    const resaurantCollection = await shop();
    const commentCollection = await comments();
    const userInformation = await user.getUser(userInfo._id);
    var userComment = {
      _id: id,
      idUser: userInformation._id,
      userName: userInformation.firstname,
      comment: comment,
      shopId: shopId,
      date: date,
    };
    const newaddedItem = await commentCollection.insertOne(userComment);
    const newInsertInformation = await resaurantCollection.updateOne(
      {
        _id: convertId,
      },
      {
        $push: {
          comment: userComment,
        },
      }
    );
    return;
  },
  async checkuser(userInfo, shopId, review) {
    var convertId = mongoose.Types.ObjectId(shopId);
    var userId = mongoose.Types.ObjectId(userInfo._id);
    const resaurantCollection = await shop();

    const store = await resaurantCollection.findOne({
      _id: convertId,
    });
    var rat = store.overallRating;
    var xx;
    store.rating.forEach((x) => {
      var y = x.idUser.toString();
      if (y == userId) {
        xx = rat;
        return;
      }
      return;
    });
    // return xx;
  },
  async review(userInfo, shopId, reviewss) {
    var id = mongoose.Types.ObjectId();
    var review = parseInt(reviewss);
    var convertId = mongoose.Types.ObjectId(shopId);
    const resaurantCollection = await shop();
    const reviewCollection = await reviews();
    const userInformation = await user.getUser(userInfo._id);
    var userReview = {
      _id: id,
      idUser: userInformation._id,
      userName: userInformation.firstname,
      review: review,
      shopId: shopId,
    };
    const newaddedItem = await reviewCollection.insertOne(userReview);
    const newInsertInformation = await reviewCollection.updateOne(
      {
        _id: convertId,
      },
      {
        $push: {
          rating: userReview,
        },
      }
    );
    const updateInfo = await resaurantCollection.updateOne(
      {
        _id: convertId,
      },
      {
        $addToSet: {
          rating: userReview,
        },
      }
    );
    const findStore = await resaurantCollection.findOne({
      _id: convertId,
    });
    var allReview = [];
    findStore.rating.forEach((x) => {
      allReview.push(x.review);
    });
    var totalSum = 0;
    for (var i in allReview) {
      totalSum += allReview[i];
    }
    var numsCount = allReview.length;
    var average = totalSum / numsCount;

    var averages = Number(average).toFixed(2);

    const updateFinal = await resaurantCollection.updateOne(
      {
        _id: convertId,
      },
      {
        $set: {
          overallRating: averages,
        },
      }
    );
    const frRee = await resaurantCollection.findOne({
      _id: convertId,
    });
    return averages;
  },

  //}

  // module.exports = exportedMethods;
  // =======
  // const {ObjectId} = require('bson');
  // const mongoCollections = require("../config/mongoCollections");
  // const bcrypt = require('bcrypt');
  // const saltRounds = 16;
  // const shopkeeper = mongoCollections.shopkeeper;
  // module.exports = {
  async createShopkeeper(
    ShopName,
    username,
    ownerFirstname,
    ownerLastname,
    Address,
    email,
    pincode,
    phoneNumber,
    password
  ) {
    const shopkeeperCollections = await shopkeeper();
    validation.shopNamevalidation(ShopName);
    validation.userNamevalidation(username);
    validation.firstnamevalidation(ownerFirstname);
    validation.lastnamevalidation(ownerLastname);
    validation.emailvalidation(email);
    validation.pincodevalidation(pincode);
    validation.phonenumbervalidation(phoneNumber);
    validation.passwordValidation(password);
    const hashed_pass = await bcrypt.hash(password, saltRounds);
    let lower = username.toLowerCase();
    let newShopkeeper = {
      ShopName: ShopName,
      username: lower,
      ownerFirstname: ownerFirstname,
      ownerLastname: ownerLastname,
      Address: Address,
      email: email,
      pincode: pincode,
      phoneNumber: phoneNumber,
      password: hashed_pass,
      overallRating: 0,
      item: [],
      message: [],
      comment: [],
      rating: [],
      //      name: name,
      //             address: address,
    };
    const duplicateUser = await shopkeeperCollections.findOne({
      username: username,
    });
    if (duplicateUser !== null)
      throw "There is already an user containing the same username";
    const insertInfo = await shopkeeperCollections.insertOne(newShopkeeper);
    if (insertInfo.insertedCount === 0) throw "Could not create user";
    // const new_id = insertInfo.insertedId;
    // const shopkeepers = await this.get(new_id.toString());
    //  return shopkeepers
    return { userInsterted: true };
  },
  async checkShopkeeper(username, password) {
    // console.log("aaaasaas")
    const shopkeeperCollections = await shopkeeper();
    const findShopKeeper = await shopkeeperCollections.findOne({
      username: username,
    });
    //console.log(findShopKeeper);
    if (findShopKeeper === null) {
      throw "Either the username or password is incorrect";
    }
    let comparedPass = false;
    try {
      comparedPass = await bcrypt.compare(password, findShopKeeper.password);
      // console.log(comparedPass);
      if (comparedPass === true) {
        let authentication = {
          authenticated: true,
          authenticatedUser: findShopKeeper,
        };
        return authentication;
      } else throw "Either the username or password is incorrect";
    } catch (e) {
      console.log(e);
    }
  },

  async get(id) {
    if (!id) throw `You must provide an id to search for`;
    if (typeof id !== "string") throw "You must provide a valid id";
    if (id.length === 0) throw `The given id is empty`;
    if (!ObjectId.isValid(id))
      throw `The given objectId <${id}> is not a valid objectId`;
    const shopkeeper_id = new ObjectId(id);
    const shopkeeperCollections = await shopkeeper();
    const shopkeeperid = await shopkeeperCollections.findOne({
      _id: ObjectId(shopkeeper_id),
    });
    if (shopkeeperid === null) throw `There is no shop with <${id}>`;
    return shopkeeperid;
  },
  async removeShop(id) {
    const removeId = new ObjectId(id);
    const ShopName = await this.get(id);
    const shopkeeperCollections = await shopkeeper();
    const deleteInfo = await shopkeeperCollections.deleteOne({
      _id: ObjectId(removeId),
    });
    if (deleteInfo.deletedCount === 0)
      throw `Could not delete the shop with ${id}`;
    return { deleted: true };
  },

  async updateShopkeeper(
    id,
    username,
    ownerFirstname,
    ownerLastname,
    Address,
    email,
    pincode,
    phoneNumber
  ) {
    const UpdateInfo = await this.get(id);
    validation.userNamevalidation(username);
    validation.firstnamevalidation(ownerFirstname);
    validation.lastnamevalidation(ownerLastname);
    validation.emailvalidation(email);
    validation.pincodevalidation(pincode);
    validation.phonenumbervalidation(phoneNumber);
    let updatedLower = username.toLowerCase();
    let shopkeeper_update = {
      username: updatedLower,
      ownerFirstname: ownerFirstname,
      ownerLastname: ownerLastname,
      Address: Address,
      email: email,
      pincode: pincode,
      phoneNumber: phoneNumber,
    };
    const shopkeeperCollections = await shopkeeper();
    const UpdatedInfo = await shopkeeperCollections.updateOne(
      { _id: ObjectId(id) },
      { $set: shopkeeper_update }
    );
    if (!UpdatedInfo.matchedCount && !UpdatedInfo.modifiedCount)
      throw "Updation failed";
    return { updateInserted: true };
  },
};

module.exports = exportedMethods;
