import { NextResponse } from 'next/server';

export async function GET() {
  const androidFingerprint = process.env.ANDROID_SHA256_FINGERPRINT;

  if (!androidFingerprint) {
    console.error('ANDROID_SHA256_FINGERPRINT environment variable is not set');
    return NextResponse.json(
      { error: 'ANDROID_SHA256_FINGERPRINT not configured' },
      { status: 500 }
    );
  }

  const assetLinks = [
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: 'com.fitscheck.app',
        sha256_cert_fingerprints: [androidFingerprint]
      }
    }
  ];

  return NextResponse.json(assetLinks, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate, private',
    },
  });
}

