---
title: The Performance Inequality Gap
slug: russel/the-performance-iniquality-gap
author: Alex Russel
year: 2021
source: https://infrequently.org/2021/03/the-performance-inequality-gap/
tags: js, web, developments
thesis: When we construct the digital world to the limits of the best devices, we build a less usable one for the 80+% of the world's users. A rule of thumb limit is ~100KiB of HTML/CSS/fonts and ~300-350KiB of JS (compressed).
---

Russel identifies web performance as a long-standing issue that took new significance a few years back with the combined proliferation of front end frameworks and low-end android phones. Russel identifies that the experience of _being_ on the web is about the whole experience, and any given slowdown in that experience creates a negative impression of the entire experience, raising the stakes of poor performance across the entire web ecosystem.

Russel notes that baseline devices are getting better, but our bundle sizes continue to bloat.

> Median mobile JavaScript payloads have only grown since 2016, now hovering above 400KiB of script transferred, or nearly 2.5MiB of uncompressed JS.

 Russel notes that browsers have gotten a lot better at unpacking and parsing JS:

 > The single largest improvements visible in traces come from improved parsing and off-thread compilation of JavaScript. This step-change, along with improvements to streaming compilation, has helped to ensure that users are less likely to notice the unreasonably-sized JS payloads that "modern" toolchains generate more often than not.

We do end up inducing demand with these better systems: we build to fill the space we have. Russel notes that despite the JS off-thread improvements, main thread tasks (like DOM manipulation and layout paints) remain a significant challenge.

Completely static sites with no requirement on JS for initial paint remains the gold standard in performance.

Russel notes that the standard 3G network of 2017 left a very narrow margin for successfully loading a site in under 5 second:

> The hard floor of that model (~1.6s) came from the contributions DNS, TCP/IP, and TLS connection setup over a then-reasonable 3G network baseline, leaving only 3400ms to work with, fighting Nagle and weak CPUs the whole way. Adding just one extra connection to a CDN for a critical path resource could sink the entire enterprise. Talk about a hard target.

4G has become significantly more prevalent, especially across India. This raises the global baseline significantly due to the enormous number of users there, but raises questions about the state go 4G across African nations. [Open Signal](https://www.opensignal.com/sites/opensignal-com/files/data/reports/pdf-only/data-2020-05/state_of_mobile_experience_may_2020_opensignal_3_0.pdf) suggests that slow-is 4G everywhere is a reasonable assumption.

Another problem with global baseline performance is the age of devices. These devices are a far, far cry from a recent or new iPhone. The Moto G4 remains a reasonable proxy for An Average Device. This remains unchanged since 2016, hence the articles thesis. The top-of-the-line models like my iPhone 11 are accelerating away from the global baseline of the Moto G4, creating a widening performance gap.

> low-end Androids have finally caught up to the iPhone 5 from 2012

Oh god.

> Things continue to get better and better for the wealthy, leaving the rest behind. When we construct a digital world to the limits of the best devices, the worse an experience we build, on average, for those who cannot afford iPhones or $800 Samsung flagships.

Russel transitions into a call to action framed in a moral imperative after noting that the landscape we're building into our devices mirrors the economic and political structures driving our world into the dust.

> As frontenders, our task is to make services that work well for all, not just the wealthy … It's in that spirit that I find it important to build to a strawperson baseline device and network target. Such a benchmark serves as a stand-in until one gets situated data about a site or service's users, from whom we can derive informed conclusions about user needs and appropriate resource budgets.

Russel notes that this is especially important for developers of libraries:

> A global baseline is doubly important for generic frameworks and libraries, as they will be included in projects targeted at global-baseline users, whether or not developers have that in mind.

So buy a Moto G4 or a Moto E6 and test your projects on a 3G cellular network.

Hitting 5s on these devices remains tricky, as a number of connections and efficiency of compiling and running JS can eat up lots of time and reduce the data cap.

> That's a very fine point to balance on, though. A single additional TCP/TLS connection setup in the critical path reduces the amount by 100KiB (as do subsequent critical-path network handshakes) … In practice, you can't actually afford 600KiB of content if your application is build in the increasingly popular "single page app" style.

This leads to the final summary of a budget.

> Conservatively then, assuming at least 2 connections need to be set up (burning ~1400 of our 5000ms), and that script resources are in the critical path, the new global baseline leaves space for ~100KiB (gzipped) of HTML/CSS/fonts and 300-350KiB of JavaScript on the wire (compressed). Critical path images for LCP, if any, need to subtract their transfer size from one of these buckets, with trades against JS bundle size potentially increasing total download budget, but the details matter a great deal. For "modern" pages, half a megabyte is a decent hard budget.

Russel ends optimistically, noting that the broader industry has gotten more serious about real user metrics and attempting to understand the real-world ecosystem across the globe, but calls out specifically the front-end industry professionals and suggests that we all need to put the health of the system before our own desire for comfort.

This site — as of writing this annotation on 2021.03.12 — sends 166kB over the wire and decompresses to 301kB. JavaScript accounts for 62.2kB/188kB (over-the-wire/uncompressed) of that. Importantly, the site itself is completely static — the original page comes over the wire ready to view (with inlined CSS even). On an emulated Moto G4, Lighthouse gives us a time-to-interactive of 1.2s. This is almost entirely due to our use of [Svelte](https://svelte.dev/), and the fact that the homepage has basically no interactions or content. The more involved pages like [the bibliography](/bibliography) and (an art page)[] clock a time-to-interactive of 2.9s and 1.1s respectively — but loading the image takes an incredible 8.3s, pulling down 1.2mB over the wire.