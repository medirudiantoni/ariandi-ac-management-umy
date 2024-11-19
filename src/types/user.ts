export type Role = {
  id: number;
  title: string;
  users: UserWithRole[];
};

export type RoleSesssion = {
  id: number;
  username: string;
  email: string;
  role: string;
};

type UserWithRole = {
  id: number;
  username: string;
  email: string;
  password: string;
  image?: string | null;
  role: Role;
};

export default UserWithRole;
