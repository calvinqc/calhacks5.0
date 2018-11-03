/**
 * Import Stitch Library
 */
import {
    Stitch,
    RemoteMongoClient,
    UserPasswordCredential,
    UserPasswordAuthProviderClient
} from 'mongodb-stitch-browser-sdk'

/**
 * Initialize a MongoDB Service Client
 */
const stitchClient = Stitch.initializeDefaultAppClient('vinacann-vceuu');
const mongodb = stitchClient.getServiceClient(
    RemoteMongoClient.factory,
    'mongodb-atlas'
);
const emailPassClient = Stitch.defaultAppClient.auth
    .getProviderClient(UserPasswordAuthProviderClient.factory);

/**
 * Regular login
 */
function login(email, password) {
    const credential = new UserPasswordCredential(email, password);
    return stitchClient.auth.loginWithCredential(credential);
}

/**
 * Register User
 * @param email
 * @param password
 * @param blockChainAddress
 */
function register(email, password, blockChainAddress) {
    // Create a User
    emailPassClient.registerWithEmail(email, password)
        .then(() => {
            console.log("Successfully sent account confirmation email!");
            // add this new user to the Database because User in Mongo Stitch only contain EMAIL & PASSWORD
            let newUser = {
              email: email,
              password: password,
              blockChainAddress: blockChainAddress
            };
            mongodb.db('vinacann').collection('user').insertOne(newUser);
        })
        .catch(err => {
            console.log("Error registering new user:", err);
        });
}

function resetPassword(email) {
    emailPassClient.sendResetPasswordEmail(email).then(() => {
        console.log("Successfully sent password reset email!");
    }).catch(err => {
        console.log("Error sending password reset email:", err);
    });
}

/**
 * Login with Facebook
 */
function loginWithFacebook() {

}

/**
 * Login with Facebook
 */
function loginWithGoogle() {


}