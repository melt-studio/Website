import ProjectTile from "./ProjectTile";
import { useStore } from "../stores/store";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
// import { MathUtils } from "three";
import { seededRandom } from "three/src/math/MathUtils.js";
import { Easing, motion } from "motion/react";
// import { ProjectFormatted } from "../types";

// export type TileLayout = {
//   row: number;
//   col: number;
//   colSpan: number;
//   colStart: number;
//   colEnd: number;
//   marginTop: number;
//   marginLeft: number;
// };

export type TileLayout = {
  w: number;
  w2: number;
  off: number;
  // start: number;
  // end: number;
  row: number;
  colStart: number;
  colEnd: number;
  marginTop: number;
  marginLeft: number;
  grid: number;
};

function getRandomInt(min: number, max: number, seed = 0) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(seededRandom(seed) * (max - min + 1)) + min;
}

const ProjectTiles = () => {
  const projects = useStore((state) => state.projects);
  const setValue = useStore((state) => state.setValue);

  const [active, setActive] = useState<string | null>(null);
  const projectTiles = useRef<HTMLDivElement | null>(null);

  // const layout: TileLayout[] = useMemo(() => {
  //   if (!projects) return [];

  //   return projects.reduce((layout, project, i) => {
  //     const row = Math.floor(project.index / 2);
  //     const col = project.index % 2;
  //     const cols = 34;
  //     const gap = getRandomInt(2, 5, row);
  //     const offLeft = getRandomInt(0, 4, row + 4) + 2;
  //     const offRight = getRandomInt(0, 4, row + 8);
  //     const available = cols - gap - offLeft;
  //     let ratio = (seededRandom(row + 9) * 1) / 6 + 0.5;

  //     const weight2 = seededRandom(row + 12) < 0.5;

  //     if (weight2 && col === 0) ratio = 1 - ratio;

  //     let colSpan, colStart, colEnd, marginTop, marginLeft;
  //     if (col === 0) {
  //       colSpan = Math.floor(available * ratio) + 1;
  //       colStart = 1 + offLeft;
  //       colEnd = colStart + colSpan;
  //       marginTop = -getRandomInt(0, 10, project.index + row + col + 3);
  //       marginLeft = getRandomInt(0, 10, project.index + row + col + 2);
  //     } else {
  //       const prev = layout[i - 1];
  //       colSpan = available - prev.colSpan - offRight;
  //       colStart = prev.colEnd + gap + 0;
  //       colEnd = colStart + colSpan;
  //       marginTop = getRandomInt(0, 10, project.index + row + col - 2);
  //       marginLeft = -getRandomInt(0, 10, project.index + row + col - 1);
  //     }
  //     return layout.concat({
  //       row,
  //       col,
  //       colSpan,
  //       colStart,
  //       colEnd,
  //       marginTop,
  //       marginLeft,
  //     });
  //   }, [] as TileLayout[]);
  // }, [projects]);

  const layout2: TileLayout[] = useMemo(() => {
    if (!projects) return [];

    const rows: TileLayout[][] = [];
    let count = 0;
    const grid = 40;

    // 6, 22, 24, 25
    const seed = 123;

    while (count < projects.length) {
      const colsLast = rows.length > 0 ? rows[rows.length - 1].length : -1;
      const options = [1, 2, 3].filter((i) => i !== colsLast);
      let cols;
      if (rows.length === 0) cols = 1;
      // else if (projects.length - count <= 3) cols = projects.length - count;
      else cols = options[getRandomInt(0, options.length - 1, rows.length + seed)];
      let n = grid;
      let n2 = 0;
      // let row = []
      const i = rows.length;

      // const rowProjects = projects.slice(count, count + cols);

      const row: TileLayout[] = [];
      for (let j = 0; j < cols; j++) {
        const last = j > 0 ? row[j - 1] : null;
        const w = j === cols - 1 ? n : Math.floor(n / (cols - j)) + getRandomInt(-2, 2, count + seed);
        const w2 =
          cols === 1
            ? getRandomInt(Math.floor(w / 3), Math.floor(w / 2), count + 50 + i + seed)
            : getRandomInt(Math.floor(w / (cols === 2 ? 1.5 : 1.25)), w - 1, count + 50 + i + seed);
        const off =
          i === 0
            ? Math.floor((w - w2) / 2) + getRandomInt(-1, 1, count + 200 - j + i + seed)
            : getRandomInt(last && last.off + last.w2 === last.w ? 1 : 0, w - w2, count + 150 + j + i + seed);
        const start = n2 + off + 1;
        const end = start + w2;

        // row.push({ w, w2, off, start, end });
        row.push({
          grid,
          row: i,
          off,
          w2,
          w,
          colStart: start,
          colEnd: end,
          marginTop: getRandomInt(-10, 10, count + i + j + w - 2),
          marginLeft: 0,
        });
        n -= w;
        n2 += w;
        count++;
      }

      rows.push(row);
    }

    const layout2 = rows.flat();

    // console.log(layout2);

    return layout2;
  }, [projects]);

  useEffect(() => {
    if (projectTiles.current) {
      setValue("projectTiles", projectTiles.current);
    }
  }, [projectTiles, setValue]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: "some", once: false }}
      transition={{ duration: 2, ease: "easeInOut" as Easing }}
      className={clsx("flex md:gap-10 pt-40 pb-40 w-full justify-around relative z-2 px-2 max-w-[2560px] mx-auto")}
      ref={projectTiles}
    >
      <div className="grid grid-cols-[repeat(40,_1fr)] w-full h-auto items-start px-2.5 gap-y-[0.5rem] max-w-[1920px]">
        {projects.map((project, i) => (
          <ProjectTile key={project.id} project={project} layout={layout2[i]} active={active} setActive={setActive} />
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectTiles;
