let CONFIG_DATA;

document.addEventListener("DOMContentLoaded", renderEnvValues);

async function renderEnvValues() {
    CONFIG_DATA = await get_config()
    // .then((data) => {
    //     CONFIG_DATA = data;
    // });
    console.log(CONFIG_DATA,'CONFIG_DATA');
    heading = document.querySelector(".heading");
    heading.children[0].innerText = CONFIG_DATA.HEADING || "AI CHAT";
}

async function get_config() {
    const resp = await fetch("config.json");
    return resp.json();
}

