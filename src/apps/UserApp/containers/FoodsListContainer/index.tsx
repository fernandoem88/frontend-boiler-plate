import React from "react";
import { List } from "antd";
import { useServerData } from "@src/shared/providers/ApiDataContext";
import { getFoodsIds } from "../../selectors";
import FoodItemContainer from "../FoodItemContainer";

interface Props {
  userId: number;
}

export const RootContainer: React.FC<Props> = (props) => {
  const ids = useServerData(getFoodsIds);

  return (
    <List
      dataSource={ids}
      renderItem={(foodId) => <FoodItemContainer foodId={foodId} />}
    />
  );
};
export type RootContainerProps = Props;
export default React.memo(RootContainer) as typeof RootContainer;
