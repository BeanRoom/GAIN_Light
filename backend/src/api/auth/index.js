import Router from 'koa-router';
import { CheckAuth, Login, RegStudent, RegTeacher, RegGuest  } from './auth.controller';

const auth = new Router();

auth.post('/check', CheckAuth);
auth.post('/login', Login);
auth.post('/register/student', RegStudent);
auth.post('/register/teacher', RegTeacher);
auth.post('/register/guest', RegGuest);

//auth.post('/login/local', authCtrl.localLogin);
// auth.get('/exists/:key(email|username)/:value', authCtrl.exists);
// auth.post('/logout', authCtrl.logout);
// auth.get('/check', authCtrl.check);

export default auth;    