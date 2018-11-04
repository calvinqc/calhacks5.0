/**
 * Initialize a MongoDB Service Client
 */
const stitchClient = Stitch.initializeDefaultAppClient('vinacann-vceuu');
const mongodb = stitchClient.getServiceClient(
    RemoteMongoClient.factory,
    'mongodb-atlas'
);

addRecipeToFavorite(1, "Indian-Chicken-Foil-Packs-1686116");

function addRecipeToFavorite(userID, recipeID) {
    mongodb.insertOne({ 'userID': userID,'recipeID': recipeID })
}
