import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import personService from "../services/person.service";

const PersonList = () => {
  const [persons, setPersons] = useState ([]);

  useEffect (() =>{
      init();
  }, [])

  const init = () => {
      personService.getAll()
      .then(response => {
          console.log('Printing the persons', response.data);
          setPersons(response.data);
      })
      .catch(error => {
          console.log('Something went wrong', error);
      })
  }

    return (
        <div >
          <div className="container">
          <h1>List of People</h1>
          <hr/>
          <div>
            <Link to="/addPerson" className="btn btn-primary mb-2">Add Person</Link>
            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {
                persons.map(person => (
                  <tr key={person.id}>
                    <td>{person.firstName}</td>
                    <td>{person.lastName}</td>
                    <td>{person.phoneNumber}</td>
                    <td>{person.email}</td>
                    <td>
                      <Link className="btn btn-info" to={`/person/view/${person.id}`}>View profile</Link>
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
    
    export default PersonList;