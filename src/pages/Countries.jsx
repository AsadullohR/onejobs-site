import CountryCards from "../components/CountryCards";
import Vacancies from "../components/Vacancies";

// Index of destination countries; each card links to /countries/:slug.
export default function Countries() {
  return (
    <>
      <CountryCards id="countries" headingLevel={1} />
      <Vacancies limit={6} />
    </>
  );
}
