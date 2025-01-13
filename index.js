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
function send_request(request_url, payload) {
    try {
        const base_url =
            (CONFIG_DATA && CONFIG_DATA.BASE_API_URL) ||
            "http://localhost:5000";
        console.log('in request function',payload)
        axios
            .post(base_url.concat("/", request_url), payload, {
                Headers: { "Access-Control-Allow-Credentials": true ,
                'Content-Type': 'application/json'
            }
            })
            .then(function (response) {
                // handle success
                console.log(response);
                return response, 0;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                return error, -1;
            });
    } catch (error) {
        console.log(error);
        return error, -1;
    }
}

send_request("event-stream");

document.querySelector("#submit_button").addEventListener("click",btn_press)

function btn_press() {

    let payload = {
        input_prompt : document.querySelector("#prompt-text").value,
    }

    send_request('ApiCall',payload)    
}