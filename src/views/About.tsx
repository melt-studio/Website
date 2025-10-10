import { useStore } from "../stores/store";
import Cover from "../components/Cover";
import Section from "../components/Section";
import Gallery from "../components/Gallery";
import List from "../components/List";
import Copy from "../components/Copy";
import { WordAnimation } from "../components/WordAnimation";

const About = () => {
  const aboutInfo = useStore((state) => state.about);
  const team = useStore((state) => state.team);

  if (!aboutInfo[0]) return null;

  const { splashImage, splashText, whoWeAre, headline1, services, clients } = aboutInfo[0].fields;

  const sections: {
    title?: string;
    content: string | string[];
    type?: "column" | "feature";
  }[] = [];

  if (whoWeAre !== undefined) {
    sections.push({
      title: "Who We Are",
      content: whoWeAre,
      type: "column",
    });
  }

  if (headline1 !== undefined) {
    sections.push({
      title: "Headline 1",
      content: headline1,
      type: "feature",
    });
  }

  if (services !== undefined) {
    sections.push({
      title: "Services",
      content: services,
      type: "column",
    });
  }

  if (clients !== undefined) {
    sections.push({
      title: "Select Clients",
      content: clients,
      type: "column",
    });
  }

  const gallery = {
    images: team.map((member) => ({
      ...member.fields.photo[0],
      caption: [member.fields.name, member.fields.jobTitle],
    })),
    title: "Our Team",
  };

  return (
    <>
      <title>MELT – About Us</title>
      <div className="flex flex-col">
        <Cover media={splashImage}>
          {splashText && (
            <div className="hidden md:flex absolute w-full h-full top-0 left-0 items-center justify-center">
              <div className="feature text-light">
                <WordAnimation text={splashText} />
              </div>
            </div>
          )}
        </Cover>
        <div className="content">
          {sections.map((section) => (
            <Section key={section.title} title={section.title} type={section.type}>
              {Array.isArray(section.content) ? (
                <List items={section.content} />
              ) : section.type === "feature" ? (
                <div className="feature">
                  <WordAnimation text={section.content} className="feature" />
                </div>
              ) : (
                <Copy copy={section.content} />
              )}
            </Section>
          ))}

          <Gallery {...gallery} />
        </div>
      </div>
    </>
  );
};

export default About;
