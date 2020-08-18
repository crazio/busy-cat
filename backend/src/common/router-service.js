class RouterService {
    constructor(dbAccessor) {
        this.req = null;
        this.res = null;
        this.next = null;
        this.dbAccessor = dbAccessor;
    }

    getBody() {
        return this.req.body;
    }

    getReqParams() {
        return this.req.params;
    }

    responseError(code, error) {
        this.res.status(code).json({ error: error });
    }

    respsonseSuccess(code, data) {
        return data ? this.res.status(code).json(data) : this.res.status(code).end();
    }

    with(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
        return this;
    }
}

module.exports = RouterService;
