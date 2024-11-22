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
  google_auth:process.env.GOOGLEAUTH
};
