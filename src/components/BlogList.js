import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import blogService from "../services/blog.service";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    init();
  }, [])

  const init = () => {
    blogService.getAll()
      .then(response => {
        console.log('Printing the blogs', response.data);
        setBlogs(response.data);
      })
      .catch(error => {
        console.log('Something went wrong', error);
      })
  }
  const handleDelete = id => {
    blogService.remove(id)
      .then(response => {
        console.log('Blog removed successfully', response.data);
        init();
      })
      .catch(error => {
        console.log('Something went wrong', error);
      })
  }

  return (
    <div >
      <div className="container">
        <h1>List of Blogs</h1>
        <hr />
        <div>
          <Link to="/addBlog" className="btn btn-primary mb-2">Add Blog</Link>
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Likes</th>
                <th>Date</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                blogs.map(blog => (
                  <tr key={blog.id}>
                    <Link className="btn btn-info" to={`/blog/view/${blog.id}`}><td>{blog.title}</td></Link>
                    <td>{blog.description}</td>
                    <td>{blog.likes}</td>
                    <td>{blog.date}</td>
                    <td>{blog.author}</td>
                    <td>
                      <Link className="btn btn-info" to={`/blog/edit/${blog.id}`}>Update</Link>
                      <button className="btn btn-danger ml-2" onClick={(e) => {
                        handleDelete(blog.id)
                      }}>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BlogList;