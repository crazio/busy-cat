class DaoFactory {
    daoMap = {};

    registerDao(name, creator) {
        this.daoMap[name] = creator;
    }

    buildDao(name, args) {
        return new this.daoMap[name](args);
    }
}

module.exports = DaoFactory;
