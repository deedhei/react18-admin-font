import { Outlet } from "react-router-dom";
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import AppAside from "../../containers/AppAside";
import AppHeader from "../../containers/AppHeader";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import AppFooter from "../../containers/AppFooter";
import "@/style/layout.scss";
import { useSelector } from "react-redux";
const Index = () => {
  const layoutStyle = {
    overflow: "hidden",
    width: "calc(100%)",
    maxWidth: "calc(100%)",
  };

  const contentStyle = {
    backgroundColor: "#f0f2f5",
    padding: "0px 20px",
    minHeight: "300px",
  };
  const menuStatus = useSelector((state) => state.menuToggle.menuStatus);
  return (
    <div className="app">
      <Layout style={layoutStyle}>
        <AppAside></AppAside>
        <Layout
          style={{
            marginLeft: menuStatus ? "80px" : "200px",
            minHeight: "100vh",
          }}
        >
          <AppHeader></AppHeader>
          <CustomBreadcrumb></CustomBreadcrumb>
          <Content style={contentStyle}>
            <Outlet className="outlet"></Outlet>
          </Content>
          <AppFooter></AppFooter>
        </Layout>
      </Layout>
    </div>
  );
};

export default Index;
