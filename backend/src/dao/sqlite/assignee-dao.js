const { Dao } = require('../../common');

class AssigneeDao extends Dao {
    create(entity) {
        throw new Error('Method not implemented');
    }

    delete(id) {
        throw new Error('Method not implemented');
    }

    update(entity) {
        throw new Error('Method not implemented');
    }

    getById(id) {
        throw new Error('Method not implemented');
    }

    getAll() {
        return this.db();
    }
}

module.exports = AssigneeDao;
