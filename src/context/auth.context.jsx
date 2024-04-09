import service from "../../services/api"
import { useState, useEffect, createContext } from "react"

const AuthContext = createContext()

function AuthWrapper(props) {
  const [isUserActive, setIsUserActive] = useState(false);
  const [activeUserId, setActiveUserId] = useState(null);
  
  const verifyToken = async() => {
    try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            setIsUserActive(false);
            setActiveUserId(null);
            return;
        }

        const response = await service.get("/auth/verify", {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        setIsUserActive(true);
        setActiveUserId(response.data.userId);
    } catch (error) {
        console.error("Token Verification Error:", error);
        setIsUserActive(false);
        setActiveUserId(null);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
        verifyToken();
    };
    fetchData();
  }, []);
    const passedContext = {
        verifyToken,
        isUserActive,
        activeUserId,
    }
  return (
    <AuthContext.Provider value={passedContext}>
        {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthWrapper };