const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        userId : {
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
            type : String,
            require : true
        },
        profilePic : {
            type : String,
            default : "",
        },
    },
    {timestamps : true}
);

UserSchema.methods.serialize = function() {
    const data = this.toJSON();
    delete data.salt;
    delete data.password;
    return data;
}

module.exports = mongoose.model("User", UserSchema);