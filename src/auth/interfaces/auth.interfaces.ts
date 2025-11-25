export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
}

export interface ValidatedUser {
  id: string;
  email: string;
  name: string;
}