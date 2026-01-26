import ProjectTile from "./ProjectTile";
import { useStore } from "../stores/store";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { seededRandom } from "three/src/math/MathUtils.js";
import { Easing, motion } from "motion/react";
import config from "../config.json";

export type TileLayout = {
  w: number;
  w2: number;
  off: number;
  row: number;
  colStart: number;
  colEnd: number;
  marginTop: number;
  marginLeft: number;
  grid: number;
  orientation: "landscape" | "portrait";
};

function getRandomInt(min: number, max: number, seed = 0) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(seededRandom(seed) * (max - min + 1)) + min;
}

const ProjectTiles = () => {
  const allProjects = useStore((state) => state.projects);
  const viewport = useStore((state) => state.viewport);

  const projects = allProjects.filter(
    (project) => project.fields.projectThumbnail !== undefined && project.fields.projectThumbnail.length > 0
  );

  const [active, setActive] = useState<string | null>(null);
  // const projectTiles = useRef<HTMLDivElement | null>(null);

  const layout: TileLayout[] = useMemo(() => {
    if (!projects) return [];

    const rows: TileLayout[][] = [];
    let count = 0;
    const grid = 40;

    // 6, 22, 24, 25
    const seed = 123;

    while (count < projects.length) {
      const cols = viewport.width < config.breakpoints.mobile ? 1 : (rows.length % 2) + 1;
      let n = grid;
      let n2 = 0;
      const i = rows.length;

      const orientations = projects.slice(count, count + cols).map((p) => {
        const thumbnails = p.fields.projectThumbnail;

        const thumb = thumbnails[0];
        if (thumb.type.includes("image/")) {
          const aspect = thumb.thumbnails.large.width / thumb.thumbnails.large.height;
          return aspect > 1 ? "landscape" : "portrait";
        } else if (thumb.type.includes("video/")) {
          return thumb.filename.includes("[landscape]") ? "landscape" : "portrait";
        }

        return "portrait";
      });

      const row: TileLayout[] = [];
      for (let j = 0; j < cols; j++) {
        const landscape = orientations[j] === "landscape";

        let w;
        if (j === cols - 1) w = n;
        else w = Math.floor(n / (cols - j));
        let w2 = landscape ? 18 : 12;
        if (viewport.width < config.breakpoints.mobile) {
          w2 = landscape ? 30 : 20;
        }
        const off = i === 0 ? Math.floor((w - w2) / 2) : getRandomInt(1, w - w2 - 1, count + 150 + j + i + seed);
        const start = n2 + off + 1;
        const end = start + w2;

        row.push({
          grid,
          row: i,
          off,
          w2,
          w,
          colStart: start,
          colEnd: end,
          marginTop: getRandomInt(
            0,
            landscape && cols > 1 ? (viewport.width < config.breakpoints.mobile ? 10 : 20) : 10,
            count + i + j + w - 2
          ),
          marginLeft: 0,
          orientation: orientations[j],
        });
        n -= w;
        n2 += w;
        count++;
      }

      rows.push(row);
    }

    const layout = rows.flat();

    return layout;
  }, [projects, viewport]);

  // useEffect(() => {
  //   if (projectTiles.current) {
  //     setValue("projectTiles", projectTiles.current);
  //   }
  // }, [projectTiles, setValue]);

  if (projects.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: "some", once: false }}
      transition={{ duration: 2, ease: "easeInOut" as Easing, delay: 0 }}
      className={clsx("flex md:gap-10 pt-30 pb-40 w-full justify-around relative z-2 px-2 max-w-[2560px] mx-auto")}
      // ref={projectTiles}
    >
      <div className="grid grid-cols-[repeat(40,_1fr)] w-full h-auto items-start px-2.5 gap-y-[4rem] max-w-[1920px] relative">
        {projects.map((project, i) => (
          <ProjectTile key={project.id} project={project} layout={layout[i]} active={active} setActive={setActive} />
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectTiles;
