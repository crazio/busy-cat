const { constants } = require('../../common');
const SqliteDao = require('./sqlite-dao');

class AssigneeDao extends SqliteDao {
    create(entity) {
        const sqlInsert = `INSERT INTO ${constants.TABLE_NAME.ASSIGNEE}(NAME, SURNAME) VALUES (?, ?)`;
        return this.dbRun(sqlInsert, [entity.name, entity.surname]);
    }

    delete(id) {
        const sqlDelete = `DELETE FROM ${constants.TABLE_NAME.ASSIGNEE} WHERE ID = ?`;
        return this.dbRun(sqlDelete, [id]);
    }

    update(entity) {
        const id = this.detachAndGetIdFromEntity(entity);
        const setClause = this.getSetClause(Object.keys(entity));
        const params = this.getSqlParams(entity);
        params.push(id);
        const sqlUpdate = `UPDATE ${constants.TABLE_NAME.ASSIGNEE} ${setClause} WHERE ID = ?`;
        return this.dbRun(sqlUpdate, params);
    }

    getById(id) {
        const sqlSelectSingle = `SELECT NAME as name, SURNAME as surname 
                                FROM ${constants.TABLE_NAME.ASSIGNEE} WHERE ID = ?`;
        return this.dbGet(sqlSelectSingle, [id], true);
    }

    getAll() {
        const sqlSelectAll = `SELECT NAME as name, SURNAME as surname FROM ${constants.TABLE_NAME.ASSIGNEE}`;
        return this.dbGet(sqlSelectAll);
    }
}

module.exports = AssigneeDao;
