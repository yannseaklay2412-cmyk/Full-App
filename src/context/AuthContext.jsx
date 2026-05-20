import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('currentUser') || 'null')
  })

  const login = (userData) => {   //  when  login  first  it  store  in react  and  update  data in react  then  it  store  in  local storage
    setUser(userData)
    localStorage.setItem('currentUser', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null) //when  logout  it  update  react  to  null  and  remove  from local  storage 
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
  }

  const isAdmin = user?.role === 'admin'

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)


