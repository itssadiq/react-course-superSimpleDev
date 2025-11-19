import { Header } from "../components/Header";
import "./NotFound404.css";

export function NotFound404({ cart }) {
  return (
    <>
      <Header cart={cart} />
      <h1 className="notfound-heading">Error 404: Page Not Found</h1>
    </>
  );
}
