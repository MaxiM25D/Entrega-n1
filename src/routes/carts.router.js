import { Router } from "express";
import { cartManager } from "../manager/cart-manager.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const cart = await cartManager.create();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getById(cid);
    res.json(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updated = await cartManager.addProduct(cid, pid);
    res.json(updated);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;