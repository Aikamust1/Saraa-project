import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Fooder";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Account from "./pages/Account";
import { AuthProvider } from "./context/AuthContext";
import SignUp from "./pages/SignUp";  
import  AddPost from "./pages/AddPost";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <main className="min-h-screen p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/add-post" element={<AddPost />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}


export default App;
