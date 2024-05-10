export const getUserToken = uid => {
    fetch(`http://localhost:5000/jwt?uid=${uid}`)
    .then(res => res.json())
    .then(data => {
      if(data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
      }
    })
  }