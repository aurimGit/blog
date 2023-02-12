import { Route, Routes } from "react-router-dom";
import BlogList from "./components/BlogList";
import AddBlog from "./components/AddBlog"
import Category from "./components/Catergory";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import Menu from "./components/Menu"
import Navbar from "./Navbar";
import PersonList from "./components/PersonList";
import AddPerson from "./components/AddPerson";
import Person from "./components/Person";
import BlogPost from "./components/BlogPost";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/addBlog" element={<AddBlog />} />
          <Route path="/blog/view/:id" element={<BlogPost />} />
          <Route path="/blog/edit/:id" element={<AddBlog />} />
          <Route path="/persons" element={<PersonList />} />
          <Route path="/addPerson" element={<AddPerson />} />
          <Route path="/person/edit/:id" element={<AddPerson />} />
          <Route path="/person/view/:id" element={<Person />} />
          <Route path="/category" element={<Category />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App