"use client";

import { useActionState, useState } from "react";
import "./index.css";
import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props{
  action:(
    state: {error:string} | null, 
    formData: FormData
  ) => Promise<{error:string} | null>;
  initialTitle: string;
  initialContent: string;
}

export default function PostForm({action, initialTitle = '',initialContent = ''}: Props) {
  const [content, setContent] = useState(initialContent);  
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form className="post-form" action={formAction}>      
      {state?.error && <p className="form-error">{state.error}</p>}    
      <input
        name="title"
        type="text"        
        placeholder="記事のタイトルを入力..."
        className="title-input"
        required
        defaultValue={initialTitle}
      />

      <div className="editor-pane">
        <div className="editor-panel">
          <div className="panel-label">Markdown</div>
          <textarea
            name="content"            
            placeholder="Markdownで本文を書いてください..."
            className="content-textarea"
            required
            value={content}
            onChange={(e) =>setContent(e.target.value)}
          />
        </div>
        <div className="preview-panel">
          <div className="panel-label">プレビュー</div>
          <div className="preview-content">
            {content ? (
              <ReactMarkDown remarkPlugins={[remarkGfm]}>{content}</ReactMarkDown>
            ) : (
              <p className="preview-placeholder">プレビューがここに表示されます</p>
            ) }                                                
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button
          name="published"
          value="false"
          type="submit"
          className="btn-draft"
          disabled={isPending}
        >
          下書き保存
        </button>
        <button
          name="published"
          value="true"
          type="submit"
          className="btn-publish"
          disabled={isPending}
        >
          公開する
        </button>
      </div>
    </form>
  );
}
