const path = require('path');
const sqlite3 = require('sqlite3');
const { DbAccessor, constants } = require('../../common');
const SQL = require('../sql/sqlite');
const { AssigneeDao, ProjectDao, TaskDao, TaskStatusDao } = require('../../dao/sqlite');

class SqliteDbAccessor extends DbAccessor {
    registerDaoObjects() {
        this.daoFactory.registerDao(constants.ENTITY.PROJECT, ProjectDao);
        this.daoFactory.registerDao(constants.ENTITY.ASSIGNEE, AssigneeDao);
        this.daoFactory.registerDao(constants.ENTITY.TASK, TaskDao);
        this.daoFactory.registerDao(constants.ENTITY.TASK_STATUS, TaskStatusDao);
    }

    getDbConnection(args) {
        const parsedArgs = this.parseArgs(args);
        return this.createDatabase(parsedArgs);
    }

    parseArgs(args) {
        return {
            path: args.path || path.join(__dirname, '..', '..'),
            file: args.file || 'local.db'
        };
    }

    createDatabase(args) {
        return new sqlite3.Database(`${args.path}/${args.file}`, (err) => {
            if (err) {
                throw new Error(`Error while accessing the database: ${err}`);
            }
            this.createTables();
        });
    }

    createTables() {
        this.createProjectTable();
        this.createAssigneeTable();
        this.createTakStatusTable();
        this.createTaskTable();
    }

    createProjectTable() {
        this.db.run(SQL.CREATE_PROJECT_TABLE, (err) => {
            if (err) {
                throw new Error(`Error while creating Project table: ${err.message}`);
            }
        });
    }

    createAssigneeTable() {
        this.db.run(SQL.CREATE_ASSIGNEE_TABLE, (err) => {
            if (err) {
                throw new Error(`Error while creating Assignee table: ${err.message}`);
            }
        });
    }

    createTakStatusTable() {
        this.db.run(SQL.CREATE_TASK_STATUS_TABLE, (err) => {
            if (err) {
                throw new Error(`Error while creating Task Status table: ${err.message}`);
            }
            this.deleteFromTaskStatusTable();
        });
    }

    deleteFromTaskStatusTable() {
        this.db.run(SQL.DELETE_TASK_STATUS_TABLE, (err) => {
            if (err) {
                throw new Error(
                    `Error while deleting content from Task Status table: ${err.message}`
                );
            }
            this.insertValuesToTaskStatusTable();
        });
    }

    insertValuesToTaskStatusTable() {
        const sqlInsert = `INSERT INTO ${constants.TABLE_NAME.TASK_STATUS} (ID, NAME, DESCR) VALUES (?, ?, ?)`;
        const query = this.db.prepare(sqlInsert);
        this.runInsertQueryForTaskStatus(query);
        query.finalize();
    }

    runInsertQueryForTaskStatus(query) {
        Object.keys(constants.TASK_STATUS).forEach((key) => {
            const taskStatus = constants.TASK_STATUS[key];
            query.run([taskStatus.ID, taskStatus.NAME, taskStatus.DESCR], (err) => {
                if (err) {
                    throw new Error(
                        `Error while adding new Task Status (${taskStatus.NAME}): ${err.message}`
                    );
                }
            });
        });
    }

    createTaskTable() {
        this.db.run(SQL.CREATE_TASK_TABLE, (err) => {
            if (err) {
                throw new Error(`Error while creating Task table: ${err.message}`);
            }
        });
    }
}

module.exports = SqliteDbAccessor;
