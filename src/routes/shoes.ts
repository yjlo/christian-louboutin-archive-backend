import express from "express";
import * as ShoesController from "../controllers/shoes";

const router = express.Router();

router.get("/", ShoesController.getShoes);

router.get("/:shoeId", ShoesController.getShoe);

router.post("/", ShoesController.createShoe);

router.patch("/:shoeId", ShoesController.updateShoe);

router.delete("/:shoeId", ShoesController.deleteShoe);

export default router;