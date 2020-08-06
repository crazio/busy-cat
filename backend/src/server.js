const { constants, DbAccessorFactory } = require('./common');
const { argv } = require('yargs');
const taskRouter = require('./router/task');
const App = require('./app');

const getDb = (dbName) => {
    return DbAccessorFactory.buildDb(dbName);
};

const setupRouters = (app) => {
    app.addRouter('/tasks', taskRouter);
};

const server = () => {
    const port = argv.port || 3000;
    const db = getDb(argv.db || constants.DB_NAME.SQLITE);
    const app = new App(db);
    setupRouters(app);
    return app.listen(port);
};

module.exports = server;
