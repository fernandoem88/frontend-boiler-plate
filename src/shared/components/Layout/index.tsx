import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { UserOutlined } from "@ant-design/icons";

import Head from "next/head";
import * as sc from "./styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { AppError } from "@src/shared/types";

const { Header } = Layout;

type MenuItem = ItemType & {
  link?: string;
  children?: MenuItem[];
};

interface Props {
  title?: string;
  description?: string;
  paths?: (string | { label: string; link: string })[];
  actions?: JSX.Element | JSX.Element[];
  error?: AppError | JSX.Element;
  // menu?: MenuItem[];
  // nav?: MenuItem[];
}
const DEFAULT_TITLE = "Calorie app";

const navItems: MenuItem[] = [
  {
    key: "nav_1",
    label: `nav 1`,
    link: "/nav/1",
  },
  {
    key: "nav_2",
    label: `nav 2`,
    link: "/nav/2",
  },
];

const sideMenu: MenuItem[] = [
  {
    key: `dashboard`,
    icon: React.createElement(UserOutlined),
    label: `User Options`,
    children: [
      { key: "users", label: `users`, link: "/users" },
      { key: "managers", label: `Managers`, link: "/managers" },
    ],
  },
];

const ErrorWrapper: React.FC<{
  error?: AppError | JSX.Element;
}> = ({ error, children }) => {
  if (error) {
    return "status" in error ? (
      <div>{`${error.status}: ${error.message}`}</div>
    ) : (
      error
    );
  }
  return <>{children}</>;
};

const AppLayout: React.FC<Props> = (props) => {
  const {
    title = DEFAULT_TITLE,
    description = "calorie app",
    actions = null,
    // menu,
    // nav,
  } = props;
  const router = useRouter();
  const handleMenuSelect = React.useCallback(({ item }: any) => {
    const { link } = item.props;
    if (!link) {
      console.warn("link value not provided to the menu item");
      return;
    }
    router.push(link);
  }, []);
  return (
    <sc.Root>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Layout>
        <Header className="header">
          <sc.Logo>Calories App</sc.Logo>

          {!props.error && (
            <Menu
              theme="dark"
              mode="horizontal"
              // defaultSelectedKeys={["2"]}
              items={navItems}
              onSelect={handleMenuSelect}
            />
          )}
        </Header>
        <Layout>
          <sc.Sider>
            <sc.SideMenu
              mode="inline"
              // defaultSelectedKeys={["1"]}
              defaultOpenKeys={["" + sideMenu[0].key]}
              items={sideMenu}
              onSelect={handleMenuSelect}
            />
          </sc.Sider>

          <sc.LayoutBody>
            <sc.ToolsBar>
              <sc.Paths>
                {props.paths?.map((path, index) => {
                  const label =
                    typeof path === "string" ? (
                      path
                    ) : (
                      <Link href={path.link}>{path.label}</Link>
                    );
                  return <Breadcrumb.Item key={index}>{label}</Breadcrumb.Item>;
                })}
              </sc.Paths>
              <sc.ActionsWrapper>{actions}</sc.ActionsWrapper>
            </sc.ToolsBar>

            <sc.Content>
              <ErrorWrapper error={props.error}>{props.children}</ErrorWrapper>
            </sc.Content>
            <sc.Footer>Calories app {new Date().getFullYear()}</sc.Footer>
          </sc.LayoutBody>
        </Layout>
      </Layout>
    </sc.Root>
  );
};
export type AppLayoutProps = Props;
export default React.memo(AppLayout) as typeof AppLayout;
