const mongoose = require("mongoose");
const supertest = require("supertest");
const { expect } = require("chai");
const { generar } = require("./generador/usuarios.js");
const { app } = require("../server/app");
require("dotenv").config();

const UserServices = require('../server/services/auth.services')

let request;
let server;

describe("TEST AUTH USUARIOS", () => {
  let usuario;
  before(async function () {
    await connectDb();
    server = await startServer();
    request = supertest(
      `http://localhost:${server.address().port}`
    );
  });

  after(function () {
    mongoose.disconnect();
    server.close();
  });

  describe("GET", () => {
    it("debería retornar un status 200", async () => {
      const response = await request.get("/info");
      expect(response.status).to.eql(200);
    });
  });

  describe("REGISTER USER", () => {
    it("debería registrar un nuevo usuario", async () => {
        usuario = generar();
        console.log("Console.log usuario para prueba", usuario);
        const response = await request.post("/api/auth/register").send(usuario);
        expect(response.status).to.eql(200);
        expect(response.body).to.include.keys("message");
    });
  });

  describe("LOGIN USER", () => {
    it("debería retornar un JWT", async () => {
      const response = await request.post(`/api/auth/login`).send({username:usuario.username, password: usuario.password});
      expect(response.status).to.eql(200);
      expect(response.body).to.include.keys("token");
      console.log(`JWT: ${response.body.token}`)
      await UserServices.deleteUserByUsername(usuario.username)
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