import { useState, useEffect } from "react"
import { UserContext } from '../../Context/UserContext' 
import { Outlet, useNavigate } from 'react-router-dom';
import BrandBar from "../BrandBar"
const User = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

  useEffect(() => {
    if (!user.username) {
      navigate('/')
    }
  }, [user])

  return (
      <UserContext.Provider value={{user, setUser}}>
        <BrandBar />
        <Outlet />
      </UserContext.Provider>
  )
}

export default User