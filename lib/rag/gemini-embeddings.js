import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function embedTextsWithGemini(texts) {
  const model = genAI.getGenerativeModel({ model: "embedding-001" });

  const embeddings = [];

  for (const text of texts) {
    const result = await model.embedContent({
      content: { parts: [{ text }] }, // ✅ CORRECT payload
      taskType: "retrieval_document",
    });

    embeddings.push(result.embedding.values);
  }

  return embeddings;
}
