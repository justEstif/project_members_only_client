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
  auth: TAuth200 | null;
  login: (user: TAuth200) => void;
  logout: () => void;
};

// NOTE: The response for successful user registeration
export type TAuth200 = {
  user: TUser;
  token: string;
};

// NOTE: The response for unsuccessful user registeration
export type TAuth400 = {
  error: string;
};
