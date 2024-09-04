export const options = {
  groupOrder: [
    "style",
    "asset",
    "sideEffect",
    "namespace",
    "named",
    "namedClass",
    "icons",
    "type",
  ],
  groups: {
    asset: {
      label: "### Assets",
      priority: 0,
    },
    icons: {
      label: "### Icons",
      priority: 1,
      rxSource: "/^(@fortawesome|@phosphor|phosphor-)/",
    },
    named: {},
    namedClass: {
      priority: 1,
    },
    style: {
      priority: 2,
    },
    type: {
      label: "### Types",
      priority: 0,
    },
  },
  separateGroups: true,
  useLabels: true,
};
