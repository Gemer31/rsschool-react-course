import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const page = url.searchParams.get('pageNumber');
  const search = url.searchParams.get('search');
  const pageSize = request.nextUrl.searchParams.get('pageSize');

  const isHaveDefaultQuery = !page || !pageSize;

  if (isHaveDefaultQuery) {
    !page && url.searchParams.set('pageNumber', '1');
    !search && url.searchParams.set('search', '');
    !pageSize && url.searchParams.set('pageSize', '10');
    return NextResponse.redirect(url);
  }
}
