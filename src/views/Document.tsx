import clsx from "clsx";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";

import Image from "../components/Image";
import Video from "../components/Video";
import documentService from "../services/document";
import { DocumentAirtableLocked, DocumentAirtableUnlocked, ImageAirtable, Media, PDFAirtable } from "../types";
import Placeholder from "../components/Placeholder";
import { useStore } from "../stores/store";

const Document = () => {
  useEffect(() => {
    document.documentElement.classList.add("page-docs");
    return () => document.documentElement.classList.remove("page-docs");
  }, []);

  return (
    <div className="w-full h-dvh">
      <div className="w-full h-full flex flex-col animate-[fade-in_1s_ease-in-out] items-center">
        <DocumentContent />
      </div>
    </div>
  );
};

const DocumentContent = () => {
  const { path } = useParams();
  const navigate = useNavigate();

  const [doc, setDoc] = useState<DocumentAirtableUnlocked | DocumentAirtableLocked | null>(null);
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(false);
  const [invalid, setInvalid] = useState<string | null>(null);

  const viewport = useStore((state) => state.viewport);

  if (path === undefined) navigate("/");

  useEffect(() => {
    const getDocument = async (path: string) => {
      try {
        const response: DocumentAirtableUnlocked | DocumentAirtableLocked = await documentService.getDocument(path);
        setDoc(response);
      } catch {
        navigate("/");
      }
    };

    if (path !== undefined) getDocument(path);
  }, [path, navigate]);

  const handlePasswordSubmit = async (e: MouseEvent) => {
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
      setPassword("");
      setInvalid(null);
      setChecking(false);
    } catch {
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
      <div className="flex flex-col gap-10 items-center justify-center w-full h-full pb-0 text-mid fill-mid mix-blend-difference">
        <Placeholder override light />
      </div>
    );

  if (doc.locked) {
    return (
      <div className="flex flex-col gap-10 items-center justify-center w-full h-full p-10 animate-[fade-in_1s_ease-in-out]">
        <form className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-mid"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>

          <div className="relative flex flex-col gap-1">
            <input
              className={clsx(
                "border text-dark outline-0 p-3 rounded-md bg-light h-10 min-w-80 pr-10 transition-colors",
                {
                  "border-red-500 focus:border-red-500": invalid,
                  "border-light focus:border-light": !invalid,
                }
              )}
              type="text"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              disabled={checking}
            />

            <button
              className="w-8 h-8 border border-dark rounded-sm text-light flex items-center justify-center disabled:border-mid disabled:text-dark/30 cursor-pointer disabled:cursor-default transition-colors outline-dark absolute top-1 right-1 overflow-hidden bg-dark hover:bg-dark disabled:bg-mid"
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

            {invalid && <div className="text-sm text-red-500 font-medium absolute -bottom-6 left-3">{invalid}</div>}
          </div>
        </form>
      </div>
    );
  }

  const { embedUrl, media, pdf } = (doc as DocumentAirtableUnlocked).fields;

  if (embedUrl === undefined && media === undefined) {
    return <Navigate to="/" />;
  }

  const title = doc.fields.title ? <title>{`MELT – ${doc.fields.title}`}</title> : null;

  if (embedUrl) {
    const embedUrl_ = embedUrl
      .replace("figma.com/deck/", "figma.com/proto/")
      .replace("&scaling=scale-down", "&scaling=contain");

    const downloadPdf = async () => {
      if (!(pdf && pdf[0] && pdf[0].type === "application/pdf")) return;
      const a = document.createElement("a");
      const data = await fetch(pdf[0].url);
      const blob = await data.blob();
      const blobData = URL.createObjectURL(blob);
      a.href = blobData;
      a.download = pdf[0].filename;
      a.click();
    };

    const embedSize = () => {
      const margin = 48;
      const hasPdf = pdf && pdf[0] && pdf[0].type === "application/pdf";
      const pdfThumb = hasPdf ? (pdf[0] as PDFAirtable).thumbnails.large : null;
      const button = viewport.width < 1920 ? 40 : 48;
      const space = {
        width: viewport.width - margin * 2,
        height: hasPdf ? viewport.height - button - margin * 2 : viewport.height - margin * 2,
      };
      const spaceAspect = space.width / space.height;
      const embedAspect = pdfThumb ? pdfThumb.width / pdfThumb.height : 16 / 9;
      if (spaceAspect > embedAspect) {
        return {
          width: space.height * embedAspect,
          height: space.height,
        };
      } else {
        return {
          width: space.width,
          height: space.width / embedAspect,
        };
      }
    };

    return (
      <div className="w-full h-full relative p-12 flex items-center">
        {title}
        <div className="flex flex-col gap-4 justify-center mx-auto w-fit h-fit">
          <div
            className="z-1 bg-black mx-auto overflow-hidden relative"
            style={{ animation: "fade-in 1s ease-in-out 1s both", ...embedSize() }}
          >
            <div
              className={clsx({
                "w-full h-full": !embedUrl.includes("figma.com/proto/"),
                "absolute -inset-x-12 -inset-y-15": embedUrl.includes("figma.com/proto/"),
              })}
            >
              <iframe src={embedUrl_} className="w-full h-full" allowFullScreen />
            </div>
          </div>

          {pdf && pdf[0] && pdf[0].type === "application/pdf" && (
            <div className="">
              <button
                onClick={downloadPdf}
                className="uppercase ml-auto px-3 3xl:px-4 w-fit h-6 3xl:h-8 bg-light hover:bg-light/80 cursor-pointer font-mono tracking-tight flex items-center gap-2 rounded-full transition-colors duration-500 justify-center text-dark text-xs 3xl:text-xssm"
                style={{ animation: "fade-in 1s ease-in-out 2s both" }}
              >
                Download PDF
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (media && media.length > 0) {
    const pdf = media[0].type === "application/pdf";

    return (
      <div className="w-full h-full relative flex items-center justify-center">
        {title}
        <div
          className={clsx("flex items-center justify-center", {
            "w-full h-full": pdf,
            "absolute inset-12": !pdf,
          })}
        >
          <DocumentMedia media={media[0]} />
        </div>
      </div>
    );
  }

  return null;
};

const DocumentMedia = ({ media }: { media: Media }) => {
  const { url, type } = media;

  if (type.includes("video/")) {
    return <Video src={url} controls className="object-contain max-w-full max-h-full" type={type} />;
  } else if (type === "application/pdf") {
    return <embed src={url} className="w-full h-full" />;
  } else if (type.includes("image/")) {
    const { width, height } = media as ImageAirtable;
    return <Image src={url} width={width} height={height} className="object-contain max-w-full max-h-full" />;
  } else {
    console.log("Unknown media type");
    return <Navigate to="/" />;
  }
};

export default Document;
