import { Router } from "express";
import CardsController from "./cardsController.js";

const router = new Router();

router.post("/cards", CardsController.create);
router.get("/cards", CardsController.getAll);
router.get("/cards/:id", CardsController.getOne);
router.put("/cards", CardsController.update);
router.delete("/cards/:id", CardsController.delete);

export default router;
