const getters = {
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles,
    phonenumber: state => state.user.phonenumber
  }
  export default getters
  