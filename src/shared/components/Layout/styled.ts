import { Layout, Menu, Breadcrumb } from "antd";
import styled from "styled-components";

export const Root = styled.div.attrs({
  "data-tbsc-name": "Layout--Root",
})<{}>`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: stretch;
`;
Root.displayName = "LayoutRoot";

export const LayoutSection = styled(Layout).attrs({
  "data-tbsc-name": "Layout--LayoutSection",
})<{}>`
  height: 100%;
  width: 100%;
`;
LayoutSection.displayName = "LayoutLayoutSection";

export const ContentWrapper = styled(Layout.Content).attrs({
  "data-tbsc-name": "Layout--ContentWrapper",
})<{}>`
  padding: 0 50px;
`;
ContentWrapper.displayName = "LayoutContentWrapper";

export const Logo = styled.div.attrs({
  "data-tbsc-name": "Layout--Logo",
})<{}>`
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;
Logo.displayName = "LayoutLogo";

export const Sider = styled(Layout.Sider).attrs({
  "data-tbsc-name": "Layout--Sider",
})<{}>`
  width: 200px;
  background: #fff;
`;
Sider.displayName = "LayoutSider";

export const Footer = styled(Layout.Footer).attrs({
  "data-tbsc-name": "Layout--Footer",
})<{}>`
  width: 100%;
  text-align: center;
`;
Footer.displayName = "LayoutFooter";

export const ToolsBar = styled.div.attrs({
  "data-tbsc-name": "Layout--ToolsBar",
})<{}>`
  display: flex;
  & > :first-child {
    flex-grow: 1;
  }
`;
ToolsBar.displayName = "LayoutToolsBar";

export const ActionsWrapper = styled.div.attrs({
  "data-tbsc-name": "Layout--ActionsWrapper",
})<{}>`
  display: flex;
  width: auto;
  justify-content: center;
  align-items: center;
`;
ActionsWrapper.displayName = "LayoutActionsWrapper";

export const Content = styled(Layout.Content).attrs({
  "data-tbsc-name": "Layout--Content",
})<{}>`
  padding: 24px;
  margin: 0;
  min-height: 280px;
  overflow-y: auto;
  background: white;
`;
Content.displayName = "LayoutContent";
