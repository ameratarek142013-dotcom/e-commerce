import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {

    const token = await getToken({req : request})

    if (token) {
        return NextResponse.next()
    }
    else{
        return NextResponse.redirect(new URL('/login', request.url))
    }

}




export const config = {
    matcher: ['/cart' ,'/washlist' , '/profile/addresses' , '/allorders' ,  '/profile/settings' , '/checkout'],
}