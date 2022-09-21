const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const util = require("util");

//REGISTER
router.post("/register", async(req, res)=>{

    try{

        // util.promisify : 비동기로 돌려주는 함수를 promise로 감싸주지 않고 사용할 수 있다.
        const randomBytesPromise = util.promisify(crypto.randomBytes);
        const pbkdf2Promise = util.promisify(crypto.pbkdf2);

        const createSalt = async () => {
            const buf = await randomBytesPromise(64);
            return buf.toString("base64");
        };

        const createHashedPassword = async (password) => {
            const salt = await createSalt();
            const key = await pbkdf2Promise(password, salt, 13579, 64, 'sha512');
            const hashedPassword = key.toString("base64");
            return{ hashedPassword, salt};
        };
        const { hashedPassword, salt } = await createHashedPassword(req.body.password);

            const newUser = new User({
                username : req.body.username,
                email : req.body.email,
                password : hashedPassword,
                salt : salt
            });
            const user = await newUser.save();
            res.status(200).json(user);
    } catch (e) {
        res.status(500).json(e);
        console.log(e);
    }

});

//LOGIN
router.post("/login", async(req, res) => {
    try{
        const user = await User.findOne({username : req.body.username});
        !user && res.status(400).json("Wrong credentials!");

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong credentials!");

        const { password, ...others} = user._doc;
        res.status(200).json(others);
    }catch(e){
        res.status(500).json(e);
    }
})

module.exports = router;