const router = require('express').Router();
const { GetTrailById, GetTrailBySlug, GetTrails, GetTrailMountains } = require('../database/readonly/trail.query')
let { QueryAPICache } = require('../services/cache.service')

router.get('/trails', async function(req, res, next) {

    let results = QueryAPICache.get(req.url);
    if(results) {
      res.status(200).json(results);
      return;
    }

    let { 
      pageSize, 
      page, 
      orderBy,
      mountain,
      maintainer,
      distance,
      duration
    } = req.query;

    if(orderBy) {
      orderBy = orderBy.split("~");
      orderBy = orderBy.map(order => {
        return order.split('-');
      })
    }

    await GetTrails(pageSize, page, orderBy, mountain, maintainer, distance, duration).then(
      (results) => {
        QueryAPICache.set(req.url, {
          rows: results.rows.map(r => r.toJSON()),
          count: results.count
        });

        res.status(200).json(results);        
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

  let results = QueryAPICache.get(req.url);
  if(results) {
    res.status(200).json(results);
    return;
  }

  await GetTrailMountains().then(
    (results) => {
      QueryAPICache.set(req.url, results.map(r => r.toJSON()));

      res.status(200).json(results);
    },
    (error) => res.status(500).send(error)
  )
})

module.exports = router;