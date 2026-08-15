const ACCESS_KEY = "th-private-access";
const ACCESS_HASH =
  "34c24df580a66acd9ea14b56f960fde0d3554d73d66aa3c67bb4b25a629b4e17";

async function sha256(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function hasPrivateAccess(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(ACCESS_KEY) === "1";
}

export async function unlockPrivateAccess(password: string): Promise<boolean> {
  const hash = await sha256(password.trim());
  if (hash !== ACCESS_HASH) return false;
  window.sessionStorage.setItem(ACCESS_KEY, "1");
  return true;
}

export function lockPrivateAccess(): void {
  window.sessionStorage.removeItem(ACCESS_KEY);
}
