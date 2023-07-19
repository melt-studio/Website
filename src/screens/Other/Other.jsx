import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import embedService from "../../services/embeds";
import Page from "../Page";
import WaterfallAnimation from "../../components/WaterfallAnimation";
import PasswordVisible from "../../assets/images/MELT__PASSWORD_VISIBLE.svg";
import PasswordHidden from "../../assets/images/MELT__PASSWORD_HIDDEN.svg";
import "./Other.css";

const Other = ({ embeds, config }) => {
  const [embed, setEmbed] = useState(null);
  const [embedUrl, setEmbedUrl] = useState(null);
  const [locked, setLocked] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const { type, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("other-page");

    return () => {
      document.body.classList.remove("other-page");
      document.body.classList.remove("embed-page");
    };
  }, []);

  useEffect(() => {
    if (embeds && embeds.length) {
      const embed = embeds.find((e) => {
        return e.fields.pageType === type && e.fields.pageUrl === id;
      });

      if (!embed) {
        setEmbed(null);
        return navigate("/404");
      }

      setEmbed(embed);
      if (embed.fields.embedUrl) {
        setEmbedUrl(embed.fields.embedUrl);
      }
    }
  }, [embeds, type, id, navigate]);

  useEffect(() => {
    if (embedUrl) {
      document.body.classList.add("embed-page");
    } else {
      document.body.classList.remove("embed-page");
    }
  }, [embedUrl]);

  return (
    <Page>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MELLLLLLT - {embed && embed.fields.title ? embed.fields.title : "Other"}</title>
      </Helmet>

      <div
        className="page-container"
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {embed && (
          <EmbedContent
            embed={embed}
            locked={locked}
            setLocked={setLocked}
            loaded={loaded}
            setLoaded={setLoaded}
            config={config}
            setEmbedUrl={setEmbedUrl}
            embedUrl={embedUrl}
          />
        )}
      </div>
    </Page>
  );
};

const EmbedContent = ({ embed, embedUrl, locked, setLocked, loaded, setLoaded, config, setEmbedUrl }) => {
  useEffect(() => {
    if (embed.fields.protected) {
      setLocked(true);
    }
    setLoaded(true);
  }, [embed, setLocked, setLoaded]);

  if (!embed) {
    return null;
  }

  if (loaded && locked) {
    return <PasswordForm embed={embed} setLocked={setLocked} setEmbedUrl={setEmbedUrl} />;
  }

  if (loaded && embed.fields.pageType === "other") {
    if (embedUrl) {
      return (
        <iframe key={embed.id} className="embed" title={embed.fields.title} src={embedUrl} allowFullScreen></iframe>
      );
    } else {
      return null;
    }
  }

  if (loaded && embed.fields.pageType === "animations") {
    return <WaterfallAnimation controls={false} serverConfig={config} />;
  }

  return null;
};

export default Other;

const PasswordForm = ({ embed, setLocked, setEmbedUrl }) => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const form = useRef();
  const passwordInput = useRef();
  const passwordToggle = useRef();
  const passwordToggleImage = useRef();

  const handleChange = (e) => {
    if (form && form.current) {
      form.current.classList.remove("error");
    }
    if (message) setMessage(null);
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    if (passwordToggle.current) {
      passwordToggle.current.style.visibility = e.target.value.length > 0 ? "visible" : "hidden";
    }

    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password === "") {
      setLocked(true);
      if (form && form.current) {
        form.current.classList.add("error");
      }
      return setMessage("Please enter password");
    }

    try {
      const unlockedEmbed = await embedService.openEmbed(embed.id, password);
      setLocked(false);
      if (unlockedEmbed.fields.embedUrl) {
        setEmbedUrl(unlockedEmbed.fields.embedUrl);
      }
      setPassword("");
    } catch (error) {
      setLocked(true);
      if (form && form.current) {
        form.current.classList.add("error");
      }
      setMessage("Wrong password");
    }
  };

  return (
    <div className="form password-form" ref={form}>
      <form onSubmit={handleSubmit}>
        <div className="form__password-container">
          <input ref={passwordInput} placeholder="Password" type="password" onChange={handleChange} autoFocus={true} />
          <span
            ref={passwordToggle}
            style={{ visibility: "hidden" }}
            className="form__password-toggle"
            onClick={() => {
              if (passwordInput.current && passwordToggleImage.current) {
                const type = passwordInput.current.type === "password" ? "text" : "password";
                passwordInput.current.type = type;
                passwordToggleImage.current.src = type === "text" ? PasswordHidden : PasswordVisible;
              }
            }}
          >
            <img ref={passwordToggleImage} src={PasswordVisible} alt="Toggle password visibility" />
          </span>
        </div>
        <button type="submit">View page</button>
        {message && <div className="form__message">{message}</div>}
      </form>
    </div>
  );
};
