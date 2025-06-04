// app/api/google-news/technology/route.ts

export async function GET() {
    const url = 'https://google-news13.p.rapidapi.com/technology?lr=en-US';
  
    const headers = {
      'x-rapidapi-key': 'fa8fd44fa4msh5b6d98cad679c89p1a1257jsn48e563dce09c',
      'x-rapidapi-host': 'google-news13.p.rapidapi.com',
    };
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
        next: { revalidate: 0 }, // prevent caching
      });
  
      if (!response.ok) {
        return new Response(JSON.stringify({ error: 'Failed to fetch technology news' }), {
          status: response.status,
        });
      }
  
      const data = await response.json();
  
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error fetching technology news:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
      });
    }
  }
  