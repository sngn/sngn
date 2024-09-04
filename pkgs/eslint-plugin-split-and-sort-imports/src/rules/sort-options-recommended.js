export const options = {
  groupOrder: [
    "style",
    "asset",
    "sideEffect",
    "namespace",
    "default",
    "named",
    "namedClass",
    "type",
  ],
  groups: {
    asset: {
      priority: 0,
    },
    //"default": {
    //  priority: -1,
    //},
    named: {},
    namedClass: {
      priority: 1,
    },
    //"namespace": {},
    //"sideEffect": {},
    style: {
      priority: 1,
    },
    type: {
      priority: 0,
    },
  },
  separateGroups: true, // TODO make dependent on sort-imports/allowSeparatedGroups
  useLabels: false,
};
