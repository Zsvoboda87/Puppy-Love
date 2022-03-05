// async function redirect() {
//     const response = await fetch("/petUploader/upload", {
//       method: "post",
//       headers: { "Content-Type": "application/json" },
//     });
  
//     if (response.ok) {
//       document.location.replace("/petGallery");
//     } else {
//       alert(response.statusText);
//     }
//   }
  
//   document.querySelector("#submit").addEventListener("click", redirect);