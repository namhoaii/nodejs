import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        return res.render("homepage.ejs", {
            data: JSON.stringify(data),
        });
    } catch (error) {
        console.log(e);
    }
};

let getCRUD = (req, res) => {
    return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send("POST crud from server");
};

let getDisplayAllUser = async (req, res) => {
    let data = await CRUDService.getAllUser();

    return res.render("displayCRUD.ejs", {
        data: data,
    });
};

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        return res.render("editCRUD.ejs", {
            data: userData,
        });
    } else {
        return res.send("abc");
    }
};

let putEditCRUD = async (req, res) => {
    let data = req.body;
    let AllUser = await CRUDService.updateUserData(data);
    return res.render("displayCRUD.ejs", {
        data: AllUser,
    });
};

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send("Delete the user succeed!");
    }
    return res.send("abc");
};

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    getDisplayAllUser: getDisplayAllUser,
    getEditCRUD: getEditCRUD,
    putEditCRUD: putEditCRUD,
    deleteCRUD: deleteCRUD,
};
