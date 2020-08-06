const express = require('express');

class App {
    constructor(db) {
        this.app = express();
        this.db = db;
    }

    addRouter(path, setupFunc) {
        const router = express.Router();
        setupFunc(router, this.db);
        this.app.use(path, router);
    }

    listen(port) {
        return this.app.listen(port, () => {
            console.log(`Server is up and running on port ${port}`);
        });
    }
}

module.exports = App;
