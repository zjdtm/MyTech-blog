const router = require("express").Router();
const User = require("../models/User");
const crypto = require("crypto");
const util = require("util");

//REGISTER
router.post("/register", async (req, res) => {
  const { userId, password } = req.body;

  // util.promisify : 비동기로 돌려주는 함수를 promise로 감싸주지 않고 사용할 수 있다.
  const randomBytesPromise = util.promisify(crypto.randomBytes);
  const pbkdf2Promise = util.promisify(crypto.pbkdf2);

  // salt 생성
  const createSalt = async () => {
    const buf = await randomBytesPromise(64);
    return buf.toString("base64");
  };

  // 비밀번호 암호화
  const createHashedPassword = async (password) => {
    const salt = await createSalt();
    const key = await pbkdf2Promise(password, salt, 13579, 64, "sha512");
    const hashedPassword = key.toString("base64");
    return { hashedPassword, salt };
  };

  try {
    // 중복 회원 가입 방지
    const exists = await User.findOne({ userId });
    if (exists) {
      res.status(409).json("중복된 회원입니다.");
      return;
    }

    const { hashedPassword, salt } = await createHashedPassword(password);

    const newUser = new User({
      userId: req.body.userId,
      email: req.body.email,
      password: hashedPassword,
      salt: salt,
    });

    await newUser.save();
    // serialize() 사용해서 password & salt 제외
    const SerializeUser = newUser.serialize();
    res.status(200).json(SerializeUser);
  } catch (e) {
    res.status(500).json(e);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const { userId, password } = req.body;

  // util.promisify : 비동기로 돌려주는 함수를 promise로 감싸주지 않고 사용할 수 있다.
  const pbkdf2Promise = util.promisify(crypto.pbkdf2);

  // 비밀번호 암호화
  const createHashedPassword = async (password, salt) => {
    const key = await pbkdf2Promise(password, salt, 13579, 64, "sha512");
    const hashedPassword = key.toString("base64");
    return { hashedPassword, salt };
  };

  try {
    const result = await User.findOne({ userId });
    const { hashedPassword } = await createHashedPassword(
      password,
      result.salt
    );

    if (!userId && userId !== result.userId) {
      res.status(400).json("아이디가 존재하지 않습니다.");
      return;
    }

    if (hashedPassword !== result.password) {
      res.status(400).json("비밀번호가 일치하지 않습니다.");
      return;
    }

    res.status(200).json({ userId, password });
  } catch (e) {
    res.status(500).json(e);
    console.log(e);
  }
});

module.exports = router;
