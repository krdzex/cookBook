import User from "../models/user.model"
import errorHandler from "../helpers/dbErrorHandler"
import validateSignUp from "../validations/registar"
import validateEdit from "../validations/edit"
import _ from "lodash"

const createUser = (req, res) => {
    const { errors, isValid } = validateSignUp(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const user = new User(req.body);
    user.save((err, result) => {
        console.log(err, result)
        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json({
            message: "Successfully signed up!"
        })
    })
}

const editUser = (req, res) => {
    let id = req.params.id;
    const errors = validateEdit(req.body);
    console.log(errors)
    User.findById(id).exec((err, result) => {
        if (!result.authenticate(req.body.oldPassword)) {
            _.assign(errors, { oldPassword: "Wrong old password" })
        }
        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors)
        }
        result = _.extend(result, req.body)
        result = _.extend(result, { password: req.body.newPassword })
        console.log(result)
        result.save((err) => {
            if (err) {
                return res.status(400).json(
                    errorHandler.getErrorMessage(err)
                )
            }
            result.hashed_password = undefined;
            result.salt = undefined;
            res.json({ message: "Successfully edited user!" })
        })
    })
}

const getAuthor = (req, res) => {
    let id = req.params.id
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status("400").json({
                error: "User not found"
            })
        }
        res.json(user.userName);
    })
}

const softDelete = (req, res) => {
    let id = req.params.id
    User.findById(id).exec((err, result) => {
        result = _.extend(result, { deleted: true })
        result.save()
        res.status(200).json({ message: "Deleted" })
    })
}

export default { createUser, editUser, getAuthor, softDelete }