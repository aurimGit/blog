import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import personService from "../services/person.service";

const Person = () => {
    const [, setPersons] = useState([]);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const person = { firstName, lastName, phoneNumber, email, id };

    useEffect(() => {
        if (id) {
            personService.get(id)
                .then(person => {
                    setFirstName(person.data.firstName);
                    setLastName(person.data.lastName);
                    setPhoneNumber(person.data.phoneNumber);
                    setEmail(person.data.email);
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
        personService.getAll()
            .then(response => {
                console.log('Printing the people', response.data);
                setPersons(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    const handleDelete = id => {
        personService.remove(id)
            .then(response => {
                console.log('Person removed successfully', response.data);
                init();
                navigate('/persons');
            })
            .catch(error => {
                console.log('Something went wrong', error);
                navigate('/persons');
            })
    }

    return (
        <div className="container">
            <h3>Profile of someone</h3>
            <hr />
            <div className="container">
                <p>{person.firstName + ' ' + person.lastName}</p>
                <p>{person.phoneNumber}</p>
                <p>{person.email}</p>
            </div>
            <div>
                <Link className="btn btn-info " to={`/person/edit/${person.id}`}>Update</Link>
                <button className="btn btn-danger ml-2" onClick={(e) => {
                    handleDelete(person.id)
                }}>Delete</button>
            </div>

            <hr />
            <Link className="btn btn-primary" to="/persons">Back to List</Link>
        </div>
    )
}

export default Person;