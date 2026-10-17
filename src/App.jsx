import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import LangProvider from "./i18n/LangProvider";
import { detectLang, isLang, withLang } from "./i18n/lang";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Jobseekers from "./pages/Jobseekers";
import Employers from "./pages/Employers";
import Agencies from "./pages/Agencies";
import Countries from "./pages/Countries";
import Country from "./pages/Country";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";

// Sends paths without a language (/, /jobseekers, old Telegram links) to the visitor's language.
function RedirectToLang() {
  const { pathname, search, hash } = useLocation();
  return <Navigate to={withLang(pathname, detectLang()) + search + hash} replace />;
}

function LangRoute() {
  const { lang } = useParams();
  if (!isLang(lang)) return <RedirectToLang />;
  return (
    <LangProvider lang={lang}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="employers" element={<Employers />} />
          <Route path="agencies" element={<Agencies />} />
          <Route path="jobseekers" element={<Jobseekers />} />
          <Route path="countries" element={<Countries />} />
          <Route path="countries/:slug" element={<Country />} />
          <Route path="thank-you" element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </LangProvider>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/:lang/*" element={<LangRoute />} />
      <Route path="*" element={<RedirectToLang />} />
    </Routes>
  );
}
