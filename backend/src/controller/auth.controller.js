const bcrypt = require("bcryptjs")
const userServ = require('../services/user.service')
const mailSvc = require("../services/mailer.service")
const dotenv = require("dotenv");
dotenv.config();
const helpers = require("../utilities/helpers");
const jwt = require('jsonwebtoken');

class AuthController {
    login = async (req, res, next) => {
        try{
            let payload = req.body;
            if (!payload.email || !payload.password) {
                next({ status: 400, msg: "Credentials required" })
            }
            let userDetail = await userServ.getUserByEmail(payload.email)

            if (bcrypt.compareSync(payload.password, userDetail.password)) {

                if (userDetail.status === 'active') {
                    let accessToken = jwt.sign({
                        userId: userDetail._id
                    }, process.env.JWT_SECRET, { expiresIn: '3h' });

                    let refreshToken = jwt.sign({
                        userId: userDetail._id
                    }, process.env.JWT_SECRET, { expiresIn: '5d' });

                    res.json({
                        //  result:payload
                        result: {
                            data: userDetail,
                            token: {
                                accessToken: accessToken,
                                accessType: "Bearer",
                                refreshToken: refreshToken
                            }
                        },
                        status: true,
                        msg: "you are logged in"
                    })
                } else {
                    next({ status: 403, msg: 'Your account has not been activated yet' })
                }

            } else {
                next({ status: 400, msg: 'Credentials does not match' })
            }

        }catch(exception){
            next({ status: 400, msg: "Query exception. View console" })
        }

    }

    register = async (req, res, next) => {
        try{
            
            let registerData = req.body;
            // registerData.status = 'inactive';
            registerData.status = 'active';

            if (req.file) {
                registerData.image = req.file.filename
            }


            userServ.validatedata(registerData)

            registerData.password = bcrypt.hashSync(registerData.password, 10);
            registerData.activationToken = helpers.generateRandomString();
            

            let registerResponse = await userServ.registerUser(registerData)

            if (registerResponse) {
            let mailMsg = `Dear ${registerData.name}, <br/> Your account has been registered
            successfully. Please click the link below to activate your account:
            <a href="${process.env.FRONTEND_URL}activate/${registerData.activationToken}">"${process.env.FRONTEND_URL}activate/${registerData.activationToken}"</a>
            <br/>
            Regards,<br>
            Np-Reply, Admin
            `

            await mailSvc.sendMail(registerData.email, "Activate your account", mailMsg);

            res.json({
                result: registerData,
                msg: "user registered successfully",
                status: true
            })
        }
            else {
                next({ status: 400, msg: "user cannot be registered at this moment" })
            }

        

        }catch(exception){
            console.log(exception)
            next(exception)
        }

    }

    activateUser = async (req, res, next) => {
        try {
            let token = req.params.token;
            let userInfo = await userServ.getUserByFilter({
                activationToken: token
            })
            console.log(userInfo);

            if (!userInfo || userInfo.length <= 0) {
                throw { status: 400, msg: "Token expired or already used" }
              }
              else {
            let update = await userServ.updateUser({
                activationToken : null,
                status: "active"
            }, userInfo[0]._id)
            res.json({
                result: userInfo,
                msg: "user activated successfully",
                status: true
            })
        }

        } catch (exception) {
            console.log(exception);
            next(exception)

        }

    }

    getLoggedInUser = (req, res, next) => {
        try {
            res.json({
                result: req.authUser,
                msg: "Your detail",
                status: true

            })
        } catch (exception) {
            console.log(exception);
            next(exception)
        }

    }

    forgetPassword = async (req, res, next) => {
        try{
            console.log("Received forget password request");

            const {email} = req.body

            if (!email) {
                throw { status: 400, msg: "Email is required" };
              }

            const user = await userServ.getUserByEmail(email)

            if(!user){
                throw{status:404, msg:"User not found"}
            }
            
            const resetToken =  helpers.generateRandomString();

            await userServ.updateUser({resetToken}, user._id)

            let mailMsg = `Dear ${user.name}, <br/> You have requesteed top reset your password. Please click the link below to reset password:
            <a href="${process.env.FRONTEND_URL}reset-password/${resetToken}">"${process.env.FRONTEND_URL}reset-password/${resetToken}"</a>
            <br/>
            Regards,<br>
            Np-Reply, Admin
            `
            await mailSvc.sendMail(user.email, "Reset your password", mailMsg);
            
            res.json({
                result: user,
                msg: "Reset link sent",
                status: true
            });

        } catch(exception){
            console.log(exception);
            next(exception)
        }

    }

    resetPassword = async (req, res, next) => {
        try{
            // const {email, password} = req.body
            // const payload = req.body
            const { email, newPassword } = req.body;

            if (!email || !newPassword) {
                throw { status: 400, msg: "Email and new Password are required" };
              }
            const user = await userServ.getUserByEmail(email);

            if (!user) {
                throw { status: 400, msg: "User not found" };
              }

              let hashedPassword = bcrypt.hashSync(newPassword, 10);

              await userServ.updateUser({
                password: hashedPassword
              }, user._id)

              res.json({
                result: user,
                msg: "Password has been reset successfully",
                status: true,
              });


        }catch(exception){
            console.log(exception);
            next(exception)
        }
        

    }

}

const authCtrl = new AuthController();
module.exports = authCtrl