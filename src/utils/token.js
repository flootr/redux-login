export const getCredentials = () => {
  const credentials = localStorage.getItem('credentials')
  return credentials ? JSON.parse(credentials) : null
}

export const saveCredentials = credentials =>
  localStorage.setItem('credentials', JSON.stringify(credentials))

export const removeCredentials = () => localStorage.removeItem('credentials')
