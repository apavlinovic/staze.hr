const router = require('express').Router();
const { GetTrailById, GetTrailBySlug, GetTrails, GetTrailMountains } = require('../database/readonly/trail.query')

router.get('/trails', async function(req, res, next) {
    let { 
      pageSize, 
      page, 
      orderBy,
      mountain,
      maintainer
    } = req.query;

    if(orderBy) {
      orderBy = orderBy.split("~");
      orderBy = orderBy.map(order => {
        return order.split('-');
      })
    }

    await GetTrails(pageSize, page, orderBy, mountain, maintainer).then(
      (results) => {
        res.status(200).json(results);
        next();
      },
      (error) => {
        res.status(500).send(error) 
      }
    )
});

router.get('/trail/:trailId(\\d+)', async function(req, res, next) {
  const { trailId } = req.params;

  await GetTrailById(trailId).then(
    (result) => {
      res.status(200).json(result);
    },
    (error) => res.status(500).send(error)
  )
});

router.get('/trail/:trailSlug', async function(req, res, next) {
  const { trailSlug } = req.params;

  await GetTrailBySlug(trailSlug).then(
    (result) => {
      res.status(200).json(result);
    },
    (error) => res.status(500).send(error)
  )
});

router.get('/mountains', async function(req, res, next) {
  await GetTrailMountains().then(
    (result) => {
      res.status(200).json(result);
    },
    (error) => res.status(500).send(error)
  )
})



module.exports = router;
