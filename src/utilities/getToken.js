export const getUserToken = uid => {
    fetch(`https://subidha-home-services-server3792.glitch.me/jwt?uid=${uid}`)
    .then(res => res.json())
    .then(data => {
      if(data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
      }
    })
  }