import React from "react";
import FoodCreateContainer from "../FoodCreateContainer";
import FoodEditContainer from "../FoodEditContainer";
import FoodsListContainer from "../FoodsListContainer";

interface Props {
  userId: number;
}
export const RootContainer: React.FC<Props> = (props) => {
  return (
    <>
      <FoodsListContainer userId={props.userId} />
      <FoodCreateContainer />
      <FoodEditContainer />
    </>
  );
};
export type RootContainerProps = Props;
export default React.memo(RootContainer) as typeof RootContainer;
