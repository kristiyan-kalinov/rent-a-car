import { Navigate, useNavigate } from "react-router-dom";
import { getLoggedUser } from "../http-utils/user-requests";

export function AdminGuard({ children }) {
    const navigate = useNavigate();
    const user = getLoggedUser();

    if (user && user.role !== "admin") {
        return <Navigate to='/vehicles-list' />;
    }

    return children;
}