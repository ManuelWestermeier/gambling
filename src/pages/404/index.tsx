import { Link } from "react-router-dom";

export default function PageNotFlound() {
  return (
    <div className="page flex col">
      <h1>PageNotFlound</h1>
      <Link to="/">Home</Link>
    </div>
  );
}