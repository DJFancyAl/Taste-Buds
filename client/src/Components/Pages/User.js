import { useState } from "react"
import { UserContext } from '../../Context/UserContext' 
import BrandBar from "../BrandBar"
import Profile from "./Profile"

const User = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

  return (
      <UserContext.Provider value={{user, setUser}}>
        <BrandBar />
        <Profile user={user} />
      </UserContext.Provider>
  )
}

export default User