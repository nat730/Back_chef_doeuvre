declare namespace Express {
  export interface Request {
    user?: string;
    token?: string;
    email?: string;
    phone?: string;
  }
}
