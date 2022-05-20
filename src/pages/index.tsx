import React from "react";

import HomePageContainer from "@src/apps/Home/containers/RootContainer";

import { fetchUsers } from "@src/shared/services";
import Layout from "@src/shared/components/Layout";

export default () => {
  return (
    <Layout
      paths={["Home"]}
      title="calorie app home"
      description="I am a specialdescription"
    >
      <HomePageContainer />
    </Layout>
  );
};

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
