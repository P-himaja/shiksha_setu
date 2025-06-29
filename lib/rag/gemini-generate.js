export async function generateWithGemini(query, context = "") {
  const apiKey = process.env.GEMINI_API_KEY;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Context:\n${context}\n\nQuestion:\n${query}`,
          },
        ],
      },
    ],
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("[GEMINI_ERROR]:", errorData);
    throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();

  // Gemini returns candidates
  const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text || "No response from model.";
  return generatedText;
}
