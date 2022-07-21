import fetch from 'node-fetch'

//*Handling Fetch errors
// let url = 'https://stackoverflow.com/questions/48433783/referenceerror-fetch-is-not-defined';
// fetch(url)
// .then((res) => { return res}) 
// .then((response) => console.log("OK"))
// .catch((error)=> console.log(error) //this will not necessarily.  
//  will run only when a bad url or something wrong with the request.
// )

//let url = 'https://stackoverflow.com/questions/48433783/referenceerror-fetch-is-not-defined';
//*alternative
// fetch(url)
//   .then((res) => {
//     if (!res.ok) {throw Error(404)}  //this will be caught
//     return res;
//   })
//   .then((response) => console.log('OK'))
//   .catch((error) => console.log('an error happened'), 
//   );

//*alternative
//   const handleErrors = (request) => {
//     if (!request.ok) {
//       throw Error(404);
//     }
//   };

// fetch(url)
//   .then(handleErrors)
//   .then((res) => {
//     return res;
//   })
//   .then((response) => console.log('OK'))
//   .catch((error) => console.log(error));
    

  
