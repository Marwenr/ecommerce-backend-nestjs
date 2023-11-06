export enum Role {
  User = 'user',
  Admin = 'admin',
  Manager = 'manager',
}

type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
};

export interface Auth {
  user: User;
  token: string;
}
