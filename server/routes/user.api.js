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
                blockChainAddress: blockChainAddress,
                resetPasswordToken: "",
            };
            mongodb.db('vinacann').collection('user').insertOne(newUser);
        })
        .catch(err => {
            console.log("Error registering new user:", err);
        });
}

function sendResetPasswordLink(email) {
    emailPassClient.sendResetPasswordEmail(email).then(() => {
        console.log("Successfully sent password reset email!");
    }).catch(err => {
        console.log("Error sending password reset email:", err);
    });
}

function resetPassword(password) {
    // Parse the URL query parameters
    const url = window.location.search;
    const params = new URLSearchParams(url);

    let token = params.get('token');
    let tokenId = params.get('tokenId');
    const newPassword = password;

    // Confirm the user's email/password account
    const emailPassClient = Stitch.defaultAppClient.auth
        .getProviderClient(UserPasswordAuthProviderClient.factory);

    emailPassClient.resetPassword(token, tokenId, newPassword).then(() => {
        console.log("Successfully reset password!");
    }).catch(err => {
        console.log("Error resetting password:", err);
    });
}

/**
 * Login with Google
 */
function loginWithGoogle() {
    const credential = new GoogleRedirectCredential();
    if (!stitchClient.auth.isLoggedIn) {
        return stitchClient.auth.loginWithRedirect(credential);
    } else if(stitchClient.auth.hasRedirectResult()) {
        return stitchClient.auth.handleRedirectResult().then(user => {
            let data = {
                firstName: user.profile.data.first_name,
                lastName: user.profile.data.last_name,
                email: user.profile.data.email,
                picture: user.profile.data.picture,
                // blockChainAddress:
            };
            mongodb.db('vinacann').collection('user')
                .insertOne(data)
        });
    }
}