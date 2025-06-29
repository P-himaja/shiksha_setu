import { ragService } from '../rag/rag-service.js';

export class DoubtSolverAgent {
  async solve(question) {
    const systemPrompt = `
You are an educational AI assistant helping students understand concepts clearly.
Answer the following question in a concise, easy-to-understand way suitable for school students.
Avoid overly technical terms unless necessary, and include examples if possible.

Question:
`;

    const enhancedQuery = `${systemPrompt}${question}`;
    const contextDocs = await ragService.searchSimilar(question, 3);
    const answer = await ragService.generateWithContext(enhancedQuery, contextDocs);

    return {
      agent: 'DoubtSolver',
      response: answer,
      sources: contextDocs.map(doc => doc.metadata?.source || 'Unknown'),
    };
  }
}
