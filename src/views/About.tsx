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

  const info = aboutInfo[0];

  const sections: {
    title?: string;
    content: string | string[];
    type?: "column" | "feature";
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
  ];

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
        <Cover media={info.fields.splashImage}>
          <div className="hidden md:flex absolute w-full h-full top-0 left-0 items-center justify-center">
            <div className="feature text-light">
              <WordAnimation text={info.fields.splashText} />
            </div>
            {/* <Copy copy={info.fields.splashText} feature className="text-light" /> */}
          </div>
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

          {/* <Section title="Headline 2" type="feature">
            <Copy copy={info.fields.headline2} feature />
          </Section> */}
        </div>
      </div>
    </>
  );
};

export default About;
