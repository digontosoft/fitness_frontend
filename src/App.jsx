import { RouterProvider } from "react-router-dom";
import { useState } from "react";
import { UserInfoContext } from "./context";
import { routes } from "./routes/Routes";
// import { routes } from "./routes/Routes";

function App() {
  const [userInfo, setUserInfo] = useState({});
  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      <RouterProvider router={routes} />
    </UserInfoContext.Provider>
    // <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
    //   <BrowserRouter>
    //     <AppRoutes />
    //   </BrowserRouter>
    // </UserInfoContext.Provider>
  );
}

export default App;
