import { Link } from "react-router-dom";
import useUserData from "../../hooks/use-user-data";
import LoadingPage from "../state/loading-page";

export default function HomePage() {
  const userData = useUserData();

  if (userData == "loading") return <LoadingPage />;

  return (
    <div className="page">
      <div className="container">
        <h2>Gambling Live</h2>
        <p>money: {userData.money}</p>
        <p>games played: {userData.gamesPlayed}</p>
        <p>name: {userData.name}</p>
      </div>
      <div className="container">
        <h3>Start Game</h3>
        <Link to="/play/head-or-tails">head or trais</Link>
      </div>
    </div>
  );
}
