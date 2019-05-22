import Router from 'koa-router';
import { Register, Login } from './auth.controller';

const auth = new Router();

auth.post('/register', Register);
auth.post('/login', Login);
// auth.post('/login/local', authCtrl.localLogin);
// auth.get('/exists/:key(email|username)/:value', authCtrl.exists);
// auth.post('/logout', authCtrl.logout);
// auth.get('/check', authCtrl.check);

export default auth;