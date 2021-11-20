
const config = { 
    server: {
        port: process.env.PORT
    },
    db: {
        url: process.env.URL_DB
    },
    twj: {
        seed: process.env.SECRET_JWT_SEED
    }
}
module.exports = config