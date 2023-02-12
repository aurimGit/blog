import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import blogService from "../services/blog.service";
import { Link, useParams } from "react-router-dom";



const Blogtits = () => {

        const [, setBlogs] = useState([]);
    
        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');
        const [likes, setLikes] = useState('');
        const [date, setDate] = useState('');
        const [author, setAuthor] = useState('');
        const { id } = useParams();
    
        const blog = { title, description, likes, date, author, id };
    
        useEffect(() => {
            if (id) {
                blogService.get(id)
                    .then(blog => {
                        setTitle(blog.data.title);
                        setDescription(blog.data.description);
                        setLikes(blog.data.likes);
                        setDate(blog.data.date);
                        setAuthor(blog.data.author);
                    })
                    .catch(error => {
                        console.log('something went wrong', error);
                    });
            }
        }, [id])
    
        useEffect(() => {
            init();
        }, [])
    
        const init = () => {
            blogService.getAll()
                .then(response => {
                    console.log('Printing the people', response.data);
                    setBlogs(response.data);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    
        return (
            <div className="container">
                <h3>Profile of someone</h3>
                <hr />
                <div className="container">
                    <p>title: {blog.title}</p>
                    <p>description: {blog.description}</p> 
                    <p>date :{blog.date}</p>
                    <p> likes  : {blog.likes}</p>
                    <p> author:    {blog.author}</p>
                </div>
                
    
                <hr />
                <Link className="btn btn-primary" to="/blogs">Back to List</Link>
            </div>
        )
    }

export default Blogtits;