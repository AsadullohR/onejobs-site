import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalePath } from "../i18n/lang";

// Netlify Forms: posts the form urlencoded to the static /__forms.html and moves to /thank-you.
// Every form name used here must also exist in public/__forms.html,
// otherwise Netlify will not detect it at deploy time.
export function useNetlifyForm(formName) {
  const navigate = useNavigate();
  const lp = useLocalePath();
  const [status, setStatus] = useState("idle");

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.set("form-name", formName);
    setStatus("sending");
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      navigate(lp("/thank-you"));
    } catch {
      setStatus("error");
    }
  };

  return { onSubmit, status };
}
