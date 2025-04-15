import Layout from "./ui/layout";
import Page from "./ui/page";

function App() {
  return (
    <>
      <Layout children={<Page/>}/>
    </>
  );
}

export default App;
