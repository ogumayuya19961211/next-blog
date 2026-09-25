"use client";

import Link from "next/link";
import "./index.css";
import { useActionState, useState } from "react";
import { signup } from "@/lib/actions";

export default function SignupPage() {
  const [state, formAction,isPendeing] = useActionState(signup,null);      
  
  return (
    <div className="page">
      <Link href="/" className="logo">
        Next<span className="logo-accent">Blog</span>
      </Link>

      <div className="form-card">
        <h1 className="form-title">アカウント作成</h1>
        <p className="form-subtitle">NextBlog へようこそ</p>

        {/* エラーメッセージ表示（コメントインで確認可能） */}
        
        {state?.error && 
        <div className="error-message">
          {state.error}
        </div>}
       

        <form action={formAction}>
          <div className="input-group">
            <label className="label" htmlFor="name">
              ユーザー名
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="input"
              placeholder="username"
              required
            />
          </div>

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
              placeholder="6文字以上"
              required
            />
          </div>

          <button
            type="submit"
            className={`submit-button ${isPendeing ? "submit-button-loading": ''}`}
            disabled={isPendeing}
          >
            アカウントを作成
          </button>
          {/* ローディング中の表示（コメントインで確認可能） */}
          {/*
          <button
            type="submit"
            className="submit-button submit-button-loading"
          >
          </button>
          */}
        </form>

        <p className="form-footer">
          すでにアカウントをお持ちの方は{" "}
          <Link href="/auth/signin" className="form-footer-link">
            サインイン →
          </Link>
        </p>
      </div>
    </div>
  );
}
