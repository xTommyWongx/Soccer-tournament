// General Initialization
require('dotenv').config();
// const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
// const REDIS_PORT = process.env.REDIS_PORT || 6379
const NODE_ENV = process.env.NODE_ENV || 'development' ;
const knexFile = require('./knexfile')[NODE_ENV];
const knex = require('knex')(knexFile);

// const redis = require('redis');
// const redisClient = redis.createClient({
//     host: REDIS_HOST,
//     port: REDIS_PORT
// })
const ViewRouter = require('./ViewRouter');
const { PlayersRouter,
        TeamsRouter,
        AuthRouter} = require('./routers');
const { PlayersService,
        TeamsService} = require('./services');

let playersService = new PlayersService(knex);
let teamsService = new TeamsService(knex);

const {app} = require('./utils/init-app')();

app.use('/', new ViewRouter().router());
app.use('/api/players', new PlayersRouter(playersService).router());
app.use('/api/teams', new TeamsRouter(teamsService).router());
app.use('/auth', new AuthRouter().router());


app.listen(8080, () => {
    console.log(`Server listening on port 8080`);
})
