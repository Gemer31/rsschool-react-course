import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest): NextResponse {
  const url = request.nextUrl.clone();

  const page = url.searchParams.get('pageNumber');
  const search = url.searchParams.get('search');
  const pageSize = request.nextUrl.searchParams.get('pageSize');

  const isHaveDefaultQuery = !page || !pageSize;

  if (isHaveDefaultQuery) {
    !page && url.searchParams.set('pageNumber', '1');
    !pageSize && url.searchParams.set('pageSize', '10');
    !search && url.searchParams.set('search', '');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
