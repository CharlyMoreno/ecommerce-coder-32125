const mongoose = require("mongoose");
const supertest = require("supertest");
const { expect } = require("chai");
const { generar } = require("./generador/productos.js");
const { app } = require("../server/app");
require("dotenv").config();

let request;
let server;

describe("TEST APIREST PRODUCTOS", () => {
  let productId;
  before(async function () {
    await connectDb();
    server = await startServer();
    request = supertest(
      `http://localhost:${server.address().port}/api/productos`
    );
  });

  after(function () {
    mongoose.disconnect();
    server.close();
  });

  describe("GET", () => {
    it("debería retornar un status 200", async () => {
      const response = await request.get("/");
      expect(response.status).to.eql(200);
    });
  });

  describe("POST", () => {
    it("debería incorporar un nuevo producto", async () => {
      let producto = generar();
      console.log("Console.log producto para prueba", producto);
      const response = await request.post("/").send(producto);
      expect(response.status).to.eql(200);
      const prod = response.body;
      expect(prod).to.include.keys("nombre", "precio");
      expect(prod.nombre).to.eql(producto.nombre);
      expect(prod.precio).to.eql(Number(producto.precio));
      expect(prod.descripcion).to.eql(producto.descripcion);
      expect(prod.codigo).to.eql(producto.codigo);
      expect(prod.foto).to.eql(producto.foto);
      expect(prod.stock).to.eql(Number(producto.stock));
      productId = prod._id;
      console.log(productId);
    });
  });

  describe("GET BY ID", () => {
    it("debería retornar el producto recientemente creado", async () => {
      const response = await request.get(`/${productId}`);
      expect(response.status).to.eql(200);
    });
  });

  describe("PUT", () => {
    it("debería modificar el producto", async () => {
      const productoModificado = {
        nombre: "NOMBRE MODIFICADO",
      };
        // HACER PUT AL PRODUCTO
      const response = await request.put(`/${productId}`).send(productoModificado);
      expect(response.status).to.eql(200);

      // GETEAR PRODUCTO MODIFICADO
      const responseGet = await request.get(`/${productId}`)
      expect(responseGet.status).to.eql(200);

      const prod = responseGet.body;

      expect(prod.nombre).to.eql(productoModificado.nombre);
    });
  });

  describe("DELETE BY ID", () => {
    it("Deberia eliminar el producto", async () => {
      const response = await request.delete(`/${productId}`);
      expect(response.status).to.eql(200);
    });
  });

});

async function connectDb() {
  try {
    const mongoDB = process.env.MONGOURL
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Base de datos conectada!");
  } catch (error) {
    throw new Error(`Error de conexión en la base de datos: ${err}`);
  }
}

async function startServer() {
  return new Promise((resolve, reject) => {
    const PORT = 0;
    const server = app.listen(PORT, () => {
      console.log(
        `Servidor express escuchando en el puerto ${server.address().port}`
      );
      resolve(server);
    });
    server.on("error", (error) => {
      console.log(`Error en Servidor: ${error}`);
      reject(error);
    });
  });
}