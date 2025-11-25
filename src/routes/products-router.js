import { Router } from "express";
import { productManager } from "../manager/product-manager.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getById(pid);
    res.json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = await productManager.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const updated = await productManager.update(req.body, pid);
    res.json(updated);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const deleted = await productManager.delete(pid);
    res.json(deleted);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;