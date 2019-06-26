import Router from 'koa-router';
import { DefaultMeal, SelectMeal } from './food.controller';

const school = new Router();

school.get('/meal/this', DefaultMeal);
school.post('/meal/select', SelectMeal);

export default school;