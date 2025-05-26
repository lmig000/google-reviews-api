import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const PLACE_ID = process.env.PLACE_ID;

app.get("/avaliacoes", async (req, res) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${GOOGLE_API_KEY}`
    );
    const reviews = response.data.result.reviews || [];
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao obter avaliações do Google" });
  }
});

app.listen(PORT, () => {
console.log(`🚀 SERVIDOR ATUALIZADO rodando na porta ${PORT}`);
});
