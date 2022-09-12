import { createPool } from 'mysql';
import { promisify } from 'util';

import { database } from './keys.js';

const pool = createPool(database);

pool.getConnection((err, conncection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('DATABASE CONNECTION WAS CLOSED');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('DATABASE HAS TO MANY CONNECTION');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('DATABASE CONNECTION WAS REFUSED');
    }
  }

  if (conncection) conncection.release();
  console.log('DB is Connected');
  return;
});

//Promisify Pool Query
pool.query = promisify(pool.query);

export default pool;
