import "./App.css"

import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home"
import Signup from "./pages/Signup";
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import UpdateProfile from "./pages/UpdateProfile";

// Hooks
import { useAuthContext } from "./hooks/useContexts/useAuthContext";

function App() {
    const {authUser} = useAuthContext();

    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path=""
                    element={authUser ? <Home/> : <Navigate to="/login"/>}
                />
                <Route 
                    path="/:username"
                    element={<Profile/>}
                />
                <Route 
                    path="/update"
                    element={authUser ? <UpdateProfile/> : ""}
                />
                <Route 
                    path="/signup"
                    element={!authUser ? <Signup/> : <Navigate to="/"/>}
                />
                <Route 
                    path="/login"
                    element={!authUser ? <Login/> : <Navigate to="/"/>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;