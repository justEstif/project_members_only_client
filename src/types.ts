/**
 * @type user
 */
export type TUser = {
  id: string;
  role: string;
  name: string;
  userName: string;
  email: string;
};

/**
 * @type value in zustand store
 */
export type TGlobal = {
  auth: TAuth200 | null;
  login: (user: TAuth200) => void;
  logout: () => void;
};

/**
 * @type valid user regiser or login response
 */
export type TAuth200 = {
  user: TUser;
  token: string;
};

/**
 * @type invalid response
 */
export type TAuth400 = {
  error: string;
};

/**
 * @type message
 */
export type TMessage = {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: true;
    userName: true;
  };
};
