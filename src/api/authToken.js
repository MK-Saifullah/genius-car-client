export const setAuthToken = (user) => {
    const currentUser = {
        email: user.email
      };

      // Get jwt token
      fetch('https://genius-car-server-mk-saifullah.vercel.app/jwt', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(currentUser)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        localStorage.setItem('genius-car-token', data.token)
      })

}