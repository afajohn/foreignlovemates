import { NextResponse } from "next/server";
import { getPricingData, insertPricingData ,  deletePricing, updatePricing } from '@/services/homepage-pricing';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const section = url.searchParams.get('section');
  try {
    const rows = await getPricingData(section || '');
    return NextResponse.json({ data: rows });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error executing query' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const section = url.searchParams.get('section');

  try {
    const body = await request.json();
    if (section === 'pricing') {
      await insertPricingData(body);
      return NextResponse.json({
        message: 'Records inserted successfully',
      });
    }
      return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
  } catch (error) {
    console.error('Error inserting record:', error);
    return NextResponse.json({
      error: 'Error inserting record',
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const section = url.searchParams.get('section');
  const priceId = url.searchParams.get('priceId');

  try {
    if (section === 'pricing' && priceId) {
      // Call the deletePricing function
      await deletePricing(priceId);

      return NextResponse.json({
        message: 'Pricing record and related details deleted successfully',
      });
    }
      return NextResponse.json({ error: 'Invalid section or missing priceId' }, { status: 400 });
  } catch (error) {
    console.error('Error deleting record:', error);
    return NextResponse.json({ error: 'Error deleting record' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const url = new URL(request.url);
  const section = url.searchParams.get('section');
  const edits = url.searchParams.get('edits') || '';

  try {
    if (section === 'pricing' ) {
      const body = await request.json();

      // Call the updatePricing function
      await updatePricing(body,edits);

      return NextResponse.json({
        message: 'Records updated successfully',
      });
    } 

  } catch (error) {
    console.error('Error updating record:', error);
    return NextResponse.json({ error: 'Error updating record' }, { status: 500 });
  }
}