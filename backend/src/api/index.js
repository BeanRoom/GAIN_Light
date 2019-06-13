import Router from 'koa-router';


import auth from './auth';
import school from './school';
import post from './post'


const api = new Router();

api.use('/auth', auth.routes());
api.use('/school', school.routes());
// api.use('/post', post.routes());

export default api;