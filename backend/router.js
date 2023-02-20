import { Router } from "express";
import CardsController from "./cardsController.js";
import AdminController from "./adminController.js";
import auth from "./middlewares/auth.js";

const router = new Router();

router.post("/cards", auth, CardsController.create);
router.get("/cards", CardsController.getAll);
router.get("/cards/:id", CardsController.getOne);
router.put("/cards", auth, CardsController.update);
router.delete("/cards/:id", auth, CardsController.delete);

router.post("/adminAdd", AdminController.addAdmin);
router.post("/login", AdminController.login);

export default router;
