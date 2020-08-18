const { Dao } = require('../../common');

class SqliteDao extends Dao {
    dbRun(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }

    dbGet(sql, params = [], isSingleEntry = false) {
        return isSingleEntry ? this.getSingle(sql, params) : this.get(sql, params);
    }

    get(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row || {});
            });
        });
    }

    getSingle(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows || []);
            });
        });
    }

    getSetClause(props) {
        return props.reduce((setClause, prop, index) => {
            setClause = setClause + ` SET ${prop.toUpperCase()} = ?`;
            return index === props.length - 1 ? setClause : setClause + `,`;
        }, '');
    }

    getSqlParams(entity) {
        return Object.keys(entity).reduce((params, key) => {
            params.push(entity[key]);
            return params;
        }, []);
    }

    detachAndGetIdFromEntity(entity) {
        const id = entity.id;
        delete entity.id;
        return id;
    }
}

module.exports = SqliteDao;
