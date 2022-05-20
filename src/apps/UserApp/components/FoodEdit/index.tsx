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
  updateSubmit: (onSubmit: () => void) => void;
  onSubmit: (food: { name: string; calories: number }) => void;
  food: {
    id: number;
    key: string;
    name: string;
    calories: number;
  };
}

export const FoodEdit: React.FC<Props> = (props) => {
  const { calories, name } = props.food;
  const initialValues = React.useMemo(() => ({ calories, name }), [
    calories,
    name,
  ]);
  const [form] = Form.useForm();
  const [foodName, setfoodName] = React.useState(props.food.name);

  React.useEffect(() => {
    props.updateSubmit(form.submit);
    return () => {
      props.updateSubmit(() => {});
    };
  }, []);

  // React.useEffect(() => {
  //   form.setFieldsValue(initialValues);
  // }, [initialValues]);

  const onFinish = (values: any) => {
    props.onSubmit(values);
  };

  const onReset = () => {
    form.resetFields();
  };

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
    <sc.FormContent>
      <Form
        {...layout}
        form={form}
        name="food-edit"
        onFinish={onFinish}
        layout="vertical"
        initialValues={initialValues}
      >
        <sc.FormItem name="name" label="Name" rules={[{ required: true }]}>
          <AutoComplete
            // defaultValue={foodName}
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
      </Form>
    </sc.FormContent>
  );
};

export default React.memo(FoodEdit) as typeof FoodEdit;
