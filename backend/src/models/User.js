import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        profilePic : {
            type : String,
            default : "",
        },
        userId : {
            type : String,
            require : true,
            uniquie : true
        },
        password : {
            type : String,
            require : true,
        },
        password_confirm : {
            type : String,
            require : true,
        },
        nickname : {
            type : String,
            require:true,
        },
        salt : {
            type : String,
            require : true
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

// UserSchema.methods.
const User = mongoose.model('User', UserSchema);
export default User;