import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    // Log the form data to console
    console.log('=== New Registration ===');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Timestamp:', new Date().toISOString());
    console.log('=======================');

    // Simulate API processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful',
        data: { name, email, phone },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing registration:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process registration',
      },
      { status: 500 }
    );
  }
}

