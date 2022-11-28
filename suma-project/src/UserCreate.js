import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imageCompression from 'browser-image-compression';

const UserCreate = () => {

    const [UserId, idchange] = useState("");
    const [UserName, namechange] = useState("");
    const [Email, emailchange] = useState("");
    const [BirthDate, birthdatechange] = useState("");
    const [PhotoFileName, photofileNamechange] = useState("");
    const [validation, valchange] = useState(false);
    const [image,setImage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const empdata = { UserName, Email, BirthDate, PhotoFileName };
        fetch("http://localhost:5244/api/users", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(empdata)
        }).then((res) => {
            alert('Saved successfully.')
            navigate('/');
        }).catch((err) => {
            console.log(err.message)
        })
    }
    async function handleImage(event) {

        setImage(event.target.files[0])
        photofileNamechange(event.target.files[0].name)
        const imageFile = event.target.files[0];
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        }
        try {
          const compressedFile = await imageCompression(imageFile, options);
          console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
          const formData = new FormData();
          formData.append('image',compressedFile,compressedFile.name)
          await fetch('http://localhost:5244/api/users/SaveFile', {
              method:'POST',
              body:formData
          }).then((res) => {
          }).catch((err) => {
              console.log(err.message)
          })
        } catch (error) {
          console.log(error);
        }}

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>

                        <div className="card" style={{ "textAlign": "left" }}>
                            <div className="App">
                                <h2 >Create User</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input value={UserId} hidden="hidden" disabled="disabled" className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input required value={UserName}  onChange={e => namechange(e.target.value)} className="form-control"></input>
                                            {UserName.length == 0 && validation && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input value={Email} type='email' required onChange={e => emailchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Birth Date</label>
                                            <input value={BirthDate} type='date' required onChange={e => birthdatechange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Add Photo</label>
                                            <input  type='file' name="file" required onChange={handleImage} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Save</button>
                                            <Link to="/" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default UserCreate;