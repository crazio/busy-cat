const { Dao } = require('../../common');

class TaskDao extends Dao {
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
        throw new Error('Method not implemented');
    }
}

module.exports = TaskDao;