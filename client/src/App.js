import "./App.css";
import Layout from "./Layout/layout";
import { AuthProvider } from "./Components/AuthContext";
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Layout />
      </div>
    </AuthProvider>
  );
}

export default App;
