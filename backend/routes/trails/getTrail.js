const { GetTrailById, GetTrailBySlug } = require('../../database/readonly/trail.query');

module.exports = {
    byId: async (req, res, next) => {
        const { trailId } = req.params;

        await GetTrailById(trailId).then(
            (result) => {
                res.status(200).json(result);
            },
            (error) => res.status(500).send(error),
        );
    },

    bySlug: async (req, res, next) => {
        const { trailSlug } = req.params;

        await GetTrailBySlug(trailSlug).then(
            (result) => {
                res.status(200).json(result);
            },
            (error) => res.status(500).send(error),
        );
    },
};
