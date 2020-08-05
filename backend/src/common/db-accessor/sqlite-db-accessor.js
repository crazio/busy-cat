const path = require('path');
const sqlite3 = require('sqlite3');
const DbAccessor = require('./db-accessor');
const SQL = require('./sql/sqlite');

class SqliteDbAccessor extends DbAccessor {
    getDbConnection(args) {
        const parsedArgs = this.parseArgs(args);
        return this.createDatabase(parsedArgs);
    }

    createDatabase(args) {
        return sqlite3.Database(`${args.path}/${args.file}`, (err) => {
            if (err) {
                throw new Error('Error while accessing the database');
            }
            this.createTables();
        });
    }

    createTables() {
        this.createAssigneeTable();
    }

    createAssigneeTable() {
        this.db.run(SQL.CREATE_ASSIGNEE_TABLE, (err) => {
            if (err) {
                throw new Error('Error while creating Assignee table');
            }
        });
    }

    parseArgs(args) {
        return {
            path: args.path || path.join(__dirname, '..', '..'),
            file: args.file || 'local.db'
        };
    }
}

module.exports = SqliteDbAccessor;
