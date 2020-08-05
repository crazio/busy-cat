class DbAccessor {
    constructor(args) {
        this.db = this.getDbConnection(args);
    }

    getDb() {
        return this.db;
    }

    getDbConnection(args) {
        throw new Error('Method is not implemented');
    }
}

module.exports = DbAccessor;
