// // sendRequest.js

// export default function sendRequest(url, requestData) {
//     // Define headers
//     const headers = {
//       'Content-Type': 'application/json',
//     };
  
//     // Configure the fetch request
//     const fetchOptions = {
//       method: 'POST',
//       headers: headers,
//       body: JSON.stringify(requestData),
//     };
  
//     // Make the fetch request
//     return fetch(url, fetchOptions)
//       .then(response => {
//         // Check if the response status is in the range 200-299 (successful)
//         if (response.ok) {
//           // Parse the JSON response
//           return response.json();
//         } else {
//           // Handle errors and return a rejected promise
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//       })
//       .then(jsonResponse => {
//         // Return the stringified JSON response
//         return JSON.stringify(jsonResponse);
//       })
//       .catch(error => {
//         // Handle any errors that occurred during the fetch
//         console.error('Error:', error);
//         // Return an error message if needed
//         return JSON.stringify({ error: error.message });
//       });
//   }
  
//   // Example usage
//   // Import this function in another file and use it as needed
  



// sendRequest.js
// export default async function sendRequest(url, requestData) {
//     const headers = {
//       'Content-Type': 'application/json',
//     };
  
//     const fetchOptions = {
//       method: 'POST',
//       headers: headers,
//       body: JSON.stringify(requestData),
//     };
  
//     try {
//       const response = await fetch(url, fetchOptions);
  
//       if (response.ok) {
//         const jsonResponse = await response.json();
//         return JSON.stringify(jsonResponse);
//       } else {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       return JSON.stringify({ error: error.message });
//     }
//   }



/////////////////////////////////////////////////
// sendRequest.js
// export default async function sendRequest(url, requestData) {
//     const headers = {
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*', // Allow requests from any origin (replace with specific origin in production)
//       'Access-Control-Allow-Methods': 'POST, OPTIONS', // Allow POST and OPTIONS methods
//       'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept', // Allow specific headers
//       'Access-Control-Max-Age': '86400', // 1 day (preflight request cache time)
//     };
  
//     const fetchOptions = {
//       method: 'POST',
//       headers: headers,
//       body: JSON.stringify(requestData),
//     };
  
//     try {
//       const response = await fetch(url, fetchOptions);
  
//       if (response.ok) {
//         const jsonResponse = await response.json();
//         return JSON.stringify(jsonResponse);
//       } else {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       return JSON.stringify({ error: error.message });
//     }
//   }
  
  

////////////////////////////////////////////////////



// fetchData.js
export default async function fetchData(url, options = {}) {
    const defaultOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000/patients/0x1983706a87B5Fb17966BbA65DfEc42102913D611/report', // Add your origin
        // Add any other necessary headers
      },
      credentials: 'include', // Include credentials if needed
    };
  
    const fetchOptions = { ...defaultOptions, ...options };
  
    try {
      const response = await fetch(url, fetchOptions);
  
      if (response.ok) {
        const jsonResponse = await response.json();
        return JSON.stringify(jsonResponse);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      return JSON.stringify({ error: error.message });
    }
  }
  