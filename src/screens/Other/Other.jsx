import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import embedService from "../../services/embeds";
import Page from "../Page";
import "./Other.css";

const Other = ({ embeds }) => {
  const [embed, setEmbed] = useState(null);
  const [locked, setLocked] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const { type, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("embed-page");

    return () => {
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
    }
  }, [embeds, type, id, navigate]);

  return (
    <Page>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MELLLLLLT - Other</title>
      </Helmet>

      <div
        className="page-container"
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {embed && (
          <EmbedContent embed={embed} locked={locked} setLocked={setLocked} loaded={loaded} setLoaded={setLoaded} />
        )}
      </div>
    </Page>
  );
};

const EmbedContent = ({ embed, locked, setLocked, loaded, setLoaded }) => {
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
    return <PasswordForm embed={embed} setLocked={setLocked} />;
  }

  if (loaded && embed.fields.pageType === "other") {
    return (
      <iframe
        key={embed.id}
        className="embed"
        title={embed.fields.title}
        src={embed.fields.embedUrl}
        allowFullScreen
      ></iframe>
    );
  }

  if (loaded && embed.fields.pageType === "animations") {
    return <h1>ANIMATION HERE</h1>;
  }

  return null;
};

export default Other;

const PasswordForm = ({ embed, setLocked }) => {
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
      await embedService.openEmbed(embed.id, password);
      setLocked(false);
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
      <h1>Enter password to view page</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Password" type="password" onChange={handleChange} />
        <button type="submit">Submit</button>
        {message && <div className="form__message">{message}</div>}
      </form>
    </div>
  );
};
