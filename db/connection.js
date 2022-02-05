const Pool = require("pg").Pool;
// pools will use environment variables (.env) for connection information
const pool = new Pool();

module.exports = pool;
