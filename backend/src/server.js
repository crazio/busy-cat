const { constants } = require('./common');
const { DbAccessorFactory } = require('./db-accessor');
const { argv } = require('yargs');
const { taskHandler, assigneeHandler } = require('./handler');
const bodyParser = require('body-parser');
const express = require('express');

const ROUTER_HANDLER_MAP = {
    ASSIGNEE: {
        path: '/assignees',
        handler: assigneeHandler
    },
    TASK: {
        path: '/tasks',
        handler: taskHandler
    }
};

const createRouterAndMapWithHandler = (handler, dbAccessor) => {
    const router = express.Router();
    handler(router, dbAccessor);
    return router;
};

const getDbAccessor = (dbName) => {
    return DbAccessorFactory.buildDb(dbName || constants.DB_NAME.SQLITE);
};

const setAppRouters = (app) => {
    const dbAccessor = getDbAccessor(argv.db);
    Object.keys(ROUTER_HANDLER_MAP).forEach((key) => {
        const mapper = ROUTER_HANDLER_MAP[key];
        const router = createRouterAndMapWithHandler(mapper.handler, dbAccessor);
        app.use(mapper.path, router);
    });
};

const setupMiddleware = (app) => {
    app.use(bodyParser.json());
};

const setupApp = (app) => {
    setupMiddleware(app);
    setAppRouters(app);
};

const server = () => {
    const app = express();
    setupApp(app);
    const port = argv.port || 3000;
    return app.listen(port, () => {
        console.log(`Server is listening on port: ${port}`);
    });
};

module.exports = server;
