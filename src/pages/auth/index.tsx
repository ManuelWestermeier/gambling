import useAuthPage from "../../hooks/use-auth-page";

export default function AuthPage() {
  const [error, onSubmit] = useAuthPage();

  return (
    <div className="page flex m-col g-auto">
      <form className="flex col" onSubmit={onSubmit("login")}>
        <h2>Login</h2>
        <input type="text" placeholder="username..." name="user" />
        <input type="password" placeholder="password..." name="password" />
        <button type="submit">Login</button>
      </form>
      {error && <p className="c-red">{error}</p>}
      <form className="flex col" onSubmit={onSubmit("create-account")}>
        <h2>Create account</h2>
        <input type="text" placeholder="username..." name="user" />
        <input type="password" placeholder="password..." name="password" />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
