/* this is a helper for svelte $: syntax.
 * tsc would complain about a function fn :() => void
 * $: fn(dependsOnThis);
 * but not about
 * $: react (fn, dependsOnThis);
 */
export const react = (fn :() => void, ...args :any[]) :void => { fn (); void args; };

