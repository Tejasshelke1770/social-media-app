import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./features/auth/auth.context.jsx";
import PostContextProvider from "./features/post/post.context.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <PostContextProvider>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </PostContextProvider>
  </AuthContextProvider>,
);
