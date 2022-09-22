let BASE_URL = "https://nyhetssidan-jkl.fly.dev"

async function fetchAccountWithEmail(account){
const response = await fetch(BASE_URL + "/getAccountWithEmail", {
  method: 'POST',
  body: JSON.stringify(account),
  headers: {
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
return data[0];
}

export{
  fetchAccountWithEmail
}
