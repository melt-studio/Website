import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import documentService from "../services/document";
import { Doc, DocMedia } from "../types";
import Logo from "../components/Logo";

const Document = () => {
  return (
    <div className="w-screen h-screen pt-10">
      <div className="w-full h-full flex flex-col gap-10 animate-[fadeIn_1s_ease-in-out] items-center">
        <div className="flex items-center gap-4">
          <a href="/">
            <Logo fill="#ffffff" width={40} />
          </a>
        </div>
        <DocumentContent />
      </div>
    </div>
  );
};

const DocumentContent = () => {
  const { path } = useParams();
  const navigate = useNavigate();

  const [doc, setDoc] = useState<Doc | null>(null);
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(false);
  const [invalid, setInvalid] = useState<string | null>(null);

  if (path === undefined) navigate("/");

  useEffect(() => {
    const getDocument = async (path: string) => {
      try {
        const response: Doc = await documentService.getDocument(path);
        setDoc(response);
        if (response.fields.title) document.title = `MELT – ${response.fields.title}`;
      } catch {
        // console.log(error);
        navigate("/");
      }
    };

    if (path !== undefined) getDocument(path);
  }, [path, navigate]);

  const handlePasswordSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!doc) return navigate("/");

    if (checking) return;
    setChecking(true);

    if (password.length === 0) {
      setInvalid("Please Enter A Password");
    }

    try {
      const response = await documentService.unlockDocument(doc.id, password);
      setDoc(response);
    } catch {
      // console.log(error);
      setInvalid("Incorrect Password");
    }

    setChecking(false);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (invalid) setInvalid(null);
  };

  if (!doc)
    return (
      <div className="flex flex-col gap-10 items-center justify-center w-full h-full pb-10 text-zinc-500">
        Loading...
      </div>
    );

  const { locked, embedUrl, media } = doc.fields;

  if (locked) {
    return (
      <div className="flex flex-col gap-10 items-center justify-center w-full h-full pb-10 animate-[fadeIn_1s_ease-in-out]">
        <form className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-zinc-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>

          <div className="relative flex flex-col gap-1">
            <input
              className={`border text-white outline-0 p-3 rounded-md bg-zinc-900 h-10 min-w-80 pr-10 transition-colors ${
                invalid ? "border-red-500 focus:border-red-500" : "border-zinc-500 focus:border-zinc-500"
              }`}
              type="text"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              disabled={checking}
            />

            <button
              className="w-8 h-8 border border-zinc-300 rounded-sm text-black flex items-center justify-center disabled:border-zinc-900 disabled:text-zinc-600 cursor-pointer disabled:cursor-default transition-colors outline-zinc-600 absolute top-1 right-1 overflow-hidden bg-zinc-300 hover:bg-zinc-200 disabled:bg-zinc-900"
              disabled={password.length === 0}
              onClick={handlePasswordSubmit}
            >
              {!checking && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
              )}
              {checking && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 animate-[rotate_1s_infinite]"
                >
                  <path
                    d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>

            {invalid && <div className="text-sm text-red-500 absolute -bottom-6 left-3">{invalid}</div>}
          </div>
        </form>
      </div>
    );
  }

  if (embedUrl === undefined && media === undefined) {
    return <Navigate to="/" />;
  }

  if (embedUrl) {
    return <iframe src={embedUrl} allowFullScreen className="w-full h-full animate-[fadeIn_1s_ease-in-out]" />;
  }

  if (media && media.length > 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Media media={media[0]} />
      </div>
    );
  }
};

const Media = ({ media }: { media: DocMedia }) => {
  const { url, type } = media;

  if (type === "video/mp4") {
    return <video src={url} controls />;
  } else if (type === "application/pdf") {
    return <embed src={url} className="w-full h-full" />;
  } else if (["image/png", "image/jpeg", "image/gif"].includes(type)) {
    return <img src={url} />;
  } else {
    console.log("Unknown media type");
    return <Navigate to="/" />;
  }
};

export default Document;
