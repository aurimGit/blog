import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import personService from "../services/person.service";

const AddPerson = () => {

    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[phoneNumber, setPhoneNumber] = useState('');
    const[email, setEmail] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    const savePerson = (e) => {
        e.preventDefault();

        const person = {firstName, lastName, phoneNumber, email, id};
        if (id) {
            personService.update(person)
            .then(response => {
                console.log('Person Updated successfully', response.data);
                navigate('/persons');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });

        } else {

            personService.create(person)
            .then(response => {
                console.log("Person added successfully", response.data);
                navigate('/persons');
            })
            .catch(error => {
                console.log('something went wrong', error)
            });
        }
    }

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
    }, [id] )

    return(
        <div className="container">
            <h3>Create person</h3>
            <hr/>
            <form>
                
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control col-4"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="enter first Name"
                    />

                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control col-4"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="enter lastName"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control col-4"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="enter phone Number"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control col-4"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="enter email"
                    />
                </div>
                <div>
                    <button className="btn btn-primary" onClick={(e) => savePerson(e)}>Save</button>
                </div>
            </form>
            <hr/>
            <Link className="btn btn-primary" to="/persons">Back to List</Link>
        </div>
    )
}

export default AddPerson;