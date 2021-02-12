const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const os = require('os');
const path = require('path');

// App Scopes for Authorization Token in TOKEN_PATH
const SCOPES = [
	'https://www.googleapis.com/auth/tasks.readonly',
	'https://www.googleapis.com/auth/tasks',
	'https://www.googleapis.com/auth/userinfo.email',
	'https://www.googleapis.com/auth/userinfo.profile',
	'openid',
];

// Config Paths
const TOKEN_PATH = path.join(os.homedir(), './.taskcli/tokens/token.json');
const credPath = path.join(os.homedir(), './.taskcli/credentials.json');

// Load Client ID and Client Secret To Get apps OAuth Consent Screen and Give App access to access data and generate token to access app
let content;
try {
	content = fs.readFileSync(credPath);
} catch (err) {
	console.log('Error loading client secret file:', err);
	console.log('Error Name: ', err.name);
	console.log('Error message: ', err.message);
	console.log('Error Stack ⬇️');
	console.log(err.stack);
}

let oAuth2Client;

// Authorization of Client
authorize(JSON.parse(content));



/**
 * Create an OAuth2 client with the given credentials,
 * and then execute the given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
// Authorize And Create an OAuth2 client with the given credentials
// Authoriztion to app using clientID(oAauth credentials) (create oauth client) and generate a token with that oauthClient is a one time process
// let oAuth2Client;
function authorize(credentials) {
	// link on terminal screen for oauth Consent Screen + Redirection back to app
    const { client_secret, client_id, redirect_uris } = credentials.installed;
	oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

	// Check if we have previously stored a token.
    try {
        const token= fs.readFileSync(TOKEN_PATH)
        // console.log(JSON.parse(token))
		oAuth2Client.setCredentials(JSON.parse(token));
	}
    catch (err) {
        getNewToken(oAuth2Client);//getnewtoken fn is in closure scope
    }

    return oAuth2Client
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client) {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES,
	});
	console.log('Authorize this app by visiting this url:', authUrl);
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.question('Enter the code from that page here: ', (code) => {
		rl.close();
		oAuth2Client.getToken(code, (err, token) => {
			if (err) return console.error('Error retrieving access token', err);
			oAuth2Client.setCredentials(token);
			// Store the token to disk for later program executions
			fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
				if (err) return console.error(err);
				console.log('Token stored to', TOKEN_PATH);
			});
			// callback(oAuth2Client);
		});
	});
}
// Once Token is generated after authorization using my app configs/credentials it will remain there forever
