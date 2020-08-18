const { DaoFactory, constants } = require('../../common');
const AssigneeDao = require('./assignee-dao');
const ProjectDao = require('./project-dao');
const TaskDao = require('./task-dao');
const TaskStatusDao = require('./task-status-dao');

class SqliteDaoFactory extends DaoFactory {
    buildDao(name, args) {
        switch (name) {
            case constants.ENTITY.ASSIGNEE:
                return new AssigneeDao(args);
            case constants.ENTITY.PROJECT:
                return new ProjectDao(args);
            case constants.ENTITY.TASK:
                return new TaskDao(args);
            case constants.ENTITY.TASK_STATUS:
                return new TaskStatusDao(args);
            default:
                throw new Error(`Dao ${name} is not implemented`);
        }
    }
}

module.exports = SqliteDaoFactory;
