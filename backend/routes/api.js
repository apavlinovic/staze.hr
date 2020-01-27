const router = require('express').Router();
const { GetTrails } = require('../readonly/trail.query')

router.get('/trails', async function(req, res, next) {
    const { pageSize, page } = req.query;

    await GetTrails(pageSize, page).then(
      (results) => res.status(200).json(results.rows),
      (error) => res.status(500).send(error)
    )
});

module.exports = router;
