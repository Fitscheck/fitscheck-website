import { NextResponse } from 'next/server';

export async function GET() {
  const appleTeamId = process.env.APPLE_TEAM_ID;
  
  if (!appleTeamId) {
    console.error('APPLE_TEAM_ID environment variable is not set');
    return NextResponse.json(
      { error: 'Configuration error' },
      { status: 500 }
    );
  }

  const aasa = {
    applinks: {
      apps: [],
      details: [
        {
          appID: `${appleTeamId}.com.fitscheck.app`,
          paths: [
            "/post/*",
            "/challenge/*",
            "/user/*",
            "/posts/*",
            "/challenges/*",
            "/users/*"
          ]
        }
      ]
    }
  };

  return NextResponse.json(aasa, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate, private',
    },
  });
}

