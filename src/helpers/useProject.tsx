import { useLocation, useParams } from "react-router";
import { useStore } from "../stores/store";
import { Color } from "three";

const getBrightness = (color: Color) => {
  return color.r * 0.2126 + color.g * 0.7152 + color.b * 0.0722;
};

const useProject = () => {
  const projects = useStore((state) => state.projects);
  const { name } = useParams();
  const project = projects.find((p) => name !== undefined && p.fields.projectUrl.toLowerCase() === name.toLowerCase());
  const location = useLocation();
  const projectPage = name !== undefined && location.pathname.includes("/project/") && project;
  const index = projectPage ? projects.map((p) => p.id).indexOf(project.id) : -1;
  const next = index > -1 ? projects[(index + 1) % projects.length] : null;
  const prev = index > -1 ? projects[(index - 1 + projects.length) % projects.length] : null;
  const color = project && new Color(project.fields.backgroundColor.split(",")[0].trim());
  const brightness = color ? getBrightness(color) : 0;

  const colors = [
    {
      hex: 0x1b1b1b,
      label: "dark",
    },
    {
      hex: 0xc1c1c1,
      label: "mid",
    },
    {
      hex: 0xecece9,
      label: "light",
    },
  ];

  const wcag = 4.5; // AAA = 7:1

  const contrast = colors.map((c) => {
    const b = getBrightness(new Color(c.hex));
    let con = (brightness + 0.05) / (b + 0.05);
    if (b > brightness) con = 1 / con;
    return { ...c, contrast: con, diff: con - wcag, diffAbs: Math.abs(con - wcag) };
  });

  const above = contrast.filter((c) => c.diff > 0);
  const text =
    above.length > 0
      ? above.sort((a, b) => a.diffAbs - b.diffAbs)[0]
      : contrast.sort((a, b) => a.diffAbs - b.diffAbs)[0];

  // .filter((c) => c.contrast > 4.5)
  // .sort((a, b) => a.diffAbs - b.diffAbs)[0];

  // console.log(text);

  let theme = null;
  if (project) {
    theme = project.fields.backgroundColor.split(",").map((c) => c.trim());
  }

  if (!projectPage) return null;

  return {
    projects,
    project,
    index,
    next,
    prev,
    contrast: text,
    theme,
  };
};

export default useProject;
