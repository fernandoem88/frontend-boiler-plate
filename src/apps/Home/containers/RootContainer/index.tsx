import React from "react";
import { List, Avatar } from "antd";
import Link from "next/link";
import { getUsers } from "../../selectors";
import { useServerData } from "@src/shared/providers/ApiDataContext";

interface Props {}
export const RootContainer: React.FC<Props> = (props) => {
  const users = useServerData(getUsers);
  return (
    <List
      dataSource={users}
      renderItem={(user) => (
        <List.Item key={user.id}>
          <List.Item.Meta
            avatar={<Avatar src={"/images/event-default.png"} />}
            title={<Link href={`users/${user.id}`}>{user.username}</Link>}
            description={user.id}
          />
          <div>{user.username}</div>
        </List.Item>
      )}
    />
  );
};

export default RootContainer;
