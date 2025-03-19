document.getElementById('contentForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const topic = document.getElementById('topic').value;
    
    if (topic) {
        try {
            const response = await fetch('http://127.0.0.1:8000/generate_content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic: topic }),
            });

            const data = await response.json();
            displayResults(data);
        } catch (error) {
            console.error("Error:", error);
        }
    }
});

function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';  // Clear previous results

    data.forEach(platform => {
        const platformDiv = document.createElement('div');
        platformDiv.classList.add('platform');
        platformDiv.innerHTML = `
            <h2>${platform.name}</h2>
            <p>${platform.content}</p>
        `;
        resultsContainer.appendChild(platformDiv);
    });
}
