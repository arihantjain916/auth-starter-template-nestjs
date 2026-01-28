import { get } from 'http';

export default () => ({
  database: {
    url: getConfig('DATABASE_URL'),
  },
});

const getConfig = (key: string): string => {
  const value = process.env[key];
  console.log('key: ', key, ' value: ', value);
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};
