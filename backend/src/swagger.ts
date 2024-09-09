import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";

dotenv.config();
const doc = {
  info: {
    title: "API do Tiquim",
    description: "Documentação da API",
  },
  host: `${process.env.HOST}:${process.env.PORT}`,
  definitions: {
    CreateProdutoDto: {
      nome: "Martelo",
      preco: 29.0,
      estoque: 10,
    },
    UpdateProdutoDto: {
      nome: "Martelo",
      preco: 35.0,
      estoque: 5,
    },
    Produto: {
      id: "8a2053de-5d92-4c43-97c0-c9b2b0d56703",
      nome: "Bacon",
      preco: 261,
      estoque: 1,
      created_at: "2023-11-07T19:27:15.645Z",
      updated_at: "2023-11-07T19:27:15.645Z",
    },
    ChangeLangDto: {
      lang: "pt-BR",
    },
    CreateUsuarioDto: {
      nome: "Allan",
      email: "aca@gmail.com",
      senha: "admin123",
    },
    UpdateUsuarioDto: {
      nome: "Allan",
      email: "aca@gmail.com",
      senha: "admin123",
    },
    QuantidadeCompra: {
      quantidade: 2,
    },
    Usuario: {
      id: "446df175-5adc-4290-b084-d6a7be2fbf7d",
      nome: "Dr. Marion Barrows",
      email: "Brigitte_Bartoletti@yahoo.com",
      senha: "$2a$10$w.yG6xAQOiDeDJfMK07p9Oz/q7dXY81D8p4rW0L5KKGhSYZS5CVwS",
      tipo_usuario_id: "399012f7-a62a-4a67-84de-c77deab96b71",
      created_at: "2024-05-02T02:16:16.190Z",
      updated_at: "2024-05-02T02:16:16.190Z",
    },
    CompraDto: {
      id: "0b86ebc5-b012-46dd-9081-2896556eaabb",
      usuario_id: "0b4600b5-68cf-40fa-9af0-d5f9a7e0d410",
      produto_id: "9eebd43e-8feb-4306-bdaf-2887814a9c62",
      quantidade: 4,
    },
    Compra: {
      id: "0b86ebc5-b012-46dd-9081-2896556eaabb",
      usuario_id: "0b4600b5-68cf-40fa-9af0-d5f9a7e0d410",
      produto_id: "9eebd43e-8feb-4306-bdaf-2887814a9c62",
      quantidade: 4,
      created_at: "2024-05-06T04:49:55.331Z",
      updated_at: "2024-05-06T04:49:55.331Z",
    },
    LoginDto: {
      email: "Richie74@yahoo.com",
      senha: "admin123",
    },
  },
};
const outputFile = "./swagger-output.json";
const routes = ["./src/router/index.ts"];
swaggerAutogen()(outputFile, routes, doc);
