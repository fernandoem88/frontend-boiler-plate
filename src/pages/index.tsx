import React from "react";
import qs from "qs";
import EventItem from "@src/components/EventItem";
import Layout from "@src/components/Layout";
import Link from "next/link";
import { API_URL } from "@src/shared/config";

// export default function HomePage() {
//   const router = useRouter();
//   React.useEffect(() => {
//     const [, params] = router.asPath.split("?");
//     const qp = params ? "?" + params : "";
//     router.replace("/events" + qp);
//   }, []);
//   return null;
// }

export default function HomePage(props) {
  console.log("component props", props);
  return <div>Hello world</div>;
}

export async function getServerSideProps() {
  const queryString = qs.stringify(
    {
      populate: "*",
      filters: {
        $where: {},
      },
      sort: ["date:asc"],
      pagination: {
        start: 0,
        limit: 2,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  try {
    return {
      props: {
        serverSide: {
          data: {
            fields: { pippo: { name: "Pippo", age: 21, country: "Italy" } },
          },
        },
      },
    };
  } catch (error) {
    const message = typeof error === "string" ? error : error?.message;
    return {
      props: {
        serverSide: { error: { message: message || "something went wrong" } },
      },
    };
  }
}
