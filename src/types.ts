// NOTE: the user res from the server doesn't contain pw
export type TUser = {
  id: string;
  role: string;
  name: string;
  userName: string;
  email: string;
};

// NOTE: the globally available context
export type TGlobal = {
  user: TUser | null;
  loginUser: (user: TUser) => void;
  logoutUser: () => void;
};

// NOTE: The response for successful user registeration
export type TRegister200 = {
  user: TUser;
  token: string;
};
