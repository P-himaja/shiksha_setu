import { DoubtSolverAgent } from './doubt-solver.js';
import { ApplicationGeneratorAgent } from './app-generator.js';
import { LessonPlannerAgent } from './lesson-planner.js';

export class AgentOrchestrator {
  constructor() {
    this.doubtSolver = new DoubtSolverAgent();
    this.appGen = new ApplicationGeneratorAgent();
    this.lessonPlanner = new LessonPlannerAgent();
  }

  async routeQuery(query, type, context = {}) {
    switch (type) {
      case 'doubt':
        return await this.doubtSolver.solve(query);
      case 'application':
        return await this.appGen.generate(query, context.level);
      case 'lesson':
        return await this.lessonPlanner.create(query, context.grade);
      default:
        throw new Error(`Unknown query type: ${type}`);
    }
  }
}
