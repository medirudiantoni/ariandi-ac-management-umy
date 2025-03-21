import { hasAccess1 } from "@/lib/access";
import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

const noAuthRoutes = ['/login', '/register'];
const onlyAdmin = ['/admin', '/settings/users'];
const accessAbleWithAuthorizationByAdmin = ['/settings/lokasi', '/settings/lokasi/lokasi-baru', '/settings/ac'];

const withAuth = (middleware: NextMiddleware, requireAuth: string[] = []) => {
    return async (req: NextRequest, next: NextFetchEvent) => {
        const pathname = req.nextUrl.pathname;
        if(requireAuth.includes(pathname)){
            const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
            if(!token){
                const url = new URL('/login', req.url);
                url.searchParams.set("callbackUrl", encodeURI(req.url));
                return NextResponse.redirect(url);
            };
            if(!hasAccess1.includes(token.role as string) && accessAbleWithAuthorizationByAdmin.includes(pathname)){
                return NextResponse.redirect(new URL('/settings', req.url));
            }
            if(token.role !== 'Admin' && onlyAdmin.includes(pathname)){
                return NextResponse.redirect(new URL('/settings', req.url));
            }
            if (token && noAuthRoutes.includes(pathname)) {
                return NextResponse.redirect(new URL('/', req.url)); // Arahkan ke halaman lain (misalnya ke home atau dashboard)
            }

            // Proses otentikasi untuk halaman yang membutuhkan otentikasi
            if (requireAuth.includes(pathname)) {
                if (!token) {
                    const url = new URL('/login', req.url);
                    url.searchParams.set("callbackUrl", encodeURI(req.url));
                    return NextResponse.redirect(url);
                }
            }
        };
        return middleware(req, next);
    }
};

export default withAuth;