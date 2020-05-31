const { Create, Update, Delete } = require('../../database/write/user.writer');

module.exports = {
    create: async function (request, response, next) {
        const { name, email, description } = request.body;

        try {
            const user = await Create(name, email, description);
            response.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    update: async function (request, response, next) {
        const { userId } = request.params;
        const { name, email, description } = request.body;

        try {
            const user = await Update(userId, name, email, description);
            response.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    delete: async function (request, response, next) {
        const { userId } = request.params;

        try {
            await Delete(userId);
            response.status(200).json();
        } catch (error) {
            next(error);
        }
    },
};
