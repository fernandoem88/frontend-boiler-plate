import { UserFoodsResponse } from "@src/shared/services";

type State = UserFoodsResponse;

export const getFoodsIds = (state: State) => state.foods.ids;
export const getFoodById = (state: State, id: number) => state.foods.byId[id];
