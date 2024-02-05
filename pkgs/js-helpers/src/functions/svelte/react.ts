/* this is a helper for svelte $: syntax.
 * tsc would complain about a function fn :() => void
 * $: fn(reactsToThis);
 * but not about
 * $: react (fn, reactsToThis);
 */
 /* @__NO_SIDE_EFFECTS__ */
export const react = (fn :() => void, ...args :any[]) :void => {
  fn ();
  void args;
};

