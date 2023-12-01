const FadeDiv = ({ className, duration, delay, stagger, damping, i = 0, children }) => {
  return (
    <div
      className={className}
      style={{
        animationDelay: `${stagger ? delay + i * damping * duration : delay}s`,
        transitionDelay: `${stagger ? delay + i * damping * duration : delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const FadeIn = ({
  name,
  duration = 1,
  delay = 0,
  easing = "ease",
  stagger = false,
  damping = 0,
  row = false,
  children,
}) => {
  if (children === undefined) return null;

  const className = `css-${name}`;
  const settings = {
    className,
    duration,
    delay,
    stagger,
    damping,
  };

  // Add style for animation if doesn't already exist
  const css = document.getElementById(className);
  if (!css) {
    const style = document.createElement("style");
    style.setAttribute("id", className);
    style.textContent = `
        .${className} {
          animation: ${name} ${duration}s ${easing} ${delay}s 1 both;
        }
      `;
  }

  if (typeof children === "string" || !children.length || row) {
    return <FadeDiv {...settings}>{children}</FadeDiv>;
  }

  const mapped = children.map((child, i) => {
    return [
      <FadeDiv {...settings} key={i} i={i}>
        {child}
      </FadeDiv>,
    ];
  });

  return mapped;
};

export default FadeIn;
