let CONFIG_DATA;

document.addEventListener("DOMContentLoaded", renderEnvValues);

async function renderEnvValues() {
    CONFIG_DATA = await get_config();
    // .then((data) => {
    //     CONFIG_DATA = data;
    // });
    heading = document.querySelector(".heading");
    heading.children[0].children[0].innerText =
        CONFIG_DATA.HEADING || "AI CHAT";
    heading.children[0].children[1].innerText =
        CONFIG_DATA.SUBHEADING || "Your AI chat assistant";
}

async function get_config() {
    const resp = await fetch("config.json");
    return resp.json();
}

// console.log(CONFIG_DATA,'CONFIG_DATA')
async function send_request(request_url, payload) {
    try {
        const base_url =
            (CONFIG_DATA && CONFIG_DATA.BASE_API_URL) ||
            "http://localhost:5000";
        console.log("in request function", payload);
        const response = await axios.post(
            base_url.concat("/", request_url),
            payload,
            {
                Headers: {
                    "Access-Control-Allow-Credentials": true,
                    "Content-Type": "application/json",
                },
            }
        );

        // handle success
        console.log(response);
        console.log('response.data.data',response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// send_request("event-stream");

function addNewChat(user, message) {
    const new_child = `<div class="chat">
        <span id="iconA" class="text-xl px-4 font-bold">
            ${user}
        </span>
        <p class="px-2">
            ${message}
        </p>
    </div>`;
    document.querySelector("#chat-area").innerHTML += new_child;
}

document.querySelector("#submit_button").addEventListener("click", btn_press);

async function btn_press() {
    let prompt = document.querySelector("#prompt-text").value;
    document.querySelector("#prompt-text").value = "";
    let payload = {
        input_prompt: prompt,
    };
    addNewChat("A", prompt);

    const api_response= await send_request("ApiCall", payload);
    console.log(api_response, "----------");

    addNewChat("B", api_response);
}
