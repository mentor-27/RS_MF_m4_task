type TRoutes = {
  home: string;
  login: string;
  register: string;
  note: (alias: string) => string;
};

export const internalRoutes: TRoutes = {
  home: '/',
  login: '/login',
  register: '/register',
  note: (alias: string): string => `/note/${alias}`,
};
