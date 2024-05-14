import { Navigate, Outlet } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import UserSection from './UserSection';


export default function ProtectedRoute() {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const decode = jwtDecode(token);
            const expDate = new Date(decode.exp * 1000);
            if (expDate < new Date()) {
                localStorage.clear()
                return <Navigate to='/' replace />
            }
        } catch {
            localStorage.clear()
            return <Navigate to='/' replace />
        }
    } else {
        localStorage.clear()
        return <Navigate to='/' />
    }
    return (
        <div className='min-h-screen bg-zinc-100'>
            <UserSection />
            <Outlet />
        </div>
    )
}
