---
title: Soft Proof
date: 2017.10.29
template: _templates/article.html
block: text
description: Translations and compromises in image making or; the Image Cult Society.
---

There's an interesting thing that happens when a new idea or technology gets introduced, than quickly assimilated into the background hum of our daily lives. It starts out with a discreet name — a clear identifier of what this thing is and means. Than this name just sort of ... slips away. It becomes so normal that to name it would seem strange. Its original name doesn't seem to fit any more, as the name existed in the first place to demarcate the new thought from the ordinary. And now the new thing is just ordinary. Think about Google Maps. It's just ... a map. In 2005, when Google Maps was first released, it's particular approach to the interface of a digital map was called a 'slippy map'. Weird, right?

This is an interesting phenomenon around cultural approaches to technology, but not actually what I want to talk about. I want to talk about soft proofs. Soft proofs are an example of this taken to an extreme – you use them every day but you have probably never heard of them. There is no need for the soft proof to be something other than normal, the soft proof just *is* normal. But what is a soft proof, and why is so normal? And why do I want to explore a topic so quotidian that the word used to mark it as interesting is so faded and worn?

A soft proof is a way of viewing an image before the image has been reproduced mechanically. In contrast to the soft proof is the hard proof: a way of viewing an image immediately after it's been reproduced mechanically. Basically, a soft proof is an image on a screen that will be sent to a printer. Otherwise known as an image. It's need for a discreet name seems so unnecessary that it seems bizarre to refer to all images - even this text as I write it – as soft proofs. But that is, in essence, what they are. We see images on our screens that an be reliable turned into images on other peoples screens, and even into physical images on paper.

The reason why this needed a name to demarcate it as special, with the advent of the digital image, is that this is a really hard problem to solve. There are a range of mathematical models for approaching a relatively unified theory of color and vision, and a wide range of physical pieces of machinery that are tasked with producing those images — from printing presses to monitors. The act of ensuring an image can be predictably reproduced is necessarily an act of translation. Translating from this color space to that; from an additive color model of a screen to the subtractive color model of ink and paper; approximating the color of a paper stock to be printed on.

This translating process is done using something called a Color Profile. A Color Profile is a set of rules for ensuring that an image created with red, green, and blue light can be replicated on off-white paper using cyan, magenta, yellow, orange, and green inks. The current workflow of digital to print is so smooth, so ubiquitous and mundane, as to occlude the massive technological feat that it supports it.

<!-- Color Profiles as we use them are defined b -->


<!-- The ubiquity go this process, the decisions of consortium that settled on it. **research here: the history of the current profiles, adobe, apple, etc** -->

<!-- > The tristimulus theory of human color perception says that any color that humans can see, can be reproduced, or "matched", by some combination of Red, Blue, and Green single-wavelength light beams. The wavelengths used to make the red, blue and green light beams are called "primaries". -->

<!-- > To summarize: The actual 1931 CIE XYZ human color space can be used to create a matrix camera profile that describes any given camera sensor's response to light, as determined by profiling the camera. But an accurate camera profile requires using negative XYZ tristimulus values. If the CIE had moved the XYZ color space farther into the positive numbers, then today's camera input matrices wouldn't require negative tristimulus values. -->

