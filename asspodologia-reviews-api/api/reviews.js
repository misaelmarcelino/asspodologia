const CACHE_TTL = 1000 * 60 * 60 * 6; // 6 horas
let cache = {
  timestamp: 0,
  data: null
};

export default async function handler(req, res) {

  // 🔓 CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  try {
    if (cache.data && Date.now() - cache.timestamp < CACHE_TTL) {
      return res.status(200).json(cache.data);
    }

    const placeId = process.env.GOOGLE_PLACE_ID;
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!placeId || !apiKey) {
      return res.status(500).json({ error: "Configuração ausente" });
    }

    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${placeId}` +
      `&fields=rating,reviews` +
      `&language=pt-BR` +
      `&key=${apiKey}`;

    const response = await fetch(url);
    const json = await response.json();

    if (!json.result || !json.result.reviews) {
      return res.status(404).json({ error: "Nenhuma avaliação encontrada" });
    }

    const reviews = json.result.reviews.map(r => ({
      author: r.author_name,
      rating: r.rating,
      text: r.text,
      time: r.relative_time_description,
      photo: r.profile_photo_url || null
    }));

    cache = {
      timestamp: Date.now(),
      data: reviews
    };

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar avaliações" });
  }
}
