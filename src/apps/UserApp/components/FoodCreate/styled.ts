import styled from "styled-components";
import { Form } from "antd";

export const FormContent = styled.div.attrs({
  "data-tbsc-name": "FoodCreate--FormContent",
})<{}>`
  max-width: 260px;
  margin: auto;
`;
FormContent.displayName = "FoodCreateFormContent";

export const FormItem = styled(Form.Item).attrs({
  "data-tbsc-name": "FoodCreate--FormItem",
})<{}>``;
FormItem.displayName = "FoodCreateFormItem";
