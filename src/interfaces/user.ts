export interface User {
    id: number;
    userId: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }
  
export interface Login {
    email: string;
    password: string;
  }
  
export interface Signup {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}