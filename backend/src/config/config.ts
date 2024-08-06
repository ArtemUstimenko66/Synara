import {registerAs} from '@nestjs/config'

export default registerAs('config', () => ({
    google : {
        clientID: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_CLIEN_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL

    }
}))