/**
 * Import Stitch Library
 */
import {
    Stitch,
    RemoteMongoClient,
    UserPasswordCredential,
    UserPasswordAuthProviderClient,
    GoogleRedirectCredential,
    FacebookRedirectCredential,
} from 'mongodb-stitch-browser-sdk'

exports = loginWithGoogle();
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
function loginWithGoogle() {
    const credential = new GoogleRedirectCredential();
    if (!stitchClient.auth.isLoggedIn) {
        return stitchClient.auth.loginWithRedirect(credential);
    } else if(stitchClient.auth.hasRedirectResult()) {
        return stitchClient.auth.handleRedirectResult().then(user => {
            console.log(user.profile.data);
            let data = {
                firstName: user.profile.data.first_name,
                lastName: user.profile.data.last_name,
                email: user.profile.data.email,
                picture: user.profile.data.picture,
                // blockChainAddress:
            };
            console.log(data);
            mongodb.db('vinacann').collection('user')
                .insertOne(data)
        });
    }
    return stitchClient.auth.loginWithRedirect(credential);;


}