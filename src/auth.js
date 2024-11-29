
import CredentialProvider from 'next-auth/providers/credentials'
import UserModel from './app/utils/models/User';
import NextAuth from 'next-auth';
import DBConnection from './app/utils/config/db';

export const {auth,signIn,signOut, handlers:{GET,POST}}=NextAuth({
    providers:[
        CredentialProvider({
            name:'credentials'
           , async authorize (credentials) {
            await DBConnection();
                const user=await UserModel.findOne({
                    email:credentials?.email,
                    password:credentials?.password
                })
                if (!user) {
                    return null
                }else{
                    return {name:user.username,email:user.email,password:user.password,role:user.role}
                 }
             }
         })
     ],
     secret:process.env.SECRET_KEY,
     pages:{
         signIn:'/login'
     },
     callbacks:{
        async jwt ({token,user}) {
            if(user){
                token.userId=user.id;
                token.username=user.name;
                token.email=user.email;
                token.role=user.role
            }
            return token
        },
        async session({session,token})  {
                 session.userId=token.userId;
                 session.username=token.username;
                 session.role=token.role;
                 session.email=token.email

                 return session;
        }
       
     }
 })