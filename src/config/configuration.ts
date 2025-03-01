export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    url: process.env.MYSQL_URL,
    password: process.env.MYSQL_PASSWORD,
  },
  cache: {
    host: process.env.CACHE_HOST,
    port: parseInt(process.env.CACHE_PORT, 10) || 6379,
    ttl: parseInt(process.env.CACHE_TTL, 10) || 1,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    salt: process.env.JWT_SALT,
  },
});
