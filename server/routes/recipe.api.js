
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
    return mongodb.db('vinacann')
        .collection('recipe')
        .find({})
        .asArray()

}

function getRecipe(data) {
    return mongodb.db('vinacann')
        .collection('recipe')
        .aggregate([
            {$match: {'myData.id': data.recipeID}},
            {$project: {
                    myResult: {$filter: {
                            input: '$myData',
                            as: 'data',
                            cond: {$eq: ['$$data.id', data.recipeID]}
                        }},
                    _id: 0
                }}
        ])
        .asArray()
}




