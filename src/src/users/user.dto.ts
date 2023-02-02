interface UserCreation {
  email: string;
  password: string;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export { UserCreation, IUser };
