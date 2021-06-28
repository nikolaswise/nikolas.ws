/* generated by Svelte v3.24.0 */
import {
	SvelteComponent,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal,
	space
} from "svelte/internal";

function create_fragment(ctx) {
	let blockquote0;
	let t1;
	let blockquote1;
	let t3;
	let p2;

	return {
		c() {
			blockquote0 = element("blockquote");
			blockquote0.innerHTML = `<p>Design-system builders should resist the lure of the new. Don’t confuse design-system work with a rebrand or a tech-stack overhaul. The system’s design patterns should be familiar, even boring.</p>`;
			t1 = space();
			blockquote1 = element("blockquote");
			blockquote1.innerHTML = `<p>The job is not to invent, but to curate.</p>`;
			t3 = space();
			p2 = element("p");
			p2.textContent = "When building a design system, the primary job is in working with what’s already existing rather than starting from scratch and greenfielding everything.";
		},
		m(target, anchor) {
			insert(target, blockquote0, anchor);
			insert(target, t1, anchor);
			insert(target, blockquote1, anchor);
			insert(target, t3, anchor);
			insert(target, p2, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(blockquote0);
			if (detaching) detach(t1);
			if (detaching) detach(blockquote1);
			if (detaching) detach(t3);
			if (detaching) detach(p2);
		}
	};
}

const metadata = {
	"title": "The Most Exciting Design Systems Are Boring",
	"author": "Josh Clarg",
	"slug": "the-most-exciting-design-systems-are-boring",
	"year": 2017,
	"source": "https://bigmedium.com/ideas/boring-design-systems.html",
	"thesis": "What it says on the tin.",
	"tags": "design systems, design/development",
	"type": "annotation, bibliography"
};

const { title, author, slug, year, source, thesis, tags, type } = metadata;

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment, safe_not_equal, {});
	}
}

export default Component;
export { metadata };