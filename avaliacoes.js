import axios from "axios";

export default async function handler(req, res) {
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "AIzaSyAEl2vqpv7Z4_R275lzoUOh4E5T0Fxgeos";
  const PLACE_ID = process.env.PLACE_ID || "ChIJ9afzi36LJA0RpJRZw7VCoaU";

  if (!GOOGLE_API_KEY || !PLACE_ID) {
    return res.status(500).json({ error: "Chave da API ou Place ID não configurados" });
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${GOOGLE_API_KEY}`,
      { timeout: 5000 }
    );

    if (response.data.status !== "OK") {
      return res.status(500).json({
        error: `Erro na API do Google: ${response.data.status}`,
        details: response.data.error_message,
      });
    }

    const reviews = response.data.result.reviews || [];
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter avaliações do Google", details: error.message });
  }
}
