const constants = {
    DB_NAME: {
        SQLITE: 'SqLite'
    },

    TABLE_NAME: {
        PROJECT: 'PROJECT',
        ASSIGNEE: 'ASSIGNEE',
        TASK: 'TASK',
        TASK_STATUS: 'TASK_STATUS'
    },

    TASK_STATUS: {
        READY : {
            ID: 1,
            NAME: 'Ready',
            DESCR: 'Task is ready to be assigned and started'
        },
        IN_PROGRESS: {
            ID: 2,
            NAME: 'In Progress',
            DESCR: 'Task is already in progress'
        },
        FINISHED: {
            ID: 3,
            NAME: 'Finished',
            DESCR: 'Task is finished'
        }
    }
};

module.exports = constants;
