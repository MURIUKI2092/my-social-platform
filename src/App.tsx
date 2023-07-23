import { Suspense } from "react";
import AllRoutes from "./routes/AllRoutes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Suspense fallback="loading...">
        <AllRoutes />
      </Suspense>
    </Router>
  );
}

export default App;
