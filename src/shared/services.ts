import qs from "qs";
import { API_URL, NEXT_URL } from "./configs";
import {
  FoodBackend,
  FetchedType,
  UserBackend,
  RoleBackend,
  Food,
} from "./types";

const throwError = (response: any) => {
  if (!response.ok) {
    const err = { message: response.statusText, status: response.status };
    throw err;
  }
};

const throwSanitizedError = (error: any) => {
  throw {
    message: error?.message || "something went wrong!",
    status: error?.status || 500,
  };
};

export const fetchUsers = async () => {
  try {
    const resp = await fetch(`${API_URL}/api/users`);
    throwError(resp);
    const data: any[] = await resp.json();
    const users = data.map(
      ({ id, username }: { id: number; username: string }) => {
        return { id, username };
      }
    );

    return users;
  } catch (error) {
    throwSanitizedError(error);
  }
};

export type UserRoleResponse = FetchedType<typeof fetchUserRole>;
export const fetchUserRole = async (userId: number) => {
  try {
    const resp = await fetch(
      `${API_URL}/api/users-permissions/roles/${userId}`
    );
    throwError(resp);
    const { role } = await resp.json();
    const { type, description } = role;
    return { role: { type, description } };
  } catch (error) {
    throwSanitizedError(error);
  }
};

export type AllFoodsResponse = FetchedType<typeof fetchAllFoods>;
export const fetchAllFoods = async () => {
  try {
    const resp = await fetch(`${API_URL}/api/foods`);
    throwError(resp);
    const { data, meta } = await resp.json();
    const foods = data.map((f) => {
      const food = { id: f.id, ...f.attributes };
      return food;
    }) as FoodBackend[];
    const normalized = foods.reduce(
      (acc, food) => {
        const byId = { ...acc.byId };
        acc.ids.push(food.id);
        acc.byId[food.id] = food;
        return acc;
      },
      { byId: {} as { [foodId: number]: FoodBackend }, ids: [] as number[] }
    );
    return { foods: normalized, meta };
  } catch (error) {
    throwSanitizedError(error);
  }
};
export type UserFoodsResponse = FetchedType<typeof fetchUserFoods>;

export const fetchUserFoods = async (
  userId: number,
  pagination?: { start: number; limit: number }
) => {
  const queryString = qs.stringify(
    {
      // populate: "*",
      filters: {
        user: userId,
      },
      pagination,
      // sort: ["date:asc"],
      // pagination: {
      //   start: 0,
      //   limit: 2,
      // },
    },
    {
      encodeValuesOnly: true,
    }
  );
  try {
    const resp = await fetch(`${API_URL}/api/foods?${queryString}`);
    throwError(resp);
    const { data, meta } = await resp.json();
    const foods = data.map((f) => {
      const food = { id: f.id, ...f.attributes };
      return food;
    }) as FoodBackend[];

    const normalized = foods.reduce(
      (acc, food) => {
        const byId = { ...acc.byId };
        acc.ids.push(food.id);
        acc.byId[food.id] = food;
        return acc;
      },
      { byId: {} as { [foodId: number]: FoodBackend }, ids: [] as number[] }
    );

    return { foods: normalized, meta };
  } catch (error) {
    throwSanitizedError(error);
  }
};

export type UserResponse = FetchedType<typeof fetchUserById>;
export const fetchUserById = async (id: number) => {
  const queryString = qs.stringify(
    {
      populate: "role",
    },
    {
      encodeValuesOnly: true,
    }
  );
  try {
    const resp = await fetch(`${API_URL}/api/users/${id}?${queryString}`);
    throwError(resp);
    const user = await resp.json();
    return user as UserBackend & { role: RoleBackend };
  } catch (error) {
    throwSanitizedError(error);
  }
};

export type CreateFoodResponse = FetchedType<typeof createFood>;
export const createFood = async (food: {
  name: string;
  calories: number;
  user: number;
}) => {
  try {
    const resp = await fetch(`${API_URL}/api/foods`, {
      method: "POST",
      body: JSON.stringify({ data: food }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    throwError(resp);
    const { data, meta } = await resp.json();
    const createdFood: FoodBackend = { id: data.id, ...data.attributes };
    return {
      food: createdFood,
      meta,
    };
  } catch (error) {
    throwSanitizedError(error);
  }
};
