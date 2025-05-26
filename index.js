const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const PLACE_ID = process.env.PLACE_ID;

app.use(cors());

app.get("/avaliacoes", async (req, res) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating&key=${GOOGLE_API_KEY}`;
    const response = await axios.get(url);
    const reviews = response.data.result.reviews;
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro ao obter avaliações do Google");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
