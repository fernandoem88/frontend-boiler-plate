import React from "react";
import { useRouter } from "next/router";
import UserApp from "@src/apps/UserApp";
import * as services from "@src/shared/services";
import Layout from "@src/shared/components/Layout";
import { FetchedType } from "@src/shared/types";
import { Button } from "antd";

interface Props {
  data: ServerData;
  error?: any;
}
const ManagerPage: React.FC<Props> = (props) => {
  const router = useRouter();
  const paths = [{ label: "managers", link: "/" }, props.data.user.username];

  const onAddFoodClick = () => {
    const { id } = router.query;
    router.push(`/users/${id}?mode=create`);
  };

  const actions = (
    <>
      <Button disabled={!!props.error} onClick={onAddFoodClick}>
        add new food
      </Button>
    </>
  );

  return (
    <Layout
      error={props.error}
      paths={paths}
      actions={actions}
      title="User dashboard"
    >
      <UserApp userId={+router.query.id} />
    </Layout>
  );
};
export type ManagerPageProps = Props;
export default React.memo(ManagerPage);

type ServerData = FetchedType<typeof getServerSideProps>["props"]["data"];
export const getServerSideProps = async (ctx: any) => {
  const { id } = ctx.query;

  try {
    const user = await services.fetchUserById(id);

    const isManager = user.role?.name === "manager";

    if (!isManager) {
      return {
        redirect: {
          permanent: false,
          destination: "/users/" + id,
        },
      };
    }

    const { foods, meta: foodsMeta } = await services.fetchUserFoods(user.id);
    const data = {
      user,
      foods,
      foodsMeta,
    };

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: { message: error?.message, status: error?.status || 500 },
      },
    };
  }
};
