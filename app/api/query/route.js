// app/api/query/route.js

import { NextResponse } from 'next/server';
import { ragService } from '@/lib/rag/rag-service.js';
import { generateWithGemini } from '@/lib/rag/gemini-generate.js';

export async function POST(request) {
  try {
    const { query, k = 4 } = await request.json();
    if (!query) {
      return NextResponse.json({ error: 'Missing query' }, { status: 400 });
    }

    const results = await ragService.searchSimilar(query, k);
    const context = results.map(doc => doc.metadata.pageContent || "").join("\n---\n");

    const answer = await generateWithGemini(query, context);

    return NextResponse.json({
      answer,
      contextChunks: results.length,
      sources: results.map(doc => doc.metadata.source || "Unknown"),
    });
  } catch (error) {
    console.error('[QUERY_ROUTE_ERROR]:', error);
    return NextResponse.json({ error: 'Query failed', details: error.message }, { status: 500 });
  }
}
