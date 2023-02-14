import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import blogService from "../services/blog.service";
import personService from "../services/person.service";

const AddBlog = () => {

    const [title, setBlogTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [likes, setLikes] = useState('');
    const [author, setAuthor] = useState('');
    const [persons, setPersons] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        personService.getAll()
            .then(response => {
                setPersons(response.data);
            })
            .catch(error => {
                console.log('something went wrong', error);
            });
    }, []);


    const saveBlog = (e) => {
        e.preventDefault();

        const blog = { title, likes, description, date, author, id };
        if (id) {
            blogService.update(blog)
                .then(response => {
                    console.log('Blog Updated successfully', response.data);
                    navigate('/blogs');
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });

        } else {

            blogService.create(blog)
                .then(response => {
                    console.log("Blog added successfully", response.data);
                    navigate('/blogs');
                })
                .catch(error => {
                    console.log('something went wrong', error)
                });
        }
    }

    useEffect(() => {
        if (id) {
            blogService.get(id)
                .then(blog => {
                    setBlogTitle(blog.data.title);
                    setDescription(blog.data.description);
                    setDate(blog.data.date);
                    setLikes(blog.data.likes);
                    setAuthor(blog.data.author);
                })
                .catch(error => {
                    console.log('something went wrong', error);
                });
        }
    }, [id])

    return (
        <div className="container">
            <h3>Create Blog Post</h3>
            <hr />
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control col-4"
                        id="mtitle"
                        value={title}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        placeholder="enter title"
                    />
                </div>
                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control col-5"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                        rows={7}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control col-4"
                        id="likes"
                        value={likes}
                        onChange={(e) => setLikes(e.target.value)}
                        placeholder="enter Likes"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control col-4"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="enter Date"
                    />
                </div>
                <div>
                    <div className="form-group">
                        <label htmlFor="firstName">Author:</label>
                        <select
                            id="author"
                            className="form-control col-4"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        >
                            <option value="">-- Select an author --</option>
                            {persons.map(person => (
                                <option key={person.id} value={person.firstName}>{person.firstName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={(e) => saveBlog(e)}>Save</button>
                </div>
            </form>
            <hr />
            <Link className="btn btn-primary" to="/blogs">Back to List</Link>
        </div>
    )
}

export default AddBlog;
