import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/crud", homeController.getCRUD);
    router.post("/crud", homeController.postCRUD);

    router.get("/displayAllUser", homeController.getDisplayAllUser);
    router.get("/edit-crud", homeController.getEditCRUD);
    router.post("/edit-crud", homeController.putEditCRUD);
    router.get("/delete-crud", homeController.deleteCRUD);

    //api
    router.post("/api/login", userController.handleLogin);
    router.get("/api/get-all-users", userController.handleGetAllUsers);
    router.post("/api/create-new-users", userController.handleCreateNewUsers);
    router.put("/api/edit-users", userController.handleEditUsers);
    router.delete("/api/delete-users", userController.handleDeleteUsers);

    return app.use("/", router);
};

module.exports = initWebRoutes;
