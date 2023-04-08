import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../Page";
import "./Embed.css";

const Embed = ({ embeds }) => {
  const [embed, setEmbed] = useState(null);
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
        {embed && <EmbedContent embed={embed} />}
      </div>
    </Page>
  );
};

const EmbedContent = ({ embed }) => {
  if (embed.fields.pageType === "other") {
    return (
      <iframe
        key={embed.id}
        className="embed"
        title={embed.fields.title}
        src={embed.fields.embedUrl}
        allowFullScreen
      ></iframe>
    );
  } else if (embed.fields.pageType === "animations") {
    return <h1>ANIMATION HERE</h1>;
  } else return null;
};

export default Embed;
