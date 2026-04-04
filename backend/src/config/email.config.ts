import {google} from 'googleapis'
import config from './config.js'

console.log("Mail service start ")

const OAuth2 = google.auth.OAuth2;

const createGmailClient = ()=>{
  const oauth2Client = new OAuth2(
    (config.CLIENT_ID).trim(),
    (config.CLIENT_SECRET).trim(),
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token:(config.REFRESH_TOKEN).trim()
  })

  return google.gmail({version: 'v1', auth: oauth2Client})

};

export default createGmailClient;

