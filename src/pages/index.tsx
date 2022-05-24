import React from "react";

import HomePageContainer from "@src/apps/Home/containers/RootContainer";

import { fetchUsers } from "@src/shared/services";
import Layout from "@src/shared/components/Layout";
import { FetchedType, AppError } from "@src/shared/types";

interface Props {
  data: ServerData;
  error?: AppError;
}
export default (props: Props) => {
  return (
    <Layout
      error={props.error}
      paths={["Home"]}
      title="calorie app home"
      description="I am a special description"
    >
      <HomePageContainer />
    </Layout>
  );
};

type ServerData = FetchedType<typeof getServerSideProps>["props"]["data"];
export async function getServerSideProps() {
  try {
    const users = await fetchUsers();
    const data = { users };
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        error,
      },
    };
  }
}
