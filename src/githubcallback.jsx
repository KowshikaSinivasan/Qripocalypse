import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function GitHubCallback({ onTokenReceived, commitAfterLogin }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = params.get("code");
    if (!code) {
      console.error("No code in URL");
      return;
    }

    // Exchange code for token via backend
    fetch(`http://localhost:5000/api/auth/callback?code=${code}`)
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          // Store token locally
          localStorage.setItem("github_token", data.token);

          // Optional: update app state
          if (onTokenReceived) onTokenReceived(data.token);

          // Automatically continue commit if requested
          if (commitAfterLogin) commitAfterLogin();

          // Redirect to main editor page (optional)
          navigate("/");
        } else {
          console.error("Failed to get token from backend", data);
        }
      })
      .catch(err => console.error("OAuth callback error:", err));
  }, []);

  return <p>Logging in with GitHub...</p>;
}