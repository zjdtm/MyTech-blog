const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            require : true,
            uniquie : true
        },
        email : {
            type : String,
            require : true,
            uniquie : true
        },
        password : {
            type : String,
            require : true,
        },
        salt : {
            type : String
        },
        profilePic : {
            type : String,
            default : "",
        },
    },
    {timestamps : true}
);

module.exports = mongoose.model("User", UserSchema);