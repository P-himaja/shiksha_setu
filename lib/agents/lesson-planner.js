import { ragService } from '../rag/rag-service.js';

export class LessonPlannerAgent {
  async create(topic, grade = '10') {
    const query = `${topic} lesson plan for grade ${grade}`;
    const contextDocs = await ragService.searchSimilar(query, 4);
    const answer = await ragService.generateWithContext(query, contextDocs);

    return {
      agent: 'LessonPlanner',
      response: answer,
      sources: contextDocs.map(doc => doc.metadata?.source || 'Unknown'),
    };
  }
}
