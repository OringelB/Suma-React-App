import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const UserList = () => {

    const[userdata,userdatachange]=useState(null);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("/user/details/" + id);
    }

    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:5244/api/users/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    useEffect(() => {
        fetch("http://localhost:5244/api/users").then((res) => {
            return res.json();
        }).then((resp) => {
            userdatachange(resp);

        }).catch((err) => {
            console.log(err.message);
        })

    }, [])
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Suma</h2>
                </div>
                <div className="card-body">
                <div className="divbtn">
                        <Link to="user/create" className="btn btn-success">Add New (+)</Link>
                </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <td>ID</td>
                            <td>UserName</td>
                            <td>Email</td>
                            <td>Action</td>
                        </thead>
                        <tbody>
                        {userdata &&
                                userdata.map(item => (
                                    <tr key={item.UserId}>
                                        <td>{item.UserId}</td>
                                        <td>{item.UserName}</td>
                                        <td>{item.Email}</td>
                                        <td>
                                        <a onClick={() => { LoadDetail(item.UserId) }} className="btn btn-primary">Details</a>
                                        <a onClick={() => { Removefunction(item.UserId) }} className="btn btn-danger">Remove</a>
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
export default UserList;