import Joi from 'joi';
import User from '../../models/user.js';

export const updateUser = async (ctx) => {
  if (ctx.request.body.id === ctx.params.id || ctx.request.body.isAdmin) {
    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(20).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .required(),
      password: Joi.string()
        // 8 ~ 16자 영문,숫자,특수기호 조합
        .pattern(
          new RegExp(
            '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@#!%*#^&\\(\\)-_=+]).{8,16}$',
          ),
        )
        .required(),
    });

    const result = schema.validate(ctx.request.body);
    if (result.error) {
      ctx.status = 403;
      ctx.body = result.error;
      return;
    }

    try {
      const user = await User.findByIdAndUpdate(ctx.params.id, {
        $set: ctx.reqyest.body,
      });
      ctx.body = user;
      ctx.status = 200;
    } catch (e) {
      ctx.throw(500, e);
    }
  }
};

export const deleteUser = () => {};

export const getUser = () => {};

export const follow = () => {};

export const unfollow = () => {};
