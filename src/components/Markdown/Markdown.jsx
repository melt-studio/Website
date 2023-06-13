import ReactMarkdown from "react-markdown";
import { cursorEvents } from "../Cursor/Cursor";

const Markdown = ({ props, children }) => {
  return (
    <ReactMarkdown
      components={{
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
