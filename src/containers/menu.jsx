/**
 * 示例
 */
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  UserDeleteOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";

const menu = [
  {
    key: "/index",
    label: "首页",
    icon: <AppstoreOutlined />,
  },
  {
    label: "通用",
    key: "/public",
    icon: <ContainerOutlined />,
    children: [
      { label: "按钮", key: "/public/button", icon: "" },
      { label: "图标", key: "/public/icon", icon: "" },
    ],
  },
  {
    label: "导航",
    key: "/nav",
    icon: <DesktopOutlined />,
    children: [
      {
        label: "下拉菜单",
        key: "/nav/dropdown",
        icon: "",
        children: [
          { label: "test", key: "/nav/test", icon: <DesktopOutlined /> },
        ],
      },
      { label: "导航菜单", key: "/nav/menu", icon: "" },
      { label: "步骤条", key: "/nav/steps", icon: "" },
    ],
  },
  {
    label: "表单",
    key: "/form",
    icon: <MenuFoldOutlined />,
    children: [
      { label: "基础表单", key: "/form/base-form", icon: "" },
      { label: "步骤表单", key: "/form/step-form", icon: "" },
    ],
  },
  {
    label: "展示",
    key: "/show",
    icon: <MenuUnfoldOutlined />,
    children: [
      { label: "表格", key: "/show/table", icon: "" },
      { label: "折叠面板", key: "/show/collapse", icon: "" },
      { label: "树形控件", key: "/show/tree", icon: "" },
      { label: "标签页", key: "/show/tabs", icon: "" },
    ],
  },
  {
    label: "其它",
    key: "/others",
    icon: <PieChartOutlined />,
    children: [
      { label: "进度条", key: "/others/progress", icon: "" },
      { label: "动画", key: "/others/animation", icon: "" },
      { label: "上传", key: "/others/upload", icon: "" },
      { label: "富文本", key: "/others/editor", icon: "" },
      { label: "404", key: "/404", icon: "" },
      { label: "500", key: "/500", icon: "" },
    ],
  },
  {
    label: "多级导航",
    key: "/one",
    icon: <FieldTimeOutlined />,
    children: [
      {
        label: "二级",
        key: "/one/two",
        icon: "",
        subs: [{ label: "三级", key: "/one/two/three", icon: "" }],
      },
    ],
  },
  {
    label: "关于",
    key: "/about",
    icon: <UserDeleteOutlined />,
  },
];

export default menu;
