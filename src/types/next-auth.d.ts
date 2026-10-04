import { JWT } from "next-auth/jwt"
import NextAuth from "next-auth"

declare module "next-auth/jwt" {

  interface JWT {
    user : User[user]
    token : string
  }
}


declare module "next-auth" {

    interface User {   // الاوبجكت اللي بيرجع من فانكشن ال api
        id : string ,
        user : {
            name : string,
            email : string,
            role : string
        },
        token : string
    }

    interface Session {
        user : User[user]
    }
}