import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const PLACE_ID = process.env.PLACE_ID;


app.get("/avaliacoes", (req, res) => {
  res.send("✅ Funciona!");
});


app.listen(PORT, () => {
console.log(`🚀 SERVIDOR ATUALIZADO rodando na porta ${PORT}`);
});
