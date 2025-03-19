async function generateContent() {
    const platform = document.getElementById("platform").value;
    const content = document.getElementById("content").value;

    if (!content) {
        alert("Please enter some content.");
        return;
    }

    const response = await fetch("http://127.0.0.1:8000/generate-content/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            platform: platform,
            content: content
        })
    });

    if (response.ok) {
        const data = await response.json();
        document.getElementById("generated-content").textContent = data.generated_content;
    } else {
        const error = await response.json();
        alert(`Error: ${error.detail}`);
    }
}
