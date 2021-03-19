---
title: prefers-reduced-motion; Taking a no-motion-first approach to animations
slug: mac/prefers-reduced-motion
source: https://tatianamac.com/posts/prefers-reduced-motion/
author: Tatiana Mac
year: 2021
tags: internet, design, a11y, accessibility, css, development
thesis: Use the prefers-reduced-motion media query to help guide your animation principles. By default, do not include animations, which should only be approached as a progressive enhancement.
---

While animations can be quite powerful tools for communication relationships and building a brand, Mac notes that "Animations, especially when overused and abused, can make people very ill."

Mac notes that in their practice, the guiding approach is to default to the users explicit preferences:

> A core accessibility approach of mine is to let the user determine what's best for them and to enable as many user settings as I can. Most operating systems allow us to reduce the motion and have for a very long time.

It's hard to find argument with this. This is clearly a good principle. This article will focus on `prefers-reduced-motion`, but its worth taking a note here that there are others which should be explored and expanded on, perhaps a project for another day.

Mac leads with the two values for `prefers-reduced-motion` : `no-prefernce` and `reduced`. Importantly, Mac notes:

> I want to make a critical note here that this is operating on a no-consent model. Ew. The user hasn't necessarily opted into animations. They just haven't checked "Reduce motion." That could be because they like and can tolerate animations, or, it's equally possible the user doesn't know about this setting. So, I want us to make sure we're not assuming that these users necessarily want animations.

Mac cuts through what could easily be bad assumptions at the beginning of a project. Thinking carefully about what our starting assumptions — our front end axioms if you will — _actually are and are not_ is of critical importance. 

> Start with No Motion … When I collaborate with a designer/animator on an animation, I first ask, "Is this animation critical to understanding the content?" … More often than not, the answer is "no." … When conceived well, animations should be an enhancement to an explanation.

Mac will then default to `animation: none`, removing all animation entirely. Therefor, following the `first` methodology, we only _add_ animation if the user settings are explicit about `no-preference`. Mac notes that the `first` methodology means that for older browsers without support for the media query, we default to the _more accessible_ option. This is related to [Pickering's explanation of Progressive Enhancement.](/bibliography/pickering/is-progressive-enhancement-dead-yet).

Mac than notes that we can remove _all_ the animations from the base style sheet bundle, and only serve them _if the user has `no-preference` set_

```
<link
  rel="stylesheet"
  href="animations.css"
  media="(prefers-reduced-motion: no-preference)"
/>
```

This is rather clever, because it creates an argument from performance for following a principle for accessibility. 

Mac then fleshes out a scenario where the designer has determined that the animation is in fact _critical_ to the interaction. My favorite question to ask in this case (and Mac's "spiciest" is their direct and to the point "If the animation can't load for someone or they can't see it, what was your plan?".

Mac than moves to exploring other, non-css based animations:

- Auto-playing video: Don't do it. Just, don't do it.
- JavaScript animations: find a way to respect the setting, those tools are there. My take: don't do it.

Mac ends the article with their own references. 

I particularly like and am compelled by Mac's argument that "by default we should do the most accessible thing" which is very close to my own principle of "do as little as possible" or "keep it stupid simple", as well as Mac's commitment to knowing what the user settings are and respecting _all of them_. I for one have more to learn in this regard.