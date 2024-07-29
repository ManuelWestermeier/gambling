import { Link } from "react-router-dom";
import useUserData from "../../../hooks/use-user-data";
import LoadingPage from "../../state/loading-page";
import useClientContext from "../../../hooks/use-client-context";
import { useState } from "react";

export default function HeadOrTailsPage() {
  const [isWon, setIsWon] = useState<boolean | "unset">("unset");
  const userData = useUserData();
  const client = useClientContext();

  if (userData == "loading") return <LoadingPage />;

  if (isWon === true) {
    return (
      <div className="page">
        <div className="container">
          <Link to="/">Home</Link>
          <h1>You Won</h1>
          <button onClick={() => setIsWon("unset")}>Retry</button>
        </div>
      </div>
    );
  }

  if (isWon === false) {
    return (
      <div className="page">
        <div className="container">
          <Link to="/">Home</Link>
          <h1>You Lost</h1>
          <button onClick={() => setIsWon("unset")}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <Link to="/">Home</Link>
        <p>money: {userData.money}</p>
        <fieldset className="container">
          <legend>
            <h4>heads or tails</h4>
          </legend>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const fd = new FormData(e.target as HTMLFormElement);

              const money = parseInt(fd.get("money") as string) || 0;
              const selectedIsHead = fd.get("selected") == "head";

              if (!confirm(`maybe you lost ${money} coins`)) return;

              client
                ?.get("play:heads-or-trails", { money, selectedIsHead })
                .then(setIsWon);
            }}
          >
            <p>
              money to spend (between 0 and {userData.money}) if you loos you
              loose it and if you win you double it
            </p>
            <input
              style={{ width: "calc(100% - 40px)" }}
              type="number"
              placeholder={`money to spend 0 < ${userData.money}`}
              min={0}
              max={userData.money}
              name="money"
            />
            <select name="seected">
              <option value="head">head</option>
              <option value="trail">trail</option>
            </select>
            <button type="submit">Play Game</button>
          </form>
        </fieldset>
      </div>
    </div>
  );
}
