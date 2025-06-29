// lib/rag/pinecone.js
import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

export async function getPineconeIndex() {
  const indexName = process.env.PINECONE_INDEX;
  const region = process.env.PINECONE_ENVIRONMENT;

  const { indexes } = await pinecone.listIndexes();
  const indexNames = indexes.map(i => i.name);

  if (!indexNames.includes(indexName)) {
    try {
      await pinecone.createIndex({
        name: indexName,
        dimension: 1536,
        metric: 'cosine',
        spec: {
          serverless: {
            cloud: 'aws',
            region,
          },
        },
      });

      let isReady = false;
      while (!isReady) {
        const desc = await pinecone.describeIndex(indexName);
        isReady = desc.status?.ready;
        if (!isReady) await new Promise(res => setTimeout(res, 2000));
      }
    } catch (error) {
      if (
        error.name === 'PineconeConflictError' &&
        error.message.includes('already exists')
      ) {
        // Skip, index already exists
        console.log('[PINECONE] Index already exists, skipping creation');
      } else {
        throw error;
      }
    }
  }

  return pinecone.index(indexName);
}
