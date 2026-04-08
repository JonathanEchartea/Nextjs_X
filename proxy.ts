import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function proxy(request: NextRequest) {
  const session = await auth()

  const { pathname } = request.nextUrl

  //Permitir siempre la página de signin
  if (pathname.startsWith("/signin")) {
    return NextResponse.next()
  }

  //Si NO hay sesión, redirigir a /signin
  if (!session) {
    const url = new URL("/signin", request.url)
    return NextResponse.redirect(url)
  }

  //Hay sesión → continuar
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
      Aplica a TODAS las rutas excepto:
      - api
      - archivos internos de Next
    */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}