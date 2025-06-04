import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Extract query parameters if needed
    const { searchParams } = new URL(request.url);
    const playerId = searchParams.get('playerId') || '155997'; // Default to 155997 if not provided

    // Using fetch API (recommended approach)
    const url = `https://sofascore.p.rapidapi.com/players/get-all-statistics?playerId=${playerId}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key':  'fa8fd44fa4msh5b6d98cad679c89p1a1257jsn48e563dce09c',
        'x-rapidapi-host': 'sofascore.p.rapidapi.com'
      },
      // Add revalidation if needed
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error fetching player stats:', error);
    return NextResponse.json(
      { 
        message: 'Failed to fetch player statistics',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optional: Add TypeScript interfaces for better type safety
interface PlayerStatisticsResponse {
  player: {
    id: number;
    name: string;
    slug: string;
    // ... other player properties
  };
  statistics: {
    // ... statistics properties
  };
  // ... other response properties
}

// Optional: If you want to use Edge Runtime
// export const runtime = 'edge';