// Rewrite catalog: specifiers from the MCP SDK fork's unpublished packages.
// pnpm replaces catalog: with real versions only during `pnpm publish`;
// git-installed packages retain the raw protocol, which is unresolvable
// outside the original workspace.
const catalogMap = {
  'catalog:runtimeShared': {
    'zod': '^4.0',
    '@cfworker/json-schema': '^4.1.1',
  },
  'catalog:runtimeServerOnly': {
    '@hono/node-server': '^1.19.9',
    'hono': '^4.11.4',
  },
};

function resolveCatalog(deps) {
  if (!deps) return false;
  let changed = false;
  for (const [name, spec] of Object.entries(deps)) {
    if (typeof spec === 'string' && spec.startsWith('catalog:')) {
      const catalog = catalogMap[spec];
      if (catalog && catalog[name]) {
        deps[name] = catalog[name];
        changed = true;
      }
    }
  }
  return changed;
}

function readPackage(pkg, context) {
  let changed = false;
  changed = resolveCatalog(pkg.dependencies) || changed;
  changed = resolveCatalog(pkg.peerDependencies) || changed;
  changed = resolveCatalog(pkg.devDependencies) || changed;
  if (changed) {
    context.log('Rewrote catalog: specifiers in ' + pkg.name);
  }
  return pkg;
}

module.exports = { hooks: { readPackage } };
