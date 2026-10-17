import CountryCards from "../components/CountryCards";
import Vacancies from "../components/Vacancies";
import { useSeo } from "../components/useSeo";

// Index of destination countries; each card links to /countries/:slug.
export default function Countries() {
  useSeo("countries");
  return (
    <>
      <CountryCards id="countries" headingLevel={1} />
      <Vacancies limit={6} />
    </>
  );
}
