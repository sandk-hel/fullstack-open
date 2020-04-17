
const localStorageItemKey = 'BlogListAppUserKey'

const storeUser = (user) => {
  let userString = JSON.stringify(user)
  window.localStorage.setItem(localStorageItemKey, userString)
}

const getUser = () => {
  let userString = window.localStorage.getItem(localStorageItemKey)
  if (userString === null) {
    return null
  }
  return JSON.parse(userString)
}

const removeUser = () => {
  window.localStorage.removeItem(localStorageItemKey)
}

export default { storeUser, getUser, removeUser }