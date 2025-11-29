import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  let response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          response = NextResponse.next({ request: { headers: request.headers } })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    }
  )

  // 1. Check Maintenance Mode
  // Note: Fetching from DB in middleware can add latency. For production, consider Edge Config or KV.
  const { data: maintenance } = await supabase.from('system_settings').select('value').eq('key', 'maintenance_mode').single()
  
  const path = request.nextUrl.pathname
  
  // 2. Get User
  const { data: { user } } = await supabase.auth.getUser()
  let role = 'student'
  if (user) {
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    role = profile?.role || 'student'
  }

  // 3. Enforce Maintenance Mode (Allow only Admin or Login/Auth pages)
  if (maintenance?.value?.enabled) {
    if (role !== 'admin' && !path.startsWith('/login') && !path.startsWith('/admin') && !path.startsWith('/_next')) {
      return new NextResponse(
        `<html><body style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;text-align:center;background:#F8F9FC;">
           <div>
             <h1 style="color:#192335;margin-bottom:10px;">Maintenance Mode</h1>
             <p style="color:#666;">${maintenance.value.message}</p>
             <p style="font-size:12px;margin-top:20px;"><a href="/login" style="color:#6a11cb">Admin Login</a></p>
           </div>
         </body></html>`,
        { status: 503, headers: { 'content-type': 'text/html' } }
      )
    }
  }

  // 4. Protected Routes
  const protectedPrefixes = ['/dashboard', '/profile', '/corsi', '/store', '/downloads', '/lezioni-live', '/admin']
  const isProtected = protectedPrefixes.some(prefix => path.startsWith(prefix))

  if (isProtected && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user && (path === '/login' || path === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // 5. Admin Route Guard
  if (path.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
