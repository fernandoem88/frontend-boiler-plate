import React from "react";
import Link from "next/link";
import { WarningOutlined } from "@ant-design/icons";
import Layout from "@src/shared/components/Layout";
import styled from "styled-components";

export const Root = styled.div.attrs({
  "data-tbsc-name": "Pages--Root",
})<{}>`
  text-align: center;
  margin: 100px 0 100px;

  & h1 {
    font-size: 50px;
  }
`;
Root.displayName = "PagesRoot";

interface Props {}
const NotFoundPage: React.FC<Props> = (props) => {
  return (
    <Layout
      error={
        <Root>
          <h1>
            <WarningOutlined />
            &nbsp;404
          </h1>
          <h4>Sorry, there is nothing here</h4>
          <Link href="/">Go back</Link>
        </Root>
      }
    />
  );
};
export type NotFoundPageProps = Props;
export default React.memo(NotFoundPage);
