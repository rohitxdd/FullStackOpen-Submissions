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
            <div className="bg-zinc-100">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Register to Application</h1>
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        onChange={handleChange}
                                        value={formData.name}
                                    ></input>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username:</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        onChange={handleChange}
                                        value={formData.username}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        onChange={handleChange}
                                        value={formData.password}
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={handleSubmit} className="text-white bg-violet-700 hover:bg-violet-800 px-5 py-1 font-semibold rounded-md">Submit</button>
                                    <button onClick={() => navigate("/")} className="text-white bg-violet-700 hover:bg-violet-800 px-5 py-1 font-semibold rounded-md">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
