import { NextResponse } from 'next/server';
import { ragService } from '@/lib/rag/rag-service';
import pdfParse from 'pdf-parse';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    // Validate file
    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No valid file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text from PDF
    const pdf = await pdfParse(buffer);
    const text = pdf.text;

    // Send to existing ragService
    const result = await ragService.ingestDocument(text, {
      source: file.name || 'uploaded-pdf',
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('[UPLOAD_ROUTE_ERROR]:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
