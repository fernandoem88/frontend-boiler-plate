import React from "react";
import { List, Avatar, Button } from "antd";
import { useServerData } from "@src/shared/providers/ApiDataContext";
import { useRouter } from "next/router";
import { getFoodById } from "../../selectors";

interface Props {
  foodId: number;
}
const FoodItemContainer: React.FC<Props> = (props) => {
  const food = useServerData((s) => getFoodById(s, props.foodId));
  const router = useRouter();

  const onEditFoodClick = (foodId: number) => {
    const { id } = router.query;
    router.push(`/users/${id}/?mode=edit&foodId=${foodId}`);
  };
  return (
    <List.Item key={food.id}>
      <List.Item.Meta
        avatar={<Avatar src={"/images/event-default.png"} />}
        title={
          <Button onClick={() => onEditFoodClick(food.id)} type="link">
            {food.name}
          </Button>
        }
        description={`${food.calories} calories`}
      />
      {/* <div>{food.name}</div> */}
    </List.Item>
  );
};
export type FoodItemContainerProps = Props;
export default React.memo(FoodItemContainer);
