// Simulated API call using Promises
function fetchResults(query) {
    return new Promise((resolve) => {
        // Simulate an API delay
        setTimeout(() => {
            // Example search results
            const data = [
                "Apple",
                "Banana",
                "Orange",
                "Pineapple",
                "Strawberry",
                "Grapes",
                "Mango",
                "Watermelon"
            ];

            // Filter results based on query
            const filteredResults = data.filter(item => item.toLowerCase().includes(query.toLowerCase()));

            resolve(filteredResults);
        }, 500); // Simulate 500ms API response time
    });
}

// Function to debounce the API call
function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// DOM Manipulation to display results
function displayResults(results) {
    const resultsList = document.getElementById('results');
    resultsList.innerHTML = ''; // Clear previous results

    if (results.length > 0) {
        results.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            resultsList.appendChild(li);
        });
    } else {
        resultsList.innerHTML = '<li>No results found</li>';
    }
}

// Search function with debouncing
const handleSearch = debounce(function () {
    const query = document.getElementById('search-input').value;

    if (query.trim()) {
        fetchResults(query).then(results => {
            displayResults(results);
        });
    } else {
        document.getElementById('results').innerHTML = ''; // Clear results if query is empty
    }
}, 300); // 300ms debounce delay

// Event listener for input
document.getElementById('search-input').addEventListener('input', handleSearch);
