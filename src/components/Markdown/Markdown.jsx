import ReactMarkdown from "react-markdown";
import { cursorEvents } from "../Cursor/Cursor";

const Markdown = ({ props, children }) => {
  return (
    <ReactMarkdown
      components={{
        // p: ({ node, index, siblingCount, ...props }) => {
        //   return (
        //     <FadeIn
        //       key={`fadeIn_${index}_${siblingCount}`}
        //       {...fadeInText}
        //       delay={fadeInText.delay + fadeInText.damping * index}
        //     >
        //       <p {...props} />
        //     </FadeIn>
        //   );
        // },
        a: ({ node, index, siblingCount, ...props }) => {
          return (
            <a
              onMouseEnter={() => cursorEvents.onMouseEnter()}
              onMouseLeave={() => cursorEvents.onMouseLeave()}
              href={props.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.children}
            </a>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
