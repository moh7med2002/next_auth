// nextauth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
// Define a role enum
export enum Role {
  user = "user",
  admin = "admin",
}
// common interface for JWT and Session
interface IUser extends DefaultUser {
  token?: string;
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: IUser;
  }
}
