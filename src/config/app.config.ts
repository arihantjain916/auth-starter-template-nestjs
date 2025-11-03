export default () => ({
  database: {
    host: getConfig('DB_HOST'),
    port: getConfig('DB_PORT'),
    username: getConfig('DB_USER'),
    password: getConfig('DB_PASS'),
    database: getConfig('DB_NAME'),
    dialect: getConfig('DB_DIALECT'),
  },
});

const getConfig = (key: string): string => {
  const value = process.env[key];
  console.log("key: ", key , " value: ", value);
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};
