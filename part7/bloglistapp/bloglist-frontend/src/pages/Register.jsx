import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/RegisterService'
import { useNotification } from '../context/NotificationContext'

export default function Register() {
    const navigate = useNavigate()
    const { setNotification } = useNotification()
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        password: ""
    })

    async function handleSubmit() {

        if (formData.name && formData.username && formData.password) {
            if (Object.keys(formData).some(k => formData[k].length <= 3)) {
                setNotification({ text: "Must be at least 4 char long", status: "error" }, 2000);
                return
            }
            try {
                await register(formData)
                setNotification({ text: "Registration Successful", status: "success" });
                return navigate("/")
            } catch (e) {
                console.log(e.response.data.error)
                setNotification({ text: e.response.data.error, status: "error" }, 2000);
            }
        }
        setNotification({ text: "All Fields are Required", status: "error" }, 2000);
    }

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <>
            <h1>Register to Application</h1>
            <div>
                <div>
                    <span style={{ display: "block", marginTop: "1rem" }}>
                        <strong>Name: </strong>
                    </span>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                    ></input>
                </div>
                <div>
                    <span style={{ display: "block", marginTop: "1rem" }}>
                        <strong>Username: </strong>
                    </span>
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={formData.username}
                    />
                </div>
                <div>
                    <span style={{ display: "block", marginTop: "1rem" }}>
                        <strong>Password: </strong>
                    </span>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                    />
                </div>
                <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={() => navigate("/")}>Login</button>
                </div>
            </div>
        </>
    )
}
