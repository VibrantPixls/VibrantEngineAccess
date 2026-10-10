const CLIENT_ID = "Ov23liovnEVoZEVSuJkm";

const login_button = document.getElementById("login");
const loginText = login_button.querySelector('span');

const eula_checkbox = document.getElementById("eula");
const answer_input = document.getElementById("answer");

const stepNumbers = document.querySelectorAll('.stepnumber');
function updateSteps() {
    const eulaDone = eula_checkbox.checked;
    const answerDone = answer_input.value.trim() !== '';

    stepNumbers[0].classList.toggle('done', eulaDone);
    stepNumbers[1].classList.toggle('done', answerDone);

    const ready = eulaDone && answerDone;
    login_button.disabled = !ready;

    if (ready) {
        loginText.textContent = 'Authorize with GitHub';
    } else if (!eulaDone && !answerDone) {
        loginText.textContent = 'Complete steps 1 and 2 first';
    } else if (!eulaDone) {
        loginText.textContent = 'Complete step 1 first';
    } else {
        loginText.textContent = 'Complete step 2 first';
    }
}

eula_checkbox.addEventListener('change', updateSteps);
answer_input.addEventListener('input', updateSteps);
updateSteps();

login_button.onclick = () => {
    answer = answer_input.value.trim();
    if (!answer || !eula_checkbox.checked) {
        return;
    }

    sessionStorage.setItem("eula_accepted", "1");
    sessionStorage.setItem("access_answer", answer);

    const state = crypto.randomUUID();
    sessionStorage.setItem("oauth_state", state);
    
    const redirect = new URL("status.html", location.href).href;
    location.href = "https://github.com/login/oauth/authorize" + `?client_id=${CLIENT_ID}&state=${state}&redirect_uri=${encodeURIComponent(redirect)}`;
};
