import React, {useState, useEffect} from 'react'
import {getAuth} from "firebase/auth"

function Profile() {
  const auth = getAuth()
  const [user, setUser] = useState(null)

  useEffect(() => {
    if(auth.currentUser){
      setUser(auth.currentUser)
      console.log(auth.currentUser);
    }
  }, [])
  
  return (
    <div className='pageContainer'>
      <h1>
        {user? user.displayName : "Not Logged In"}
      </h1>
      {user && <p>{user.email}</p>}
    </div>
  )
}

export default Profile