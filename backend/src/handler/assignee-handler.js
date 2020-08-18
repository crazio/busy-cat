const { constants } = require('../common');
const AssigneeService = require('../service/assignee-service');

module.exports = (router, dbAccessor) => {
    const assigneeSrv = new AssigneeService(dbAccessor);

    router.get('/', async (_, res) => {
        return await assigneeSrv.with(_, res).getAllAssignees();
    });

    router.get('/:id', async (req, res) => {
        return await assigneeSrv.with(req, res).getAssigneeById();
    });

    router.post('/', async (req, res) => {
        return await assigneeSrv.with(req, res).createAssignee();
    });

    router.put('/:id', async (req, res) => {
        return await assigneeSrv.with(req, res).updateAssignee();
    });

    router.patch('/:id', async (req, res) => {
        return await assigneeSrv.with(req, res).updateAssignee();
    });
};
