import config from "./config.js";
import { google } from 'googleapis'

const googleAuthClient = new google.auth.OAuth2(
    config.CLIENT_ID,
    config.CLIENT_SECRET,
    config.CALLBACK_URL
)


export function getGoogleAuthUrl(): string {
    return googleAuthClient.generateAuthUrl({
        access_type: 'offline',
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
        ],
        prompt: 'select_account'
    })
}

export async function getGoogleUserInfo(code: string): Promise<{
    googleId: string;
    email: string;
    username: string;
    isVerified: boolean;
}> {
    const { tokens } = await googleAuthClient.getToken(code);
    googleAuthClient.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: 'v2', auth: googleAuthClient })
    const { data } = await oauth2.userinfo.get();
    const { id, email, name, verified_email } = data;
    if (!id || !email) {
        throw new Error("Failed to retrieve user info from Google");
    }

    return {
        googleId: id,
        email: email.toLowerCase(),
        username: name || email.split("@")[0], // fallback to email prefix
        isVerified: verified_email ?? true,          // Google emails are verified
    };

}