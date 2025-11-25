import fs from "fs";
import { v4 as uuidv4 } from "uuid";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  getAll = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    }
    return [];
  };

  create = async () => {
    const cart = {
      id: uuidv4(),
      products: []
    };

    const carts = await this.getAll();
    carts.push(cart);

    await fs.promises.writeFile(this.path, JSON.stringify(carts));
    return cart;
  };

  getById = async (id) => {
    const carts = await this.getAll();
    const cart = carts.find((c) => c.id === id);
    if (!cart) throw new Error("Cart not found");
    return cart;
  };

  addProduct = async (cid, pid) => {
    const carts = await this.getAll();
    const cart = await this.getById(cid);

    const existing = cart.products.find((p) => p.product === pid);

    if (existing) {
      existing.quantity++;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    const updated = carts.map((c) => (c.id === cid ? cart : c));

    await fs.promises.writeFile(this.path, JSON.stringify(updated));

    return cart;
  };
}

export const cartManager = new CartManager("./data/carts.json");