<!-- > The International Commission on Illumination (usually abbreviated CIE for its French name, Commission internationale de l'éclairage) is the international authority on light, illumination, color, and color spaces. It was established in 1913 as a successor to the Commission Internationale de Photométrie -->

<!-- > The International Color Consortium was formed in 1993 by eight industry vendors in order to create an open, vendor-neutral color management system which would function transparently across all operating systems and software packages. . . . The eight founding members of the ICC were Adobe, Agfa, Apple, Kodak, Microsoft, Silicon Graphics, Sun Microsystems, and Taligent. -->

<!-- > Before the ICC released its V2 color profile specifications in 1994, color management was handled "in-house" by all the big establishments who made prints from digital files (those were prints on paper, remember paper?), such as magazines, newspapers, and fine art print-makers. And every company that made prints on paper from digital files had its own procedures for handling color management. In the 1990s, those digital image files were produced by scanning film. Digital cameras were not yet in widespread use: -->

<!-- > In 1991, Kodak brought to market the Kodak DCS-100, the beginning of a long line of professional Kodak DCS SLR cameras that were based in part on film bodies . . . It used a 1.3 megapixel sensor and was priced at $13,000 -->

<!-- > 1999 saw the introduction of the Nikon D1, a 2.74 megapixel camera that was the first digital SLR developed entirely by a major manufacturer, and at a cost of under $6,000 at introduction was affordable by professional photographers and high-end consumers. -->

<!-- > It is easy to see why in the early and mid 1990s the manufacturers of digital imaging hardware (monitors, scanners, and the not-yet-ready-for-prime-time digital cameras) and especially software (the first color-managed version of Adobe Photoshop came out in 1998) wanted to standardize color management: selling new hardware and software is a lot easier if the company doing the buying doesn't have to completely revamp their in-house color management procedures. -->

<!-- >  the ICC excluded negative XYZ values from V2 color profiles because negative numbers would have placed an additional computing burden on the hardware and software in use in the early 1990s. -->

<!-- > Elle Stone https://ninedegreesbelow.com/photography/icc-profile-negative-tristimulus.html#luther -->

<!-- > Many of these issues give me the feeling at times of reluctant rather than open co-operation between some of the companies that created this standard. Having said that, there does seem enough information in the public standard (when combined with examining available existing  profiles) to effectively and accurately characterize color profiles of devices and color spaces. I could imagine there being some poor results at times though, due to some looseness in the spec. -->

<!-- >  Graeme Gill https://argyllcms.com/icc_problems.html -->

<!-- > ICC Founding Members:
	Adobe Systems Incorporated (Silicon Valley)
	Agfa Graphics N.V.  (German)
	Apple Computer, Inc (Silicon Valley)
	Eastman Kodak Company (Silicon Valley)
	Microsoft Corporation (Seattle)  -->
<!-- Also: https://en.wikipedia.org/wiki/International_Commission_on_Illumination -->

The current, baseline profiles built around RGB and CMYK came about with the rise of digital image-making, which is the basis of the the current world around us, a world built on and predicated by images.

The dominant translation _is_ dominant because it — to a large degree — works. Creating color profile is really hard, mathy, phsysicsy stuff. It's hard to do yourself. But CMYK/RGB cuts the corners off the world to make it fit into a gamut that can be handled. But by necessity it's a compromise: what colors are we not handling in order to handle the maximum number of colors? What parts of the color space get left behind?

Its important to understand this compromise; understand how it works and what exchange we're making in the process. What ae we giving up, and what are we getting in return?

What are we leaving on the table? For example, photography (up until the 80's)calibrated for white people. African Americans and other dark skinned people photographed poorly. They were outside the color space.

> Film chemistry, photo lab procedures, video screen colour balancing practices, and digital cameras in general were originally developed with a global assumption of ‘Whiteness.’”

[— Looking at Shirley, the Ultimate Norm: Colour Balance, Image Technologies, and Cognitive Equity, Lorna Roth](http://www.cjc-online.ca/index.php/journal/article/view/2196)

<!-- > “If you exposed film for a white kid, the black kid sitting next to him would be rendered invisible except for the whites of his eyes and teeth." -->

<!-- > Adamn Broomberg -->

<!-- > Kathy Connor, an executive at Kodak, told Roth the company didn’t develop a better film for rendering different gradations of brown until economic pressure came from a very different source: Kodak’s professional accounts. Two of their biggest clients were chocolate confectioners, who were dissatisfied with the film’s ability to render the difference between chocolates of different darknesses. “Also,” Connor says, “furniture manufacturers were complaining that stains and wood grains in their advertisement photos were not true to life.” -->

<!-- > Rosie Cima https://priceonomics.com/how-photography-was-optimized-for-white-skin/ -->

How do we understand the implicit, invisible, baked in assumptions of the soft proof? We can start to operate outside the parameters of the soft proof, recognize it as a tool to use or not use.

The Risograph has a toolchain for soft proofing, but the machine— through its high speed & low cost — also opens up the possibility of designing images through iterative hard proofs; blending the techniques go the modern digital print process with the classical analog ones.

The web is a strange medium – a blending of soft and hard spaces. A plastique space, with plastic proofs and plastic copies. The same process of translation is at work — between the still & the interactive, flowing image.

The gap between the soft proof & the hard copy (or the plastique product) is measured in the gap between the tools used to plan & prepare versus the tools used to produce.

This is why showing comps & wireframes of websites to clients can be so tricky: our culture of image cult and tehnological process can elide the critical differences we sense as agents of these systems.

This is a call for a Marxism of image making — to seize the means of production. To create radical images & tools that exist in the corners of the gamut and color spaces discarded by the soft proof.