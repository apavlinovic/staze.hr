const {
    Update,
    Delete,
    ChangePassword,
} = require('../../database/write/user.writer');

module.exports = {
    update: async function (request, response, next) {
        const { userId } = request.params;
        const { name, email, username, password, description } = request.body;

        if (!password) {
            next(new Error(`Password can't be null or empty`));
        }

        try {
            const user = await Update(
                userId,
                name,
                email,
                username,
                password,
                description,
            );

            response.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    changePassword: async function (request, response, next) {
        const { userId } = request.params;
        const { password } = request.body;

        if (!password) {
            next(new Error(`Password can't be null or empty`));
        }

        try {
            const user = await ChangePassword(userId, password);

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
