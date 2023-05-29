import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./routes/MyRoutes";

const App = ()=> {
  return (
    <BrowserRouter>
      <div className="">
        <MyRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
