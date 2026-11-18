export type VerificationRecord = {
  username: string;
  name?: string;
  developerId?: string;
  status: "verified" | "pending" | "revoked" | string;
};
type Registry = { verified?: VerificationRecord[] };

const REGISTRY_URL =
  process.env.GITHUB_VERIFICATION_URL ||
  "https://raw.githubusercontent.com/SEXY0090/LOL/main/Verified";

export async function getVerification(username: string) {
  try {
    const response = await fetch(REGISTRY_URL, {
      cache: "no-store",
      headers: { "User-Agent": "UnityHub-BD-Verification" }
    });
    if (!response.ok) return null;
    const data = (await response.json()) as Registry;
    return data.verified?.find(
      (item) => item.username.toLowerCase() === username.toLowerCase() &&
        item.status === "verified"
    ) ?? null;
  } catch {
    return null;
  }
}
