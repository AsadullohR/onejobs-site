import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Netlify Forms: posts the form urlencoded to "/" and moves to /thank-you.
// Every form name used here must also exist as a static form in index.html,
// otherwise Netlify will not detect it at deploy time.
export function useNetlifyForm(formName) {
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.set("form-name", formName);
    setStatus("sending");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      navigate("/thank-you");
    } catch {
      setStatus("error");
    }
  };

  return { onSubmit, status };
}
