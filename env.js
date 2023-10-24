import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config();

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';

const envConfig = dotenv.parse(fs.readFileSync(envFile));
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}
