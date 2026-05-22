import { useDispatch } from "react-redux";
import { setError, setLoading, setUser } from "../auth.slice";
import { login, register, getMe, logout } from "../service/authService";

export function useAuth() {
    const dispatch = useDispatch();

    async function handleRegister(username, email, password) {
        try {
            dispatch(setLoading(true))
            const data = await register(username, email, password)
            return true
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Registration failed"))
            return false;
        } finally {
            dispatch(setLoading(false));
        }

    }

async function handleLogin(email, password) {
    try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        const response = await login({ email, password });
        const user = response.user ?? response.data?.user; // ← handles both cases
        dispatch(setUser(user));
        return true;
    } catch (error) {
        const message = error.response?.data?.message || "Login failed";
        dispatch(setError(message));
        throw new Error(message);
    } finally {
        dispatch(setLoading(false));
    }
}

    async function handleGetMe() {
        try {
            dispatch(setLoading(true));
            const data = await getMe();
            dispatch(setUser(data.user));
        }
        catch (error) {
            // dispatch(setError(error?.response?.data?.message || "Error getting user"))
        }
        finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogout() {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));

            await logout();

        } catch (error) {
            // log it but don't block the logout — cookie may already be cleared
            console.error("Logout error:", error);
            dispatch(setError(error?.message || "Logout failed"));

        } finally {
            dispatch(setUser(null));
            dispatch(setLoading(false));
        }
    }

    return {
        handleGetMe, handleLogin, handleRegister, handleLogout
    }
}


