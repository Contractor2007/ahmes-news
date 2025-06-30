import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const topic = searchParams.get('topic') || 'WORLD';
    const country = searchParams.get('country') || 'US';
    const lang = searchParams.get('lang') || 'en';
    const limit = searchParams.get('limit') || '500';

    const url = `https://real-time-news-data.p.rapidapi.com/topic-headlines?topic=${encodeURIComponent(
      topic
    )}&country=${country}&lang=${lang}&limit=${limit}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY || '',
        'x-rapidapi-host': 'real-time-news-data.p.rapidapi.com',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: 'Failed to fetch topic headlines', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('Topic Headlines API Error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error', details: err.message || err },
      { status: 500 }
    );
  }
}
