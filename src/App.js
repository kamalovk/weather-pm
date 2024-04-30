import { Layout } from "antd";
import './global.css'
import WeatherMain from "./Components/Weather/Weather";
import Header from "./Components/Layout/Header";
import { QueryCacheProvider } from "./query/queryProvider";

const { Content } = Layout;

const App = () => {

  return (
    <QueryCacheProvider>
      <Layout>
        <Header />
        <Content style={{ padding: "24px" }}>
          <WeatherMain />
        </Content>
      </Layout>
    </QueryCacheProvider>


  );
}

export default App;

