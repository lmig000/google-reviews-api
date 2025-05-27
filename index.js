import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const PLACE_ID = process.env.PLACE_ID;

console.log("Iniciando servidor...");
console.log("GOOGLE_API_KEY:", GOOGLE_API_KEY ? "Configurada" : "Não configurada");
console.log("PLACE_ID:", PLACE_ID ? PLACE_ID : "Não configurado");

app.get("/avaliacoes", async (req, res) => {
  console.log("Requisição recebida para /avaliacoes");

  if (!GOOGLE_API_KEY || !PLACE_ID) {
    console.log("Erro: Chave da API ou Place ID não configurados");
    return res.status(500).json({ error: "Chave da API ou Place ID não configurados", place_id: PLACE_ID });
  }

  try {
    console.log("Fazendo requisição à API do Google...");
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${GOOGLE_API_KEY}`
    );

    console.log("Resposta da API do Google:", response.data);

    if (response.data.status !== "OK") {
      console.log("Erro na API do Google:", response.data.status, response.data.error_message);
      return res.status(500).json({ error: `Erro na API do Google: ${response.data.status}`, details: response.data.error_message, place_id: PLACE_ID });
    }

    const reviews = response.data.result.reviews || [];
    console.log("Avaliações encontradas:", reviews.length);
    res.json(reviews);
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error.message);
    res.status(500).json({ error: "Erro ao obter avaliações do Google", details: error.message, place_id: PLACE_ID });
  }
});

app.get("/", (req, res) => {
  console.log("Requisição recebida para /");
  res.send("API online");
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 SERVIDOR ATUALIZADO rodando na porta ${PORT}`);
});
