import fs from "fs";
import { v4 as uuidv4 } from "uuid";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  getAll = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data);
      }
      return [];
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const products = await this.getAll();
      const prod = products.find((p) => p.id === id);
      if (!prod) throw new Error("Product not found");
      return prod;
    } catch (error) {
      throw new Error(error);
    }
  };

  create = async (obj) => {
    try {
      const product = {
        id: uuidv4(),
        ...obj,
      };

      const products = await this.getAll();
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return product;
    } catch (error) {
      throw new Error(error);
    }
  };

  update = async (obj, id) => {
    try {
      const products = await this.getAll();
      let product = await this.getById(id);

      product = { ...product, ...obj };

      const updated = products.map((p) => (p.id === id ? product : p));

      await fs.promises.writeFile(this.path, JSON.stringify(updated));
      return product;
    } catch (error) {
      throw new Error(error);
    }
  };

  delete = async (id) => {
    try {
      await this.getById(id); // Valida existencia
      const products = await this.getAll();

      const newArray = products.filter((p) => p.id !== id);

      await fs.promises.writeFile(this.path, JSON.stringify(newArray));

      return `Producto con id ${id} eliminado`;
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const productManager = new ProductManager("./data/products.json");