import React from "react";
import { Form, Input, Button, Select, Modal, AutoComplete } from "antd";
import * as sc from "./styled";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 24 },
};

const autocompleOptions = [
  { value: "Banana" },
  { value: "Apple" },
  { value: "Bilolo" },
];

interface Props {
  onSubmit: (food: { name: string; calories: number }) => void;
  updateSubmit: (onSubmit: () => void) => void;
}

export const FoodCreate: React.FC<Props> = (props) => {
  const [form] = Form.useForm();
  const [foodName, setfoodName] = React.useState("");

  React.useEffect(() => {
    props.updateSubmit(form.submit);
    return () => {
      props.updateSubmit(() => {});
    };
  }, []);

  const onFinish = (values: any) => {
    props.onSubmit(values);
  };

  const onReset = React.useCallback(() => {
    form.resetFields();
  }, [form]);

  const onChange = (value: string) => {
    setfoodName(value);
  };
  const onSelect = (value: string) => {
    console.log("seleted value", value);
  };
  const onSearch = (searchText: string) => {
    console.log("filter options");
  };

  return (
    <Form
      {...layout}
      form={form}
      name="food-form"
      onFinish={onFinish}
      layout="vertical"
    >
      <sc.FormContent>
        <sc.FormItem name="name" label="Name" rules={[{ required: true }]}>
          <AutoComplete
            value={foodName}
            options={autocompleOptions}
            onSelect={onSelect}
            onSearch={onSearch}
            onChange={onChange}
            placeholder="enter a food"
          />
        </sc.FormItem>
        <sc.FormItem
          name="calories"
          label="Calories"
          rules={[{ required: true }]}
        >
          <Input type="number" min={1} />
        </sc.FormItem>
        <sc.FormItem>
          <Button htmlType="button" type="link" onClick={onReset}>
            Reset
          </Button>
          ,
        </sc.FormItem>
      </sc.FormContent>
    </Form>
  );
};

export default React.memo(FoodCreate) as typeof FoodCreate;
