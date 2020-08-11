const { constants } = require('../common');

const assigneeDao = dbAccessor.buildDao(constants.ENTITY.ASSIGNEE);

module.exports = (router, dbAccessor) => {
    router.get('/', (req, res) => {
        res.json({ test: 'test' });
    });
};
