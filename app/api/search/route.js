import { NextResponse } from 'next/server';
import { ragService } from '@/lib/rag/rag-service';

export async function POST(req) {
  try {
    const { query, k = 5 } = await req.json();

    if (!query) {
      return NextResponse.json({ error: 'Missing query' }, { status: 400 });
    }

    const results = await ragService.searchSimilar(query, k);

    return NextResponse.json({
      results: results.map(doc => ({
        content: doc.pageContent,
        metadata: doc.metadata || {},
      })),
    });
  } catch (error) {
    console.error('[SEARCH_ROUTE_ERROR]:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
