import bcrypt, { hash } from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
};

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExits = await checkUserEmail(email);

            if (isExits) {
                let user = await db.User.findOne({
                    attributes: ["email", "roleId", "password"],
                    where: { email: email },
                    raw: true,
                });
                if (user) {
                    let check = await bcrypt.compareSync(
                        password,
                        user.password
                    );
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "Ok";
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`;
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exits in your system. Pls try other email`;
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
};

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};

let getAllUser = (userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = "";
            if (userid === "All") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ["password"],
                    },
                });
            }
            if (userid && userid !== "All") {
                users = await db.User.findOne({
                    where: { id: userid },
                    attributes: {
                        exclude: ["password"],
                    },
                });
            }
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email is exits ???
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage:
                        "Your email is already in used, Plz try another email!",
                });
            }

            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === "1" ? true : false,
                roleId: data.roleId,
            });

            resolve({
                errCode: 0,
                errMessage: "OK",
            });
        } catch (error) {
            reject(error);
        }
    });
};

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: id },
        });

        if (!user) {
            resolve({
                errCode: 2,
                errMessage: `The user isn't exist`,
            });
        }

        // await user.destroy();

        await db.User.destroy({
            where: { id: id },
        });

        resolve({
            errCode: 0,
            errMessage: "The user is deleted",
        });
    });
};

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameters!",
                });
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                // await db.User.save({
                //     firstName: data.firstName,
                //     lastName: data.lastName,
                //     address: data.address,
                // });

                await user.save();

                resolve({
                    errCode: 0,
                    errMessage: "Update the user succeeds!",
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "User's not found!",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
};
