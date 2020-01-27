const { DatabaseConnection } = require("../database/db-connection")

function GetTrails(pageSize = 100, page = 1) {
    return DatabaseConnection
    .query({
        text: `
            select * from trails
            order by id asc
            limit $1
            offset $2
        `,

        values: [ pageSize, pageSize * (page - 1) ]
    });
}

module.exports = {
    GetTrails
}