import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import Notes from "./pages/Notes";
import Login from "./pages/Login";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>

      <Routes>

<Route path="/login" element={<Login />} />

<Route element={<ProtectedRoute />}>
  <Route path="/" element={<Notes />} />
</Route>

</Routes>

      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;