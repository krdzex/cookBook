import mongoose from "mongoose"
import crypto from "crypto"

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        required: "Username is required",
        unique: "userName already exists",
    },
    email: {
        type: String, trim: true,
        unique: "Email already exists",
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
        required: "Email is required",
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    hashed_password: {
        type: String,
        required: "Password is required"
    },
    salt: String,
    deleted: { type: Boolean, default: false }
})

UserSchema.virtual("password").set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password)
})

UserSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function (password) {
        if (!password) return ""
        try {
            return crypto.createHmac("sha1", this.salt).update(password).digest("hex")
        } catch (error) {
            return ""
        }
    },
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + ""
    }
}

export default mongoose.model("User", UserSchema)


