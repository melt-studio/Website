import { Color } from "three";
import { ProjectAirtable, ProjectFormatted } from "../types";

const getBrightness = (color: Color) => {
  return color.r * 0.2126 + color.g * 0.7152 + color.b * 0.0722;
};

export const formatProjects = (projects: ProjectAirtable[]): ProjectFormatted[] => {
  const projectedFormatted = projects.map((project, i) => {
    const n = projects.length;
    const index = i;
    const next = n > 0 ? projects[(index + 1) % n].fields.projectUrl.toLowerCase() : null;
    const prev = n > 0 ? projects[(index - 1 + n) % n].fields.projectUrl.toLowerCase() : null;
    const primary = new Color(project.fields.backgroundColor.split(",")[0].trim());
    const brightness = getBrightness(primary);

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

    const theme = project.fields.backgroundColor.split(",").map((c) => c.trim());
    const theme2: [string, string] = [theme[0], theme[1] ? theme[1] : theme[0]];

    return {
      ...project,
      index,
      next,
      prev,
      contrast: text,
      theme: theme2,
    };
  });

  return projectedFormatted;
};
