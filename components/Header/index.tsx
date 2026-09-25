import Link from "next/link";
import "./index.css";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { siginout } from "@/lib/actions";

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const user = verifyToken(token);
  return (
    <header className="header">
      <Link href="/" className="logo">
        Next<span className="logoAccent">Blog</span>
      </Link>

      <nav className="nav">                  
        {user ? (
          <>
          <Link href="/dashboard" className="navLink">
            Dashboard
          </Link>
          <div className="userMenu">
            <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
            <div className="dropdown">
              <span className="dropdownName">{user.name}</span>
              <form action={siginout}>
                <button type="submit" className="signOutButton">
                  Sign out
                </button>
              </form>
            </div>
          </div>
          </>
        ) : (
          <>
          <Link href="/auth/signin" className="navLink">
            Sign in
          </Link>
          <Link href="/auth/signup" className="signInButton">
            Sign up
          </Link>
          </>  
        )}          
      </nav>
    </header>
  );
}
