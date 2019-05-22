// import Joi from 'joi';
// import Post from 'models/Post';

// export const newPost = async (ctx) => {

//     const schema = Joi.object().keys({
//         title: Joi.string().required(),
//         body: Joi.string().required()
//     });

//     const result = Joi.validate(ctx.request.body, schema);

//     if(result.error) {
//         ctx.status = 400;
//         return;
//     }

//     let account = null;


//     try {
//         account = await Post.newPost(ctx.request.body);
//     } catch(e) {
//         ctx.throw(500, e);
//     }


//     ctx.body = { "result": "OK" };
// }