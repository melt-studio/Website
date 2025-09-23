import ProjectTile from "./ProjectTile";
import { useStore } from "../stores/store";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
// import { MathUtils } from "three";
import { seededRandom } from "three/src/math/MathUtils.js";

export type TileLayout = {
  row: number;
  col: number;
  colSpan: number;
  colStart: number;
  colEnd: number;
  marginTop: number;
  marginLeft: number;
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

  const layout: TileLayout[] = useMemo(() => {
    if (!projects) return [];

    return projects.reduce((layout, project, i) => {
      const row = Math.floor(project.index / 2);
      const col = project.index % 2;
      const cols = 36;
      const gap = getRandomInt(2, 5, row);
      const offLeft = getRandomInt(0, 4, row + 4) + 2;
      const offRight = getRandomInt(0, 4, row + 8);
      const available = cols - gap - offLeft;
      let ratio = (seededRandom(row + 9) * 1) / 6 + 0.5;

      const weight2 = seededRandom(row + 12) < 0.5;

      if (weight2 && col === 0) ratio = 1 - ratio;

      let colSpan, colStart, colEnd, marginTop, marginLeft;
      if (col === 0) {
        colSpan = Math.floor(available * ratio) + 1;
        colStart = 1 + offLeft;
        colEnd = colStart + colSpan;
        marginTop = -getRandomInt(0, 10, project.index + row + col + 3);
        marginLeft = getRandomInt(0, 10, project.index + row + col + 2);
      } else {
        const prev = layout[i - 1];
        colSpan = available - prev.colSpan - offRight;
        colStart = prev.colEnd + gap + 0;
        colEnd = colStart + colSpan;
        marginTop = getRandomInt(0, 10, project.index + row + col - 2);
        marginLeft = -getRandomInt(0, 10, project.index + row + col - 1);
      }
      return layout.concat({
        row,
        col,
        colSpan,
        colStart,
        colEnd,
        marginTop,
        marginLeft,
      });
    }, [] as TileLayout[]);
  }, [projects]);

  useEffect(() => {
    if (projectTiles.current) {
      setValue("projectTiles", projectTiles.current);
    }
  }, [projectTiles, setValue]);

  return (
    <div className={clsx("flex md:gap-10 pt-40 pb-40 w-full justify-around relative z-2 px-sm")} ref={projectTiles}>
      <div className="grid grid-cols-[repeat(40,_1fr)] w-full h-auto items-start gap-y-[2rem] max-w-[1920px]">
        {projects.map((project, i) => (
          <ProjectTile key={project.id} project={project} layout={layout[i]} active={active} setActive={setActive} />
        ))}
      </div>
    </div>
  );
};

export default ProjectTiles;
