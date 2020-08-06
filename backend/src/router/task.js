module.exports = (router, db) => {
    router.get('/', (req, res) => {
        res.json({ test: 'test' });
    });
};
