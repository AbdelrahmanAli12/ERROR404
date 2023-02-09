import {
  Layout,
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Breadcrumb,
  Menu,
  Image,
} from "antd";
const { Header, Footer, Sider, Content } = Layout;

const MainHeader = () => {
  <Header theme="light">
    <Image width={200} src={require("../images/logo.png")}></Image>
  </Header>;
};

export default MainHeader;
