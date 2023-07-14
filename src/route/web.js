import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/crud", homeController.getCRUD);
    router.post("/crud", homeController.postCRUD);

    router.get("/displayAllUser", homeController.getDisplayAllUser);
    router.get("/edit-crud", homeController.getEditCRUD);
    router.post("/edit-crud", homeController.putEditCRUD);
    router.get("/delete-crud", homeController.deleteCRUD);

    return app.use("/", router);
};

module.exports = initWebRoutes;
