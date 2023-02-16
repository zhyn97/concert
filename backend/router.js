import { Router } from "express";
import CardsController from "./cardsController.js";
import AdminController from "./adminController.js";
import auth from "./middlewares/auth.js";
// import cors from "cors";

const router = new Router();

// const corsOptions = {
//   origin: 'http://195.133.147.210',
//   credentials: true
// }

router.post("/cards", auth, CardsController.create);
router.get("/cards", CardsController.getAll);
router.get("/cards/:id", CardsController.getOne);
router.put("/cards", auth, CardsController.update);
router.delete("/cards/:id", auth, CardsController.delete);

router.post("/adminAdd", AdminController.addAdmin);
router.post("/login", AdminController.login);

export default router;
