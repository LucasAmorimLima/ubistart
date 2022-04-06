import { JwtPayload } from "jsonwebtoken"

export interface AccessToken {
    sign (userId: number, administrator: boolean): Promise<string>
    verify (token: string): Promise<string | JwtPayload>
  }
  