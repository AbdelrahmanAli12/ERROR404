import { Layout, Image } from "antd";
const { Header } = Layout;

const MainHeader = () => {
  <Header theme="light">
    <Image width={200} src={require("../images/logo.png")}></Image>
  </Header>;
};

export default MainHeader;
