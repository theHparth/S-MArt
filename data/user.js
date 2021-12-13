const mongoCollections = require("../config/mongoCollections");

const user = mongoCollections.user;
var mongoose = require("mongoose");
// const {
//     replayMessages
// } = require('../config/mongoCollections');
const shop = mongoCollections.shopkeeper;
const messages = mongoCollections.message;
const replayMessages = mongoCollections.replayMessages;

var validator = require("email-validator");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectId;
const saltRounds = 5;

const exportedMethods = {
  async getAll() {
    const movieCollection = await user();
    const movieList = await movieCollection.find({}).toArray();
    return movieList;
  },

  async getUser(id) {
    try {
      var x = id.toString();
      if (!x.match(/^[0-9A-Fa-f]{24}$/)) {
        return "404";
      }
      var convertId = mongoose.Types.ObjectId(id);

      const findShopItem = await user();
      const findShop = await findShopItem.findOne({
        _id: convertId,
      });

      return findShop;
    } catch (e) {
      return "404";
    }
  },

  async removeMessage(messageId) {
    var iddItem = mongoose.Types.ObjectId(messageId);
    const messageCollection = await replayMessages();
    const userCollection = await user();

    const usergetDetail = await messageCollection.findOne({
      _id: iddItem,
    });
    var userId = usergetDetail.idUser;
    await messageCollection.deleteOne({
      _id: iddItem,
    });

    await userCollection.updateOne(
      {
        _id: userId,
      },
      {
        $pull: {
          replayMessages: {
            _id: iddItem,
          },
        },
      }
    );
    return;
  },

  async replayMessage(idusers, storeId, replayMessage) {
    var id = mongoose.Types.ObjectId();

    var iduserCon = mongoose.Types.ObjectId(idusers);
    var storeIdCon = mongoose.Types.ObjectId(storeId);
    const userInfo = await this.getUser(idusers);
    const findShop = await shop();
    const shopDetail = await findShop.findOne({
      _id: storeIdCon,
    });
    const userCollection = await user();
    var messagereplayCollection = await replayMessages();

    const messageCollection = await messages();
    const sendMessage = await messageCollection.find({}).toArray();

    var finalMessage;

    sendMessage.forEach((x) => {
      if (x.shopId == storeIdCon) {
        finalMessage = x;
      }
      return;
    });
    console.log(shopDetail.ShopName);
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    var userReplaymessage = {
      _id: id,
      idUser: iduserCon,
      message: replayMessage,
      userName: userInfo.firstname,
      shopNmae: shopDetail.ShopName,
      isShop: storeIdCon,
      date: date,
    };
    const newaddedItem = await messagereplayCollection.insertOne(
      userReplaymessage
    );
    const newInsertInformation = await userCollection.updateOne(
      {
        _id: finalMessage.idUser,
      },
      {
        $push: {
          replayMessages: userReplaymessage,
        },
      }
    );
    return;
  },

  async create(firstname, lastname, email, address, city, zipcode, password) {
    if (!firstname) throw "enter the first name";
    if (!lastname) throw "Enter last name";
    if (!password) throw "Enter password";
    if (!email) throw "enter email id";
    if (!address) throw "enter address";
    if (!city) throw "enter city";
    if (!zipcode) throw "enter zipcode";
    if (
      (typeof firstname === "boolean") |
      (typeof lastname === "boolean") |
      (typeof email === "boolean") |
      (typeof address === "boolean") |
      (typeof city === "boolean") |
      (typeof zipcode === "boolean") |
      (typeof password === "boolean")
    ) {
      throw "input cannot be a boolean";
    }
    if (
      (typeof firstname === "string") &
      (typeof lastname === "string") &
      (typeof email === "string") &
      (typeof address === "string") &
      (typeof city === "string") &
      (typeof zipcode === "string") &
      (typeof password === "string")
    ) {
      if (
        (firstname.trim() == "") |
        (lastname.trim() == "") |
        (email.trim() == "") |
        (address.trim() == "") |
        (city.trim() == "") |
        (zipcode.trim() == "") |
        (password.trim() == "")
      ) {
        throw " it should not be an empty string";
      }
    } else {
      throw "firstname, lastname, email, website, priceRange should be a string";
    }
    function val(input, name) {
      if (/\s/g.test(input) == true) {
        throw `${name} cannot have empty space`;
      }
    }
    val(firstname, "firstname");
    val(lastname, "lastname");
    val(password, "password");
    val(zipcode, "zipcoe");
    val(email, "email");

    if (validator.validate(email) == false) {
      throw "enter a valid email address";
    }
    var pat1 = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    if (pat1.test(zipcode) == false) {
      throw "enter a valid zipcode";
    }
    us1 = email.toLowerCase();
    const mongoColl = await user();
    const reslis = await mongoColl.find({ email: us1 }).toArray();
    if (reslis.length == 1) throw "the email id is already taken";

    if (password.length < 6) throw "Password should have atleast 6 characters";

    const hash = await bcrypt.hash(password, saltRounds);
    const hashpassword = hash;

    emaillow = email.toLowerCase();

    //const mongoColl = await user()

    let newres = {
      firstname: firstname,
      lastname: lastname,
      email: emaillow,
      address: address,
      city: city,
      zipcode: zipcode,
      password: hashpassword,
      //             rating:{},
      //             comment:{},
      item: [],
      replayMessages: [],
    };
    const insertInfo = await mongoColl.insertOne(newres);
    if ((insertInfo.length = 0)) {
      throw "There has been some server issue";
    } else {
      return true;
    }
  },

  async getAllUsers() {
    const mongoColl = await user();
    const insertInfo = await mongoColl.find({}).toArray();
    return insertInfo;
  },
  async getById(id) {
    if (!id) {
      throw "You must provide an id ";
    }
    const mongoColl = await user();
    const insertInfo = await mongoColl.findOne({ _id: ObjectId(id) });
    if (insertInfo === null) {
      throw "No user with that id";
    }
    return insertInfo;
  },
  async userrename(id, firstname, lastname) {
    if (!id | !firstname | !lastname) {
      throw "enter valid id and name";
    }
    if (!(typeof firstname === "string") | !(typeof lastname === "string")) {
      ("enter proper firstname and lastname");
    }

    const id2 = ObjectId(id);
    const mongoColl = await user();
    const insertInfo = await mongoColl.findOne({ _id: id2 });
    if (insertInfo == null) {
      throw "the id does not exist";
    }
    const ren = {
      firstname: firstname,
      lastname: lastname,
    };

    const upinfo = await mongoColl.updateOne({ _id: id2 }, { $set: ren });
    if (upinfo.modifiedCount === 0) {
      throw `could not modified the ${id2} please enter the proper id `;
    }
  },
  async removeUser(id) {
    if (!id) {
      throw "You must provide an id to search for";
    }
    const id2 = ObjectId(id);
    const mongoColl = await user();
    const delInfo = await mongoColl.removeOne({ _id: id2 });

    if (delInfo.deletedCount == 0) {
      throw `Could not delete user with id of ${id}`;
    }
  },

  async userlocchange(id, naddress, ncity, nzipcode) {
    if (!id) {
      throw "id should be not empty";
    }
    if (!naddress | !ncity | nzipcode) {
      throw "field cannot be empty";
    }
    var pat1 = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    if (pat1.test(nzipcode) == false) {
      throw "enter a valid zipcode";
    }

    const id2 = ObjectId(id);
    const mongoColl = await user();
    const insertInfo = await mongoColl.findOne({ _id: id2 });
    if (insertInfo == null) {
      throw "the id does not exist";
    }
    const ren = {
      address: naddress,
      city: ncity,
      zipcode: nzipcode,
    };

    const upinfo = await mongoColl.updateOne({ _id: id2 }, { $set: ren });
    if (upinfo.modifiedCount === 0) {
      throw `could not modified the ${id2} please enter the proper id `;
    }
  },

  async userupdate(id, firstname, lastname, address, city, zipcode) {
    if (!id) throw "enter id";
    if (!firstname) throw "enter first name";
    if (!lastname) throw "Enter last name";
    if (!address) throw "enter address";
    if (!city) throw "enter city";
    if (!zipcode) throw "enter zipcode";
    function val(input, name) {
      if (/\s/g.test(input) == true) {
        throw `${name} cannot have empty space`;
      }
    }
    val(firstname, "firstname");
    val(lastname, "lastname");
    val(zipcode, "zipcoe");
    var pat1 = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    if (pat1.test(zipcode) == false) {
      throw "enter a valid zipcode";
    }
    const id2 = ObjectId(id);
    const mongoColl = await user();
    const insertInfo = await mongoColl.findOne({ _id: id2 });
    if (insertInfo == null) {
      throw "the id does not exist";
    }
    const ren = {
      lastname: lastname,
      firstname: firstname,
      address: address,
      city: city,
      zipcode: zipcode,
    };

    const { value: updatedUser, ok } = await mongoColl.findOneAndUpdate(
      { _id: id2 },
      { $set: ren }
    );
    const updateinfo = await mongoColl.findOne({ _id: ObjectId(id) });
    if (!ok) {
      throw new QueryError(`Could not update user with ID \`${id}\``);
    }

    return updateinfo;
  },
  async chkuser(email, password) {
    if (!email) throw "enter mail";
    if (!password) throw "enter password";
    if (password.length < 6) throw "password should be more then 6 letters";
    if (validator.validate(email) == false) {
      throw "enter a valid email address";
    }

    if ((typeof email === "boolean") | (typeof password === "boolean")) {
      throw "input cannot be a boolean";
    }
    if ((typeof email === "string") & (typeof password === "string")) {
      if ((email.trim() == "") | (password.trim() == "")) {
        throw " it should not be an empty string";
      }
    } else {
      throw "firstname, lastname, email, website, priceRange should be a string";
    }

    function val(input, name) {
      if (/\s/g.test(input) == true) {
        throw `${name} cannot have empty space`;
      }
    }

    val(password, "password");
    val(email, "email");
    if (password.length < 6) throw "Password should have atleast 6 characters";

    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email.toLowerCase()) == false) {
      throw `Email Address (${email}) is not valid`;
    }
    emaillow = email.toLowerCase();
    const mongoColl = await user();
    const reslis = await mongoColl.find({ email: emaillow }).toArray();
    if (reslis.length == 0) {
      throw "Either the username or password is invalid";
    }
    a = reslis;
    for (let k of a) {
      const hash2 = await bcrypt.compare(password, k.password);
      if (hash2) {
        k.authenticated = true;
        return k;
        //{authenticated: true}
      } else {
        throw "Either the username or password is invalid";
      }
    }
  },
};

module.exports = exportedMethods;
