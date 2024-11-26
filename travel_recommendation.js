// Fetch data from JSON file
function fetchData() {
    return fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
  }
  
  // Grab references to search elements
  let searchInput = document.getElementById('searchInput');
  let searchButton = document.querySelector("form.search-bar-container button[type='submit']"); // <--- Update this line
  let resultsDiv = document.getElementById('resultsContainer'); // <--- Update this line
  
  // Search Button Click Event Listener
  searchButton.addEventListener("click", async function(event) {
  
    // Prevent form submission which causes page refresh  
    event.preventDefault(); 
  
    let userInput = searchInput.value.toLowerCase();
  
    let data = await fetchData();
    
    resultsDiv.innerHTML = ""; 
  
     if (userInput === 'beach' || userInput === 'beaches') {
       displayResults(data.beaches);
     } else if(userInput === 'temple' || userInput === 'temples') {
       displayResults(data.temples);
     } else if(userInput.includes('country')) {    
        const countriesData = [...data.countries];
        countriesData.forEach(country => displayResults(country.cities));
     }
  });
  
  
  function displayResults(places) {
      places.forEach(place => {
  
          let divElm = document.createElement("div");
          divElm.setAttribute("style", "margin-bottom:20px");
  
          let nameElm = document.createElement("h2");
          nameElm.textContent= place.name;
  
          let descElem = document.createTextNode(place.description);
  
           var imgElem;
          
           if(place.imageUrl){
              imgElem= document.createElement("img");
              imgElem.src=place.imageUrl;
              imgElem.width="300";         
              imgElem.height="200";
           }
  
           divElm.appendChild(nameElm);
  
           if(imgElem){
             divElm.appendChild(imgElem);  
           }
  
            divElm.appendChild(descElem);
            
            resultsDiv.appendChild(divElm);
            
      });
  }
  
  // Function to clear multiple input fields
function clearResults() {
    const inputs = document.querySelectorAll('.inputField');
    inputs.forEach(input => input.value = '');
}

// Add event listener to the clear button
document.getElementById('clearButton').addEventListener('click', clearResults);

  