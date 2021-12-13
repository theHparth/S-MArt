const dbConnection = require('../config/mongoConnections');
const shop = require('../data/shopkeeper');
async function main(){
    const db = await dbConnection();
    await db.dropDatabase();
    try{
        const shop1 = await shop.createShopkeeper("McDonalds", "jeshwanth18", "Jeshwanth", "Kumar",  "20 Graham st Jersey city New jersey", "jkumar3@stevens.edu", "07307", "5517861730", "jesh@123");
        console.log(shop1);
    }
    catch(e){
        console.log(e);
    }
    
    try{
        const shop2 = await shop.createShopkeeper("Dominos", "aravind", "Jeshwanth", "Kumar",  "20 Graham st Jersey city New jersey", "jkumar3@stevens.edu", "07307", "5517861730", "test@123");
        console.log(shop2);
    }
    catch(e){
        console.log(e);
    }
    try{
        const shop3 = await shop.createShopkeeper("Papa Johns", "abdulsubhan", "Jeshwanth", "Kumar",  "20 Graham st Jersey city New jersey", "jkumar3@stevens.edu", "07307", "5517861730", "test@123");
        console.log(shop3);
    }
    catch(e){
        console.log(e);
    }
    try{
        const shop4 = await shop.createShopkeeper("Fresh Super market", "charansundar", "Jeshwanth", "Kumar",  "20 Graham st Jersey city New jersey", "jkumar3@stevens.edu", "07307", "5517861730", "test@123");
        console.log(shop4);
    }
    catch(e){
        console.log(e);
    }
    try{
        const shop5 = await shop.createShopkeeper("Walgreens", "thiru18", 'Jeshwanth', "Kumar", " 20 Graham st Jersey city New jersey", "jkumar3@stevens.edu", "07307", "5517861730", "test@123");
        console.log(shop5);
    }
    catch(e){
        console.log(e);
    }
    try{
        const shop6 = await shop.createShopkeeper("Hoboken central", "pranesgv", "Jeshwanth", "Kumar",  "20 Graham st Jersey city New jersey", "jkumar3@stevens.edu", "07307", "5517861730", "test@123");
        console.log(shop6);
    }
    catch(e){
        console.log(e);
    }
    try{
        const shop7 = await shop.createShopkeeper("central super market", "kishana", "Jeshwanth", "Kumar",  "20 Graham st Jersey city New jersey", "jkumar3@stevens.edu", "07307", "5517861730", "test@123");
        console.log(shop7);
    }
    catch(e){
        console.log(e);
    }
    try{
        const shop8 = await shop.createShopkeeper("shop rite", "koushal", "Jeshwanth", "Kumar", " 20 Graham st Jersey city New jersey"," jkumar3@stevens.edu", "07307"," 5517861730", "test@123");
        console.log(shop8);
    }
    catch(e){
        console.log(e);
    }
    try{
        const shop9 = await shop.createShopkeeper("wallmart", "koushik", "Jeshwanth", "Kumar",  "20 Graham st Jersey city New jersey", "jkumar3@stevens.edu", "07307", "5517861730", "test@123");
        console.log(shop9);
    }
    catch(e){
        console.log(e);
    }
    try{
        const shop10 = await shop.createShopkeeper("target", "prabhakaran", "Jeshwanth", "Kumar", " 20 Graham st Jersey city New jersey", "jkumar3@stevens.edu", "07307", "5517861730", "test@123");
        console.log(shop10);
    }
    catch(e){
        console.log(e);
    }
    try{
        const shop11 = await shop.createShopkeeper("best buy", "parthkumar", "Jeshwanth", "Kumar",  "20 Graham st Jersey city New jersey", "jkumar3@stevens.edu", "07307", "5517861730", "test@123");
        console.log(shop11);
    }
    catch(e){
        console.log(e);
    }

    console.log("Done seeding shopkeeper database");
    await db.serverConfig().close();
}

main();