const dbConnection = require('../config/mongoConnections');
const data = require('../data');
const restaurants = data.shop;
const products = data.products;
const users = data.user;
const mongoCollections = require('../config/mongoCollections');
const shops = mongoCollections.shopkeeper;


async function main() {
    const db = await dbConnection();
    await db.dropDatabase();


    try {
        await restaurants.createShopkeeper("McDonalds111", "jeshwanth", "Jeshwanth", "Kumar", "20 Graham st Jersey city New jersey", "jkumar3@stevens.edu", "07307", "5517861730", "jesh@123");

    } catch (e) {
        console.log(e);
    }
    try {
        var x;
        const movieCollection = await shops();
        const movieList = await movieCollection.find({}).toArray();
        movieList.forEach(element => {
            x = element
        });
        var s = (x._id).toString()
        //shopId, productname, productdetails, producthighlights, price, quantityremaining, dateofmanufacture, dateofexpiry
        await products.createProductSeed(s, "milk", "good good good", "good good good", 10, 5, "2021-12-01", "2023-12-30", x.ShopName, x.Address, x.pincode);
        await products.createProductSeed(s, "ice-cream", "good good good", "good good good", 10, 5, "2021-12-01", "2023-12-30", x.ShopName, x.Address, x.pincode);
        await products.createProductSeed(s, "chocolate-powder", "good good good", "good good good", 10, 5, "2021-12-01", "2023-12-30", x.ShopName, x.Address, x.pincode);

    } catch (e) {
        console.log(e);
    }

    try {
        await restaurants.createShopkeeper("Hoboken shop", "parth", "parth", "Kumar", "20 Graham st Jersey city New jersey", "jkumar3@stevens.edu", "07307", "5517861730", "jesh@123");

    } catch (e) {
        console.log(e);
    }
    try {
        var x;
        const movieCollection = await shops();
        const movieList = await movieCollection.find({}).toArray();
        movieList.forEach(element => {
            x = element
        });
        var s = (x._id).toString()
        //shopId, productname, productdetails, producthighlights, price, quantityremaining, dateofmanufacture, dateofexpiry
        await products.createProductSeed(s, "milk 22", "good good good", "good good good", 10, 5, "2021-12-01", "2023-12-30", x.ShopName, x.Address, x.pincode);
        await products.createProductSeed(s, "ice-cream 22", "good good good", "good good good", 10, 5, "2021-12-01", "2023-12-30", x.ShopName, x.Address, x.pincode);
        await products.createProductSeed(s, "chocolate-powder 22", "good good good", "good good good", 10, 5, "2021-12-01", "2023-12-30", x.ShopName, x.Address, x.pincode);

    } catch (e) {
        console.log(e);
    }

    try {
        await restaurants.createShopkeeper("Indain shop", "kaushal", "kaushal", "Kumar", "20 Graham st Jersey city New jersey", "jkumar3@stevens.edu", "07307", "5517861730", "jesh@123");

    } catch (e) {
        console.log(e);
    }
    try {
        var x;
        const movieCollection = await shops();
        const movieList = await movieCollection.find({}).toArray();
        movieList.forEach(element => {
            x = element
        });
        var s = (x._id).toString()
        //shopId, productname, productdetails, producthighlights, price, quantityremaining, dateofmanufacture, dateofexpiry
        await products.createProductSeed(s, "butter", "good good good", "good good good", 10, 5, "2021-12-01", "2023-12-30", x.ShopName, x.Address, x.pincode);
        await products.createProductSeed(s, "fruits", "good good good", "good good good", 10, 5, "2021-12-01", "2023-12-30", x.ShopName, x.Address, x.pincode);
        await products.createProductSeed(s, "Vegetables", "good good good", "good good good", 10, 5, "2021-12-01", "2023-12-30", x.ShopName, x.Address, x.pincode);

    } catch (e) {
        console.log(e);
    }

    try {
        await restaurants.createShopkeeper("NewJ shop", "Asihwwarya", "Asihwwarya", "Kumari", "20 Graham st Jersey city New jersey", "jkumar3@stevens.edu", "07307", "5517861730", "jesh@123");

    } catch (e) {
        console.log(e);
    }
    try {
        var x;
        const movieCollection = await shops();
        const movieList = await movieCollection.find({}).toArray();
        movieList.forEach(element => {
            x = element
        });
        var s = (x._id).toString()
        //shopId, productname, productdetails, producthighlights, price, quantityremaining, dateofmanufacture, dateofexpiry
        await products.createProductSeed(s, "butter 22", "good good good", "good good good", 10, 5, "2021-12-01", "2023-12-30", x.ShopName, x.Address, x.pincode);
        await products.createProductSeed(s, "fruits 22", "good good good", "good good good", 10, 5, "2021-12-01", "2023-12-30", x.ShopName, x.Address, x.pincode);
        await products.createProductSeed(s, "Vegetables 22", "good good good", "good good good", 10, 5, "2021-12-01", "2023-12-30", x.ShopName, x.Address, x.pincode);

    } catch (e) {
        console.log(e);
    }

    try {
        await restaurants.createShopkeeper("Kathiyawadi shop", "Denga", "Denda", "Kumar", "20 Graham st Jersey city New jersey", "jkumar3@stevens.edu", "07307", "5517861730", "jesh@123");

    } catch (e) {
        console.log(e);
    }
    try {
        var x;
        const movieCollection = await shops();
        const movieList = await movieCollection.find({}).toArray();
        movieList.forEach(element => {
            x = element
        });
        var s = (x._id).toString()
        //shopId, productname, productdetails, producthighlights, price, quantityremaining, dateofmanufacture, dateofexpiry
        await products.createProductSeed(s, "butter 22333", "good good good", "good good good", 10, 5, "2021-12-01", "2023-12-30", x.ShopName, x.Address, x.pincode);
        await products.createProductSeed(s, "fruits 223333", "good good good", "good good good", 10, 5, "2021-12-01", "2023-12-30", x.ShopName, x.Address, x.pincode);
        await products.createProductSeed(s, "Vegetables 22333", "good good good", "good good good", 10, 5, "2021-12-01", "2023-12-30", x.ShopName, x.Address, x.pincode);

    } catch (e) {
        console.log(e);
    }

    try {
        await users.create("Parth", "Kumar", "a@gmail.com", "13 washington st", "new jersey", "07307", "aaaaaa");
    } catch (e) {
        console.log(e);
    }
    try {
        await users.create("Jaswant", "Kumar", "b@gmail.com", "13 washington st", "new jersey", "07307", "aaaaaa");
    } catch (e) {
        console.log(e);
    }

    try {
        await users.create("Asihwwarya", "Kumari", "c@gmail.com", "13 washington st", "new jersey", "07307", "aaaaaa");
    } catch (e) {
        console.log(e);
    }

    try {
        await users.create("Kaushal", "Kumar", "d@gmail.com", "13 washington st", "new jersey", "07307", "aaaaaa");
    } catch (e) {
        console.log(e);
    }

    try {
        await users.create("Deng", "Kumar", "e@gmail.com", "13 washington st", "new jersey", "07307", "aaaaaa");
    } catch (e) {
        console.log(e);
    }

    console.log('Done seeding database');

    await db.serverConfig.close();
}

main();
