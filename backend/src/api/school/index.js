import Router from 'koa-router';
import { DefaultMeal } from './food.controller';

const school = new Router();

school.get('/meal/this', DefaultMeal);

export default school;