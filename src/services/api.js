const API = "https://security-scanner-api-6rct.onrender.com/";

export async function analyzeDomain(domain) {
  const response = await fetch(
    `${API}/analyze?domain=${encodeURIComponent(domain)}`
  );

  if (!response.ok) {
    throw new Error("Analysis failed");
  }

  return await response.json();
}