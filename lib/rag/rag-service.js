import { GoogleGenerativeAI } from "@google/generative-ai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { getPineconeIndex } from "./pinecone.js";
import { embedTextsWithGemini } from "./gemini-embeddings.js";
import { generateWithGemini } from "./gemini-generate.js";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class RAGService {
  async initializeStore() {
    if (!this.vectorStore) {
      this.vectorStore = await getPineconeIndex();
    }
    return this.vectorStore;
  }

  async ingestDocument(text, metadata = {}) {
    const store = await this.initializeStore();
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const chunks = await splitter.createDocuments([text], [metadata]);
    const texts = chunks.map(chunk => chunk.pageContent);
    const embeddings = await embedTextsWithGemini(texts);

const vectors = embeddings.map((values, i) => {
  const cleanMeta = {};
  const originalMeta = chunks[i].metadata;

  for (const key in originalMeta) {
    const val = originalMeta[key];
    if (
      typeof val === "string" ||
      typeof val === "number" ||
      typeof val === "boolean" ||
      (Array.isArray(val) && val.every(v => typeof v === "string"))
    ) {
      cleanMeta[key] = val;
    } else {
      cleanMeta[key] = JSON.stringify(val); // flatten objects
    }
  }

  return {
    id: `doc-${Date.now()}-${i}`,
    values,
    metadata: cleanMeta,
  };
});


    await store.upsert(vectors);
    return { success: true, chunks: vectors.length };
  }

  async searchSimilar(query, k = 5) {
    const store = await this.initializeStore();
    const [queryEmbedding] = await embedTextsWithGemini([query]);

    const results = await store.query({
      topK: k,
      vector: queryEmbedding,
      includeMetadata: true,
    });

    return results.matches.map(match => ({
      pageContent: '', // optional if you don't store text
      metadata: match.metadata || {},
    }));
  }


async generateWithContext(query, docs) {
  const context = docs.map(d => d.pageContent || '').join("\n");
  const answer = await generateWithGemini(query, context);
  return answer;
}
}

export const ragService = new RAGService();
