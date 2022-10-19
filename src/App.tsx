import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const checkHealth = async () => {
      let response = await fetch("/api/checkhealth");
      console.log(response);
    };

    checkHealth();
  }, []);
  return <div>Hello World</div>;
};

export default App;
