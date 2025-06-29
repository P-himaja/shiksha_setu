import { ragService } from '../rag/rag-service.js';

export class ApplicationGeneratorAgent {
  async generate(topic, level = 'high school') {
    const query = `${topic} real-life applications for ${level} students`;
    const contextDocs = await ragService.searchSimilar(query, 3);
    const answer = await ragService.generateWithContext(query, contextDocs);

    return {
      agent: 'ApplicationGenerator',
      response: answer,
      sources: contextDocs.map(doc => doc.metadata?.source || 'Unknown'),
    };
  }
}
