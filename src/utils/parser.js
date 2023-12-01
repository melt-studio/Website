export const parseLinks = (links) => {
  return links
    .trim()
    .split("\n")
    .map((c) => {
      const text = c.substring(1, c.indexOf("]"));
      let href = c.substring(c.indexOf("]") + 2, c.length - 2);
      if (href.includes("tel:")) {
        href = href.substring(href.indexOf("tel:"));
      }

      return {
        text,
        href,
      };
    });
};
