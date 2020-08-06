class DaoFactory {
    daoMap = {};

    registerDao(name, creator) {
        this.daoMap[name] = creator;
    }

    buildDao(name) {
        return new this.daoMap[name]();
    }
}
