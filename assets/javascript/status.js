const WORKER_URL = "https://vibrantengine-access.knortdm.workers.dev";

const txt_status = document.getElementById("status");
const back_link = document.getElementById("back");

const fail = (message) => {
    txt_status.textContent = message;
    back_link.hidden = false;
};

const params = new URLSearchParams(location.search);
const code = params.get("code");
history.replaceState(null, "", location.pathname);

if (!code) {
    fail("No sign-in information found. Please start again.");
} else if (params.get("state") !== sessionStorage.getItem("oauth_state")) {
    fail("Sign-in failed (state mismatch). Please try again.");
} else {
    fetch(WORKER_URL, {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code, accepted: sessionStorage.getItem("eula_accepted") === "1" }),
    }).then((r) => r.json()).then((data) => {
        if (data.status === "invited") {
            txt_status.textContent = `Invitation sent to ${data.username}. Check your email or github.com/notifications to accept it.`;
        } else if (data.status === "already_has_access") {
            txt_status.textContent = `${data.username} already has access.`;
        } else {
            throw new Error(data.error);
        }
    }).catch(() => {
        fail("Something went wrong. Please try again.");
    });
}