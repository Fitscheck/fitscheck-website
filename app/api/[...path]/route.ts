import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://fitscheck-backend-5v13.onrender.com';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, 'POST');
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, 'PATCH');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, 'DELETE');
}

export async function OPTIONS(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

async function handleRequest(
  request: NextRequest,
  params: { path: string[] },
  method: string
) {
  try {
    // Reconstruct the API path
    if (!params || !params.path || params.path.length === 0) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid API path' },
        { status: 400 }
      );
    }
    
    const path = params.path.join('/');
    const searchParams = request.nextUrl.searchParams.toString();
    const url = `${BACKEND_URL}/api/${path}${searchParams ? `?${searchParams}` : ''}`;
    
    console.log(`[API Proxy] ${method} ${request.nextUrl.pathname} -> ${url}`);

    // Get headers from request
    const headers: HeadersInit = {};
    
    // Forward authorization header if present
    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    // Get content type
    const contentType = request.headers.get('content-type');
    if (contentType) {
      headers['Content-Type'] = contentType;
    }

    // Prepare request options
    const requestOptions: RequestInit = {
      method,
      headers,
    };

    // Handle request body
    if (method !== 'GET' && method !== 'DELETE') {
      // Check if it's FormData
      const contentType = request.headers.get('content-type');
      if (contentType?.includes('multipart/form-data')) {
        // For FormData, we need to get it as formData
        const formData = await request.formData();
        requestOptions.body = formData;
        // Don't set Content-Type for FormData - fetch will set it with boundary
        delete (headers as any)['Content-Type'];
      } else {
        // For JSON, get as text
        const body = await request.text();
        if (body) {
          requestOptions.body = body;
        }
      }
    }

    // Make the request to backend
    const response = await fetch(url, requestOptions);

    // Get response data
    let data;
    const responseContentType = response.headers.get('content-type');
    try {
      if (responseContentType?.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        // Try to parse as JSON if it looks like JSON
        if (text.trim().startsWith('{') || text.trim().startsWith('[')) {
          try {
            data = JSON.parse(text);
          } catch {
            data = text;
          }
        } else {
          data = text;
        }
      }
    } catch (parseError) {
      // If parsing fails, return empty object with error status
      data = { error: 'Failed to parse response' };
    }

    // Return response with same status and headers
    return NextResponse.json(data, { 
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error: any) {
    console.error(`[API Proxy Error] ${method} ${request.nextUrl.pathname}:`, error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    return NextResponse.json(
      {
        status: 'error',
        message: error.message || 'Failed to process API request',
        path: request.nextUrl.pathname,
        method,
      },
      { status: 500 }
    );
  }
}

