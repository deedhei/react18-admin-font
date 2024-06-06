import { useEffect, useState } from "react";
import { Card, Form, Input, Button, Space, Table, Switch } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import menuApi from "../../api/menuApi";
import "@/style/view-style/menu.scss";
import { dateTimeFormat } from "../../utils";
import { IconFont } from "../../utils/createIcon";
const columns = [
  {
    title: "菜单名称",
    dataIndex: "name",
    key: "name",
    width: 180,
    fixed: "left",
    align: "center",
  },
  {
    title: "图标",
    dataIndex: "icon",
    key: "icon",
    width: 100,
    align: "center",
    render: (icon) => <IconFont type={icon}></IconFont>,
  },
  {
    title: "排序",
    dataIndex: "orderNum",
    key: "orderNum",
    width: 100,
    align: "center",
  },
  {
    title: "访问路径",
    dataIndex: "path",
    key: "path",
    width: 200,
    align: "center",
  },
  {
    title: "组件路径",
    dataIndex: "component",
    key: "component",
    width: 200,
    align: "center",
  },
  {
    title: "隐藏",
    dataIndex: "isHidden",
    key: "isHidden",
    width: 100,
    align: "center",
    render: (res) => {
      return <Switch checked={res == 1}></Switch>;
    },
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
    width: 200,
    align: "center",
    render: (time) => dateTimeFormat(time),
  },
  {
    title: "操作",
    dataIndex: "action",
    fixed: "right",
    width: 260,
    align: "center",
    render: () => (
      <Space>
        <Button type="primary">新增</Button>
        <Button type="primary">修改</Button>
        <Button danger>删除</Button>
      </Space>
    ),
  },
];

const menu = () => {
  const [menuList, setMenuList] = useState([]);
  const [form] = Form.useForm();

  Form.useWatch((values) => {
    if (values?.keywords == "") {
      getMenuList();
    }
  }, form);
  const onSearchClick = (res) => {
    getMenuList(res);
  };
  const getMenuList = async (params = {}) => {
    let res = await menuApi.getListMenu(params);
    console.log("[Log] res.data-->", res.data);
    setMenuList(res.data);
  };
  useEffect(() => {
    getMenuList();
  }, []);
  return (
    <Card>
      <div className="menuHeader">
        <Form form={form} onFinish={onSearchClick} style={{ display: "flex" }}>
          <Form.Item label="菜单名称" name="keywords">
            <Input placeholder="请输入菜单名称" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              新增
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Table
        className="table-wrapper"
        bordered={true}
        pagination={{
          pageSize: 5,
        }}
        scroll={{ x: "100%" }}
        dataSource={menuList}
        rowKey="id"
        columns={columns}
      />
    </Card>
  );
};

export default menu;
