const { constants, RouterService } = require('../common');

class AssigneeService extends RouterService {
    constructor(dbAccessor) {
        super(dbAccessor);
        this.assigneeDao = dbAccessor.buildDao(constants.ENTITY.ASSIGNEE);
    }

    async getAllAssignees() {
        try {
            const assignees = await this.assigneeDao.getAll();
            this.respsonseSuccess(200, assignees);
        } catch (err) {
            this.responseError(400, err.message);
        }
    }

    async getAssigneeById() {
        try {
            const assigneeId = this.getReqParams().id;
            const assignee = await this.assigneeDao.getById(assigneeId);
            this.respsonseSuccess(200, assignee);
        } catch (err) {
            this.responseError(400, err.message);
        }
    }

    async createAssignee() {
        try {
            const newAssignee = this.getBody();
            await this.assigneeDao.create(newAssignee);
            this.respsonseSuccess(201);
        } catch (err) {
            this.responseError(400, err.message);
        }
    }

    async updateAssignee() {
        try {
            const assignee = this.constructAssigneeForUpdate();
            await this.assigneeDao.update(assignee);
            this.respsonseSuccess(200);
        } catch (err) {
            this.responseError(400, err.message);
        }
    }

    constructAssigneeForUpdate() {
        const assignee = this.getBody();
        const id = this.getReqParams().id;
        assignee.id = id;
        return assignee;
    }
}

module.exports = AssigneeService;
