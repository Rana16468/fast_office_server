import donenv from 'dotenv';
import path from 'path';
donenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  byrypt_salt_rounds:process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_srcret:process.env.JWT_ACCESS_SECRET,
  expries_in_token:process.env.EXPIRES_IN,
  google_auth:process.env.GOOGLEAUTH,
  ssl_commerce:{
    store_id:process.env.STORE_ID,
    store_passwd:process.env.STORE_PASSWD,
    ssl_payment_api:process.env.SSL_PAYMENT_API,
    ssl_validation_api:process.env.SSL_VALIDATION_API,
    success_url:process.env.SUCCESS_URL,
    fail_url:process.env.FAIL_URL,
    cancel_url:process.env.CANCEL_URL
  },
  gemini_api_key:process.env.GEMINI_API_KEY
};
