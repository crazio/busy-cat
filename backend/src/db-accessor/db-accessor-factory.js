const { constants } = require('../common');
const SqliteDbAccessor = require('./sqlite/sqlite-db-accessor');

class DbAccessorFactory {
    static buildDb(dbName, args = {}) {
        switch (dbName) {
            case constants.DB_NAME.SQLITE:
                return new SqliteDbAccessor(args);
            default:
                throw new Error(`Database ${dbName} is not supported!`);
        }
    }
}

module.exports = DbAccessorFactory;
