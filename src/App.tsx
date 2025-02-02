import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/router";

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <RouterProvider router={router} />;
    </div>
  );
}

export default App;
