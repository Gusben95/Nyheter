let BASE_URL = "https://nyhetssidan-jkl.fly.dev"
// const BASE_URL = "http://localhost:3001"

async function fetchAccountWithEmail(account) {
  const response = await fetch(BASE_URL + "/getAccountWithEmail", {
    method: 'POST',
    body: JSON.stringify(account),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  let data = response;
  if (data.status === 500) {
    return await data.json()
  }
  data = await data.json();
  return data[0];
}

async function loginWithEmail(account) {
  const response = await fetch(BASE_URL + "/loginWithEmail", {
    method: 'POST',
    body: JSON.stringify(account),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  let data = response;
  if (data.status === 500) {
    return await data.json()
  }
  data = await data.json();
  return data[0];
}

async function createAccount(account) {
  const response = await fetch(BASE_URL + "/createAccount", {
    method: 'POST',
    body: JSON.stringify(account),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json();
  return data;
}

async function updateAccount(account) {
  const response = await fetch(BASE_URL + "/updateAccount", {
    method: 'POST',
    body: JSON.stringify(account),
    headers: {
      'content-type': 'application/json'
    }
  })
  const data = await response.json();
  return data;
}

async function updatePassword(account) {
  const response = await fetch(BASE_URL + "/updatePassword", {
    method: 'POST',
    body: JSON.stringify(account),
    headers: {
      'content-type': 'application/json'
    }
  })
  const data = await response.json();
  return await data;
}

async function getAccountWithToken(account){
  const response = await fetch(BASE_URL + "/getAccountWithToken", {
    method: 'POST',
    body: JSON.stringify(account),
    headers: {
      'content-type': 'application/json'
    }
  })
  const data = await response.json();
  return data[0];
}

export {
  fetchAccountWithEmail,
  getAccountWithToken,
  loginWithEmail,
  createAccount,
  updateAccount,
  updatePassword
}
