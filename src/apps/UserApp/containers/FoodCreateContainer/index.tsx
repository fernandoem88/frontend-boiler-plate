import React from "react";
import { notification, Modal, Button } from "antd";
import { useRouter } from "next/router";
import FoodCreate from "../../components/FoodCreate";
import { FoodModalMode } from "@src/shared/types";
import * as services from "@src/shared/services";
import { useUpdateServerData } from "@src/shared/providers/ApiDataContext";

interface Props {}
const FoodModalContainer: React.FC<Props> = (props) => {
  const router = useRouter();
  const { query } = router;
  const { mode, id: userId } = query;
  const handleClose = () => {
    router.push(`/users/${userId}`);
  };

  const updateServerData = useUpdateServerData();
  const handleCreate = async (food: { name: string; calories: number }) => {
    setLoading(true);
    try {
      await services.createFood({
        ...food,
        user: +userId,
      });
      const { foods } = await services.fetchUserFoods(+userId);
      updateServerData((prevData) => ({ ...prevData, foods }));
      setLoading(false);
      handleClose();

      notification.success({
        message: "all done!",
        description: "food added successfully",
        placement: "bottomRight",
      });
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Oooooops!",
        description: error.message,
        placement: "bottomRight",
      });
    }
  };

  const [loading, setLoading] = React.useState(false);
  const submitRef = React.useRef(() => {});
  const setSubmit = (submit: any) => {
    submitRef.current = submit;
  };

  const [inDom, setInDom] = React.useState(false);
  React.useEffect(() => {
    setInDom(true);
  }, []);

  const visible = inDom && mode === FoodModalMode.create;

  return (
    <Modal
      onCancel={handleClose}
      title="Food Create"
      destroyOnClose
      maskClosable
      visible={visible}
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
          add food
        </Button>,
      ]}
    >
      <FoodCreate onSubmit={handleCreate} updateSubmit={setSubmit} />
    </Modal>
  );
};
export type FoodModalContainerProps = Props;
export default React.memo(FoodModalContainer);
