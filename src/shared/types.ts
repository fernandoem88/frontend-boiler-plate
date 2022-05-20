export type StrapiResponse<T = any> =
  | {
      data: T;
      meta: any;
      error: undefined;
    }
  | {
      data: undefined;
      meta: any;
      error: {
        details: {
          errors: Array<{ path: string[]; message: string; name: string }>;
        };
        message: string;
        name: string;
        status: number;
      };
    };

export interface MainPageProps<S extends Record<any, any> = {}> {
  data?: S;
  error?: { status: number; message: string };
}

export interface Food {
  id: number;
  name: string;
  calories: number;
  key: string;
}

export type WithBackendTime<T> = T & { createdAt: string; updatedAt: string };

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
}

export type UserBackend = WithBackendTime<User>;

export interface Role {
  id: number;
  name: string;
  description: string;
  type: string;
}

export type RoleBackend = WithBackendTime<Role>;

export interface FoodBackend extends Food {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export enum FoodModalMode {
  create = "create",
  edit = "edit",
}

export type FetchedType<Fn> = Fn extends (...args) => Promise<infer R>
  ? R
  : any;
