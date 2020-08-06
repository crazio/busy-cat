const constants = require('../constants');
const SqliteDbAccessor = require('./sqlite-db-accessor');

class DbAccessorFactory {
    static buildDb(dbName, args = {}) {
        switch (dbName) {
            case constants.DB_NAME.SQLITE:
                return new SqliteDbAccessor(args).getDb();
            default:
                throw new Error(`Database ${dbName} is not supported!`);
        }
    }
}

module.exports = DbAccessorFactory;
