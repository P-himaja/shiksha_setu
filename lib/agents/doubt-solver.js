import { ragService } from '../rag/rag-service.js';

export class DoubtSolverAgent {
  async solve(question) {
    const contextDocs = await ragService.searchSimilar(question, 3);
    const answer = await ragService.generateWithContext(question, contextDocs);

    return {
      agent: 'DoubtSolver',
      response: answer,
      sources: contextDocs.map(doc => doc.metadata?.source || 'Unknown'),
    };
  }
}
