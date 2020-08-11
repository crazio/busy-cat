const DaoFactory = require('./dao/dao-factory');

class DbAccessor {
    constructor(args) {
        this.daoFactory = new DaoFactory();
        this.db = this.getDbConnection(args);
    }

    getDb() {
        return this.db;
    }

    getDbConnection(args) {
        throw new Error('Method is not implemented');
    }

    buildDao(name) {
        return this.daoFactory.buildDao(name, this.getDb());
    }
}

module.exports = DbAccessor;
