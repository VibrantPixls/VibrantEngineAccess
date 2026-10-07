const CLIENT_ID = "Ov23liovnEVoZEVSuJkm";
const WORKER_URL = "https://vibrantengine-access.knortdm.workers.dev";

const txt_status = document.getElementById("status");
const login_button = document.getElementById("login");

login_button.onclick = () => {
    const state = crypto.randomUUID();
    sessionStorage.setItem("oauth_state", state);
    location.href = "https://github.com/login/oauth/authorize" + `?client_id=${CLIENT_ID}&state=${state}`;
};

const params = new URLSearchParams(location.search);
const code = params.get("code");
if (code) {
    login_button.hidden = true;
    history.replaceState(null, "", location.pathname);

    if (params.get("state") !== sessionStorage.getItem("oauth_state")) {
        txt_status.textContent = "Sign-in failed (state mismatch). Please try again.";
        login_button.hidden = false;
    } else {
        txt_status.textContent = "Sending invitation...";

        fetch(WORKER_URL, {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code }),
            }).then((r) => r.json()).then((data) => {
                if (data.status === "invited") {
                    txt_status.textContent = `Invitation sent to ${data.username}. Check your email or github.com/notifications to accept it.`;
                } else if (data.status === "already_has_access") {
                    txt_status.textContent = `${data.username} already has access.`;
                } else {
                    throw new Error(data.error);
                }
            }).catch(() => {
                txt_status.textContent = "Something went wrong. Please try again.";
                login_button.hidden = false;
            });
    }
}
