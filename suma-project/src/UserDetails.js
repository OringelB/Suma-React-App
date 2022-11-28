import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from 'moment'


const UserDetails = () => {
    const { userid } = useParams();
    const [userdata, userchange] = useState({});

    useEffect(() => {
        fetch("http://localhost:5244/api/users/" + userid).then((res) => {
            return res.json();
        }).then((resp) => {
            userchange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    return (
        <div >
            {/* <div className="row">
                <div className="offset-lg-3 col-lg-6"> */}

               <div className="container">
                
            <div className="card row" style={{ "textAlign": "center" }}>
                <div className="card-title">
                </div>
                <div className="card-body"></div>

                {userdata &&
                    <div>
                        <h2> User Name: <b>{userdata.UserName}</b>  ({userdata.UserId})</h2>
                        <h3>Contact Details</h3>
                        <h5>Email is : {userdata.Email}</h5>
                        <h5>Birth Date is : {moment(new Date(userdata.BirthDate)).format("DD-MM-YYYY") }</h5>
                        <img src={"http://localhost:5244/photos/"+userdata.PhotoFileName} width={150} height={150} ></img>
                        <div>
                        <Link className="btn btn-danger" to="/">Back to List</Link>
                         </div>   
                    </div>
                }
            </div>
            </div>
            {/* </div>
            </div> */}
        </div >
    );
}

export default UserDetails;