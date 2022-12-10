import "./App.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Select,
  Breadcrumb,
  Menu,
  Image,
  Space,
  Modal,
  Button,
} from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  SelectOutlined,
  FolderViewOutlined,
  PlusSquareOutlined,
  SearchOutlined,
  HomeOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  SettingFilled,
  FontColorsOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import MainHeader from "./components/MainHeader";
import PrimarySearchAppBar from "./components/searchBarHeader";
import ReviewNavigation from "./components/reviewComponents";
import LoginComponent from "./components/loginComponents/mainHome";
import { AppContext } from "./AppContext";

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

const App = ({ children }) => {
  const { userType } = useContext(AppContext);
  const [user, setUser] = userType;
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  let items = [];
  if (user == "instructor") {
    items = [
      getItem(<Link to="/">Home</Link>, "1", <HomeOutlined />),
      getItem(
        <Link to="/instructorDahboard">My Dahboard</Link>,
        "2",
        <HomeOutlined />
      ),
      getItem(
        <Button
          style={{ color: "white" }}
          type="link"
          onClick={() => setIsModalOpen(true)}
        >
          Login
        </Button>,
        "3",
        <LoginOutlined />
      ),

      getItem(
        <Link to="/instructorDashBoard/settings">Settings</Link>,
        "4",
        <SettingFilled />
      ),
    ];
  } else {
    items = [
      getItem(<Link to="/">Home</Link>, "1", <HomeOutlined />),
      getItem(
        <Button
          style={{ color: "white" }}
          type="link"
          onClick={() => setIsModalOpen(true)}
        >
          Login
        </Button>,
        "2",
        <LoginOutlined />
      ),

      getItem("Team", "sub2", <TeamOutlined />, [
        getItem("Ali Ghieth", "6"),
        getItem("Abdelrahman Ali", "8"),
        getItem("موهمد تامر ", "9"),
        getItem("Dina Tamer", "10"),
        getItem("Malak Amr ", "11"),
      ]),
      getItem(<Link to="/settings">Settings</Link>, "3", <SettingFilled />),
    ];
  }

  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Layout className="layout">
      <MainHeader />
      {/* <PrimarySearchAppBar /> */}
      <Layout style={{ minHeight: "90vh" }} theme="dark">
        <Sider
          width={300}
          theme="dark"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" items={items} />
        </Sider>
        <Content style={{ padding: "5%" }}>
          {children}
          <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
              <Button type="primary" onClick={handleCancel}>
                Cancel
              </Button>,
            ]}
          >
            <LoginComponent />
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
