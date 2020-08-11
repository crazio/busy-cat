const { constants } = require('./common');
const { DbAccessorFactory } = require('./db-accessor');
const { argv } = require('yargs');
const { taskHandler } = require('./handler');
const express = require('express');

const ROUTER_HANDLER_MAP = {
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

const setupApp = (app) => {
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
