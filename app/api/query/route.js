import { NextResponse } from 'next/server';
import { LessonPlannerAgent } from '../../../lib/agents/lesson-planner';
import { DoubtSolverAgent } from '../../../lib/agents/doubt-solver';
import { ApplicationGeneratorAgent } from '../../../lib/agents/app-generator';

export async function POST(request) {
  try {
    const { query, type = 'doubt', grade = '10', level = 'high school' } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Missing query' }, { status: 400 });
    }

    let agent;
    let result;

    switch (type) {
      case 'lesson':
        agent = new LessonPlannerAgent();
        result = await agent.create(query, grade);
        break;

      case 'doubt':
        agent = new DoubtSolverAgent();
        result = await agent.solve(query);
        break;

      case 'application':
        agent = new ApplicationGeneratorAgent();
        result = await agent.generate(query, level);
        break;

      default:
        return NextResponse.json({ error: 'Invalid agent type' }, { status: 400 });
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('[QUERY_ROUTE_ERROR]:', error);
    return NextResponse.json({ error: 'Query failed', details: error.message }, { status: 500 });
  }
}
