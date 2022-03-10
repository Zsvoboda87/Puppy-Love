var petOwnerID = document.querySelector("#petID").value;

const editPetHandler = async function(event) {
    event.preventDefault();
    var aboutMe = document.querySelector(".petAboutMe").value;
    var petImage = document.querySelector(".petImage").value;
    await fetch(`/update/${petOwnerID}`, {
        method:"put",
        body: JSON.stringify({
            aboutMe,
            petImage
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    document.location.replace("/petGallery")
}

document.addEventListener("submit", editPetHandler);
