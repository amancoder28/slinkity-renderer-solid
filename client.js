import { sharedConfig } from 'solid-js';
import { hydrate, render, createComponent } from 'solid-js/web';

export default ({ Component, target, props, children, isSSR }) => {
	// Prepare global object expected by Solid's hydration logic
	if (!window._$HY) {
		window._$HY = { events: [], completed: new WeakSet(), r: {} };
	}
	if (!element.hasAttribute('ssr')) return;

	const fn = !isSSR ? render : hydrate;

	// Perform actual hydration
	let children;

	fn(
		() =>
			createComponent(Component, {
				...props,
				get children() {
					if (childHTML != null) {
						// hydrating
						if (sharedConfig.context) {
							children = element.querySelector('astro-fragment');
						}

						if (children == null) {
							children = document.createElement('astro-fragment');
							children.innerHTML = childHTML;
						}
					}
					return children;
				},
			}),
		target
	);
};