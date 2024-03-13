declare namespace Express {
  export interface Request {
    user?: string;
    token?: string;
    email?: string;
    phone?: string;
    role?: string;
    customer?: string;
    userId?: number;
    id?: number;
  }
}
