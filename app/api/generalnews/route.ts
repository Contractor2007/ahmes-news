import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL('https://news-api14.p.rapidapi.com/v2/search/publishers');
    url.searchParams.append('query', 'news'); // Adding required query parameter

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'fa8fd44fa4msh5b6d98cad679c89p1a1257jsn48e563dce09c',
        'x-rapidapi-host': 'news-api14.p.rapidapi.com'
      },
      next: { revalidate: 3600 } // Optional: Cache the response for 1 hour
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error: any) {
    console.error('Error fetching news publishers:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch news publishers' },
      { status: 500 }
    );
  }
}