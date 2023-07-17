import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import embedService from "../../services/embeds";
import Page from "../Page";
import WaterfallAnimation from "../../components/WaterfallAnimation";
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
    console.log(embed);
  }, [embed]);

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

  const handleChange = (e) => {
    if (form && form.current) {
      form.current.classList.remove("error");
    }
    if (message) setMessage(null);
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
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
        <input placeholder="Password" type="password" onChange={handleChange} autoFocus={true} />
        <button type="submit">View page</button>
        {message && <div className="form__message">{message}</div>}
      </form>
    </div>
  );
};
