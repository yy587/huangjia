import fs from "node:fs";
import postcss from "postcss";

const file = new URL("../app/catalog.css", import.meta.url);
const root = postcss.parse(fs.readFileSync(file, "utf8"), { from: file.pathname });
const obsoleteSelector = /(?:^|[^a-z-])(?:\.trade(?:-|\b)|\.contact-dock(?:-|\b))/i;

root.walkRules((rule) => {
  const selectors = rule.selectors.filter((selector) => !obsoleteSelector.test(selector));
  if (!selectors.length) rule.remove();
  else if (selectors.length !== rule.selectors.length) rule.selectors = selectors;
});

root.walkComments((comment) => {
  if (/trade guide|international procurement/i.test(comment.text)) comment.remove();
});

function removeOverriddenDeclarations(container) {
  const seenBySelector = new Map();
  const nodes = [...(container.nodes || [])];

  for (let index = nodes.length - 1; index >= 0; index -= 1) {
    const node = nodes[index];
    if (node.type === "atrule") removeOverriddenDeclarations(node);
    if (node.type !== "rule" || !node.parent) continue;

    const key = node.selector;
    const seen = seenBySelector.get(key) || new Map();
    const declarations = node.nodes?.filter((child) => child.type === "decl") || [];

    for (const declaration of declarations) {
      const later = seen.get(declaration.prop);
      if (!later) continue;
      if (!declaration.important || later.important) declaration.remove();
    }

    if (!node.nodes?.some((child) => child.type === "decl" || child.type === "atrule")) {
      node.remove();
      continue;
    }

    for (const declaration of declarations) {
      if (!declaration.parent) continue;
      const later = seen.get(declaration.prop);
      seen.set(declaration.prop, {
        important: Boolean(declaration.important || later?.important)
      });
    }
    seenBySelector.set(key, seen);
  }
}

removeOverriddenDeclarations(root);
root.walkAtRules((rule) => {
  if (!rule.nodes?.length) rule.remove();
});

fs.writeFileSync(file, root.toString());
