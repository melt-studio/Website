import clsx from "clsx";
import { useStore } from "../store";
import Markdown from "react-markdown";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function Team() {
  const team = useStore((state) => state.team);

  if (!team) return null;

  return (
    <div className="flex flex-col gap-4 w-full overflow-x-hidden relative">
      <div className="uppercase px-md">Our Team</div>
      <div className="overflow-x-scroll">
        <div className="flex gap-4 w-[150%] pb-5 px-4">
          {team.map((member) => {
            const thumbnail = member.fields.photo[0].thumbnails.large;
            return (
              <div key={member.id} className="relative w-1/3 rounded-2xl flex grow overflow-hidden">
                <img
                  src={thumbnail.url}
                  width={thumbnail.width}
                  height={thumbnail.height}
                  alt={`${member.fields.name} | ${member.fields.jobTitle}`}
                  className="w-full h-auto"
                />
                <div className="flex flex-col absolute bottom-0 left-0 text-light p-md uppercase">
                  <div>{member.fields.name}</div>
                  <div>{member.fields.jobTitle}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

type SectionProps = {
  title?: string;
  content: string | string[];
  type: "column" | "feature" | "team";
};

function Section({ section }: { section: SectionProps }) {
  const formatContent = () => {
    if (typeof section.content === "string") {
      return (
        <div
          className={clsx("flex flex-col gap-4", {
            feature: section.type === "feature",
          })}
        >
          <Markdown>{section.content}</Markdown>
        </div>
      );
    } else if (Array.isArray(section.content)) {
      return (
        <div className="flex flex-col uppercase">
          {section.content.map((c) => (
            <div key={c}>{c}</div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      key={section.title}
      className={clsx("", {
        "grid grid-cols-[1fr_2fr]": section.type === "column",
        "flex w-full items-center justify-center grow": section.type === "feature",
      })}
    >
      {section.type !== "feature" ? <div className="uppercase">{section.title}</div> : null}
      {formatContent()}
    </div>
  );
}

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const aboutInfo = useStore((state) => state.about);

  console.log(aboutInfo);

  const navigate = useNavigate();

  if (!aboutInfo[0]) {
    navigate("/");
    return null;
  }

  const sections: {
    title?: string;
    content: string | string[];
    type: "column" | "feature" | "team";
  }[] = [
    {
      title: "Who We Are",
      content: aboutInfo[0].fields.whoWeAre,
      type: "column",
    },
    {
      title: "Headline 1",
      content: aboutInfo[0].fields.headline1,
      type: "feature",
    },
    {
      title: "Services",
      content: aboutInfo[0].fields.services,
      type: "column",
    },
    {
      title: "Select Clients",
      content: aboutInfo[0].fields.clients,
      type: "column",
    },
    // {
    //   title: "Headline 2",
    //   field: "headline2",
    //   type: "feature",
    // },
  ];

  const section: {
    title?: string;
    content: string | string[];
    type: "column" | "feature" | "team";
  } = {
    title: "Headline 2",
    content: aboutInfo[0].fields.headline2,
    type: "feature",
  };

  return (
    <div className="flex flex-col">
      <div className="w-full h-screen flex items-center justify-center"></div>
      <div className="flex flex-col bg-mid gap-60 pb-70">
        <div className="flex flex-col p-md pt-20 gap-60">
          {sections.map((section) => (
            <Section key={section.title} section={section} />
          ))}
        </div>

        <Team />

        <Section section={section} />
      </div>
    </div>
  );
};

export default About;
