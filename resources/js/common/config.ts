function getMetaContent(metaName: string): string | null {
    const metaElement = document.querySelector(`meta[name="${metaName}"]`);
    return metaElement ? metaElement.getAttribute("content") : null;
}

function getValue(id: string): string | null {
    const element = document.getElementById(id) as HTMLInputElement;
    return element ? element.value : null;
}

const csrf = getMetaContent("csrf-token");
const appName = getMetaContent("app-name");
const appEnv = getMetaContent("app-env");
const cdnUrl = (import.meta as any).env.VITE_CDN_URL || '';
const appUrl = (import.meta as any).env.VITE_APP_URL || window.location.origin;

const rawAccessToken = getValue("accessToken");
const rawAuthUser = getValue("authUser");

let accessToken: string | null = null;
let authUser: any = null;

if (rawAccessToken) {
    accessToken = rawAccessToken;
    localStorage.setItem('accessToken', accessToken);
} else {
    accessToken = localStorage.getItem('accessToken');
}

if (rawAuthUser) {
    try {
        authUser = JSON.parse(rawAuthUser);
        localStorage.setItem('authUser', rawAuthUser);
    } catch (e) {
        console.error("Failed to parse authUser", e);
    }
} else {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
        try {
            authUser = JSON.parse(storedUser);
        } catch (e) {
            console.error("Failed to parse stored authUser", e);
        }
    }
}

export { csrf, appName, appEnv, cdnUrl, appUrl, accessToken, authUser };
