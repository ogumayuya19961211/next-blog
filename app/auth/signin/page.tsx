"use client";

import Link from "next/link";
import "./index.css";
import { useActionState } from "react";
import { signin } from "@/lib/actions";

export default function SigninPage() {
  const [state, formAction,isPendeing] = useActionState(signin,null);  

  return (
    <div className="page">
      <Link href="/" className="logo">
        Next<span className="logo-accent">Blog</span>
      </Link>

      <div className="form-card">
        <h1 className="form-title">Welcome back</h1>
        <p className="form-subtitle">サインインしてください</p>

        {/* エラーメッセージ表示（コメントインで確認可能） */}
        
        {state?.error &&<div className="error-message">{state.error}</div>}
       

        <form action={formAction}>
          <div className="input-group">
            <label className="label" htmlFor="email">
              メールアドレス
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="input-group">
            <label className="label" htmlFor="password">
              パスワード
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="input"
              placeholder="パスワード"
              required
            />
          </div>

          <button
            type="submit"
            className={`submit-button ${isPendeing ? "submit-button-loading": ''}`}
            disabled={isPendeing}
          >
            Sigin
          </button>
          {/* ローディング中の表示（コメントインで確認可能） */}
          
          {/* <button
            type="submit"
            className="submit-button submit-button-loading"
          >
          </button> */}
         
        </form>

        <p className="form-footer">
          アカウントをお持ちでない方は{" "}
          <Link href="/auth/signup" className="form-footer-link">
            ユーザー登録 →
          </Link>
        </p>
      </div>
    </div>
  );
}
