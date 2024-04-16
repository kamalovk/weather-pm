import { Layout } from "antd";
import './global.css'
import WeatherMain from "./Components/Weather/Weather";
import Header from "./Components/Layout/Header";

const { Content } = Layout;

const App = () => {

  return (
    <Layout>
      <Header />
      <Content style={{ padding: "24px" }}>
        <WeatherMain />
      </Content>
    </Layout>

  );
}

export default App;

