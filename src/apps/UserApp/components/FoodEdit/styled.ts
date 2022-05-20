import styled from "styled-components";
import { Form } from "antd";

export const FormContent = styled.div.attrs({
  "data-tbsc-name": "FoodEdit--FormContent",
})<{}>`
  max-width: 260px;
  margin: auto;
`;
FormContent.displayName = "FoodEditFormContent";

export const FormItem = styled(Form.Item).attrs({
  "data-tbsc-name": "FoodEdit--FormItem",
})<{}>``;
FormItem.displayName = "FoodEditFormItem";
