import React, { useRef } from "react";
import { notification, Modal, Button } from "antd";
import { useRouter } from "next/router";
import FoodEdit from "../../components/FoodEdit";
import { FoodModalMode } from "@src/shared/types";
import { useServerData } from "@src/shared/providers/ApiDataContext";
import { getFoodById } from "../../selectors";

interface Props {}
const FoodModalContainer: React.FC<Props> = (props) => {
  const router = useRouter();
  const { query } = router;
  const { mode, id, foodId } = query;
  const handleClose = () => {
    router.push(`/users/${id}`);
  };
  const handleCreate = (food: { name: string; calories: number }) => {
    console.log(food);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleClose();
      notification.success({
        message: "all done!",
        description: "food editted successfully",
        placement: "bottomRight",
      });
    }, 300);
  };

  const [loading, setLoading] = React.useState(false);
  const submitRef = React.useRef(() => {});
  const setSubmit = (submit: any) => {
    submitRef.current = submit;
  };

  const food = useServerData((s) => getFoodById(s, +foodId));

  const [inDom, setInDom] = React.useState(false);
  React.useEffect(() => {
    setInDom(true);
  }, []);
  const visible = inDom && mode === FoodModalMode.edit;

  return (
    <Modal
      onCancel={handleClose}
      title="Food Edit"
      visible={visible}
      destroyOnClose
      maskClosable={false}
      footer={[
        <Button key="cancel" onClick={handleClose}>
          cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => submitRef.current()}
        >
          edit food
        </Button>,
      ]}
    >
      <FoodEdit onSubmit={handleCreate} updateSubmit={setSubmit} food={food} />
    </Modal>
  );
};
export type FoodModalContainerProps = Props;
export default React.memo(FoodModalContainer);
