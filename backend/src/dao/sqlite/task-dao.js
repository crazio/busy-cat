const { constants } = require('../../common');
const SqliteDao = require('./sqlite-dao');

class TaskDao extends SqliteDao {
    create(entity) {
        const sqlInsert = `INSERT INTO ${constants.TABLE_NAME.TASK}
                          (PARENT, PROJECT_ID, ASSIGNEE_ID, STATUS_ID, TITLE, DESCR) 
                          VALUES (?, ?, ?, ?, ?, ?)`;
        return this.dbRun(sqlInsert, [
            entity.parent,
            entity.project_id,
            entity.assignee_id,
            entity.status_id,
            entity.title,
            entity.descr
        ]);
    }

    delete(id) {
        const sqlDelete = `DELETE FROM ${constants.TABLE_NAME.TASK} WHERE ID = ?`;
        return this.dbRun(sqlDelete, [id]);
    }

    update(entity) {
        const id = this.detachAndGetIdFromEntity(entity);
        const setClause = this.getSetClause(Object.keys(entity));
        const params = this.getSqlParams(entity);
        params.push(id);
        const sqlUpdate = `UPDATE ${constants.TABLE_NAME.TASK} ${setClause} WHERE ID = ?`;
        return this.dbRun(sqlUpdate, params);
    }

    getById(id) {
        const sqlSelectSingle = `SELECT PARENT as parent, PROJECT_ID as project_id,
                                ASSIGNEE_ID as assignee_id, STATUS_ID as status_id,
                                TITLE as title, DESCR as descr
                                FROM ${constants.TABLE_NAME.TASK} WHERE ID = ?`;
        return this.dbGet(sqlSelectSingle, [id], true);
    }

    getAll() {
        const sqlSelectAll = `SELECT PARENT as parent, PROJECT_ID as project_id,
                             ASSIGNEE_ID as assignee_id, STATUS_ID as status_id,
                             TITLE as title, DESCR as descr
                             FROM ${constants.TABLE_NAME.TASK}`;
        return this.dbGet(sqlSelectAll);
    }
}

module.exports = TaskDao;
