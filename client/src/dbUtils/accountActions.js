async function fetchAccountWithEmail(account){
const response = await fetch("/getAccountWithEmail", {
  method: 'POST',
  body: JSON.stringify(account),
  headers: {
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
return data[0];
}

module.exports = {
  fetchAccountWithEmail
}
