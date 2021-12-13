const dbConnection = require('../config/mongoConnections');
const user = require('../data/user');
async function main(){
    const db = await dbConnection();
    await db.dropDatabase();
  
    try {
      const user1 = await restaurants.create("parthkumar", "hirpara", "a@gmail.com", "13 washington st", "new jersey", "07307", "aaaaaa");
      console.log(user1);
    } catch (e) {
      console.log(e);
    }
    try {
        const user2 = await restaurants.create("parthkumar", "hirpara", "b@gmail.com", "13 washington st", "new jersey", "07307", "aaaaaa");
        console.log(user2);
      } catch (e) {
        console.log(e);
      }
      try {
        const user3 = await restaurants.create("parthkumar", "hirpara", "a@gmail.com", "13 washington st"," new jersey"," 07307", "aaaaaa");
        console.log(user3);
      } catch (e) {
        console.log(e);
      }
      try {
        const user4 = await restaurants.create("parthkumar", "hirpara", "a@gmail.com", "13 washington st", "new jersey", "07307", "aaaaaa");
        console.log(user4);
      } catch (e) {
        console.log(e);
      }
      try {
        const user5 = await restaurants.create("parthkumar", "hirpara", "a@gmail.com", "13 washington st", "new jersey", "07307", "aaaaaa");
        console.log(user5);
      } catch (e) {
        console.log(e);
      }
      try {
        const user6 = await restaurants.create("parthkumar", "hirpara", "a@gmail.com", "13 washington st", "new jersey", "07307", "aaaaaa");
        console.log(user6);
      } catch (e) {
        console.log(e);
      }
      try {
        const user7 = await restaurants.create("parthkumar", "hirpara", "a@gmail.com", "13 washington st", "new jersey"," 07307", "aaaaaa");
        console.log(user7);
      } catch (e) {
        console.log(e);
      }
      try {
        const user8 = await restaurants.create("parthkumar", "hirpara", "a@gmail.com", "13 washington st"," new jersey", "07307", "aaaaaa");
        console.log(user8);
      } catch (e) {
        console.log(e);
      }
      try {
        const user9 = await restaurants.create("parthkumar", "hirpara", "a@gmail.com", "13 washington st", "new jersey", "07307", "aaaaaa");
        console.log(user9);
      } catch (e) {
        console.log(e);
      }
}