
 const dbConnection = require('./mongoConnections');

 /* This will allow you to have one reference to each collection per app */
 /* Feel free to copy and paste this this */
 const getCollectionFn = (collection) => {
   let _col = undefined;
 
   return async () => {
     if (!_col) {
       const db = await dbConnection();
       _col = await db.collection(collection);
     }
 
     return _col;
   };
 };
 
 /* Now, you can list your collections here: */
 module.exports = {
   shopkeeper: getCollectionFn('shopkeeper'),
   products: getCollectionFn('products'),
   user: getCollectionFn('user'),
   message: getCollectionFn('message'),
   comment: getCollectionFn('comment'),
   reviews: getCollectionFn('reviews'),
   replayMessages: getCollectionFn('replayMessages')
 };