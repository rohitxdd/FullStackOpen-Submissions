import { useState, useEffect, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext"

const initialState = {
    username: '',
    password: ''
};

const LOGIN = gql`
mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export default function Login() {
    const [formValue, setFormValue] = useState(initialState);
    const { user, setUserToken } = useContext(UserContext)
    const [login, { loading, error }] = useMutation(LOGIN, {
        onError: (e) => {
            console.error(e.graphQLErrors);
        },
        onCompleted: (d) => {
            setUserToken(d.login.value);
        }
    });

    useEffect(() => {
        setUserToken("");
    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (user) {
        return <Navigate to="/" />;
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormValue(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit() {
        const { username, password } = formValue;
        if (username && password) {
            login({ variables: { username, password } });
        }
    }

    return (
        <>
            {error && <h2>{error.graphQLErrors[0]?.message}</h2>}
            <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', gap: '5px' }}>
                <label>Username: </label>
                <input
                    type='text'
                    name='username'
                    placeholder='Enter your username'
                    value={formValue.username}
                    onChange={handleChange}
                />
                <label>Password: </label>
                <input
                    type='password'
                    name='password'
                    value={formValue.password}
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Login</button>
            </div>
        </>
    );
}
