const { constants } = require('../common');

module.exports = (router, dbAccessor) => {
    const taskDao = dbAccessor.buildDao(constants.ENTITY.TASK);

    router.get('/', (req, res) => {
        res.json({ test: 'test' });
    });
};
