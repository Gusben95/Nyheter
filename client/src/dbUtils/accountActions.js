async function fetchAccountsByEmail(email) {
  const response = await fetch("/accountsByEmail", {
    method: 'POST',
    body: JSON.stringify(email),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json();
  console.log(data);
  return data;
})

module.exports = { fetchAccountsByEmail }
