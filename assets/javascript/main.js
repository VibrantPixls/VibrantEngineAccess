const CLIENT_ID = "Ov23liovnEVoZEVSuJkm";

const txt_status = document.getElementById("status");
const login_button = document.getElementById("login");
const eula_checkbox = document.getElementById("eula");

login_button.onclick = () => {
    if (!eula_checkbox.checked) {
        txt_status.textContent = "Please confirm the Unreal Engine EULA statement first";
        txt_status.classList.remove("warning");
        void txt_status.offsetWidth;
        txt_status.classList.add("warning");
        return;
    }
    sessionStorage.setItem("eula_accepted", "1");
    const state = crypto.randomUUID();
    sessionStorage.setItem("oauth_state", state);
    
    const redirect = new URL("status.html", location.href).href;
    location.href = "https://github.com/login/oauth/authorize" + `?client_id=${CLIENT_ID}&state=${state}&redirect_uri=${encodeURIComponent(redirect)}`;
};
