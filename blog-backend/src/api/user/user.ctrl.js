import Joi from 'joi';
import User from '../../models/user.js';

export const updateUser = async (ctx) => {
  if (ctx.state.user._id === ctx.params.id || ctx.request.body.isAdmin) {
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
      const user = await User.findByIdAndUpdate(ctx.state.user._id, {
        $set: ctx.request.body,
      });
      ctx.body = '회원 정보가 변경되었습니다.';
      ctx.status = 200;
    } catch (e) {
      ctx.throw(500, e);
    }
  }
};

export const deleteUser = async (ctx) => {
  if (ctx.state.user._id === ctx.params.id || ctx.request.body.isAdmin) {
    try {
      await User.findByIdAndDelete(ctx.params.id);
      ctx.body = '회원 탈퇴가 성공하였습니다.';
      ctx.status = 200;
    } catch (e) {
      ctx.throw(403, e);
    }
  }
};

export const getUser = async (ctx) => {
  try {
    const user = await User.findById(ctx.params.id);
    ctx.body = user;
    ctx.status = 200;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const follow = async (ctx) => {
  if (ctx.request.body.userId !== ctx.params.id) {
    try {
      const user = await User.findById(ctx.params.id);
      const currentUser = await User.findById(ctx.request.body.userId);
      if (!user.followers.includes(ctx.state.user._id)) {
        await user.updateOne({ $push: { followers: ctx.request.body.userId } });
        await currentUser.updateOne({
          $push: { followings: ctx.params.id },
        });
        ctx.body = '팔로우 하였습니다.';
        ctx.status = 200;
      } else {
        ctx.body = '이미 팔로우 하였습니다.';
        ctx.status = 403;
      }
    } catch (e) {
      ctx.throw(500, e);
    }
  } else {
    ctx.status = 403;
  }
};

export const unfollow = async (ctx) => {
  if (ctx.request.body.userId !== ctx.params.id) {
    try {
      const user = await User.findById(ctx.params.id);
      const currentUser = await User.findById(ctx.request.body.userId);
      if (user.followers.includes(ctx.state.user._id)) {
        await user.updateOne({ $pull: { followers: ctx.request.body.userId } });
        await currentUser.updateOne({
          $pull: { followings: ctx.params.id },
        });
        ctx.body = '팔로우를 취소 하였습니다.';
        ctx.status = 200;
      } else {
        ctx.body = '팔로우를 할 수 없습니다.';
        ctx.status = 403;
      }
    } catch (e) {
      ctx.throw(500, e);
    }
  } else {
    ctx.status = 403;
  }
};
