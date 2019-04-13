import Cookies from 'js-cookie'

const Username = "name"
const Userrole = "role"

export function initToken () {
  Cookies.set(Username, '', { expires: 1 })
  Cookies.set(Userrole, '', { expires: 1 })
}

export function getName () {
  return Cookies.get(Username)
}
export function getRole () {
  return Cookies.get(Userrole)
}

export function setToken (name,role) {
  Cookies.set(Username, name, { expires: 1 })
  Cookies.set(Userrole, role, { expires: 1 })
}

export function removeToken () {
  Cookies.remove(Username) 
  Cookies.remove(Userrole) 
}
