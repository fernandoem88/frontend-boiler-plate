interface User {
  username: string;
  id: number;
}

interface LocalState {
  users: User[];
}

export const getUsers = (state: LocalState) => state.users;
