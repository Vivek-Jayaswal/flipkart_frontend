import { RouterProvider } from "react-router-dom";
import { router } from "./router/Routes";
import { AuthInitializer } from "./router/AuthInitializer";

function App() {
  return (
    <AuthInitializer>
      <RouterProvider router={router} />
    </AuthInitializer>
  );
}

export default App;
