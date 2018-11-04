
/**
 * Import Stitch Library
 */
import {
    Stitch,
    RemoteMongoClient,
} from 'mongodb-stitch-browser-sdk'
/**
 * Initialize a MongoDB Service Client
 */
const stitchClient = Stitch.initializeDefaultAppClient('vinacann-vceuu');
const mongodb = stitchClient.getServiceClient(
    RemoteMongoClient.factory,
    'mongodb-atlas'
);

exports = addRecipeToFavorite(1, "Indian-Chicken-Foil-Packs-1686116");

function addRecipeToFavorite(userID, recipeID) {
    return mongodb.db('vinacann')
        .collection('favoriteRecipe')
        .insertOne({
            userID: userID,
            recipeID: recipeID
        }).then(() => {})
}

function displayPopularRecipe() {


}
