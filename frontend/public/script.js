
const saveProfile = async (formData) => {
  let url = "http://127.0.0.1:9000";
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  return response.status;
}

const deleteAll = async () => {
  let url = "http://127.0.0.1:9000";
  const response = await fetch(url, {
    method: "DELETE"
  });
  return response.status;
}

const init = async () => {
  document.getElementById("save").addEventListener("click", async () => {

    let firstName = document.getElementById("firstName").value
    let surname = document.getElementById("surname").value
    let zipCode = document.getElementById("zipCode").value
    let country = document.getElementById("country").value
    let city = document.getElementById("city").value
    let street = document.getElementById("street").value
    let houseNumber = document.getElementById("houseNumber").value

    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("surname", surname);
    formData.append("zipCode", zipCode);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("street", street);
    formData.append("houseNumber", houseNumber);
    
    const fileField = document.querySelector('input[type="file"]');
    formData.append('picture', fileField.files[0]);
    const response = await saveProfile(formData)
    console.log(response)
    if (response === 200) {
      alert("Ok!");
    } else {
      alert("Wrong...");
    }
  });

  document.getElementById("delete").addEventListener("click", async () => {
    const resStatus = await deleteAll()
    console.log(resStatus)
    if (resStatus === 200) {
      alert("Ok!");
    } else {
      alert("Wrong...");
    }
    document.getElementById("firstName").value = ""
    document.getElementById("surname").value = ""
    document.getElementById("zipCode").value = ""
    document.getElementById("country").value = ""
    document.getElementById("city").value = ""
    document.getElementById("street").value = ""
    document.getElementById("houseNumber").value = ""
    document.querySelector('input[type="file"]').value=""
  })
}

init()