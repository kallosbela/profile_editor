
async function saveData() {

  let firstName = document.getElementById("firstname").value
  
  let data = {"firstname":firstName}

  const addProfile = await fetch(
    "http://127.0.0.1:9000", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)}
    
  );
  
  //addProfile()

  console.log(response);

  let content = "sikerült!!!"   

  document.getElementById("root").innerHTML = content;
}

document.getElementById("save").addEventListener("click", saveData);