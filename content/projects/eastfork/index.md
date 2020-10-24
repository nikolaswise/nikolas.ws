---
title: East Fork Pottery
slug: eastfork-pottery
date: 2018.06.25
site: https://eastforkpottery.com
description: Pushing the Shopify platform to its limits to create a smooth and playful experience.
---

Alex & Connie Mattisse run Eastfork Pottery out of Asheville, NC. They both have a strong design sense, and a clear understanding of their brands identity and point of view. 

This meant that the challenges of this project centered around pushing Shopify towards a more contemporary client-side user experience, including lazy-loading grid items and smooth client-side page transitions.

![home](https://photos.smugmug.com/Projects/Eastfork/i-cP8LrmX/0/ddeae95c/X5/home-X5.png)

The project had a strong editorial design aspect, simple layout with strong typography and photography.

![pottery](https://photos.smugmug.com/Projects/Eastfork/i-vQ7T4bm/0/d731ecea/X5/pottery-X5.png)

The catalog view used a staggered grid that repeated every 15 items. This meant I needed to request paginated sets of items in multiples of 15, then repeat the layout within the pages. 

![modal](https://photos.smugmug.com/Projects/Eastfork/i-hCHnw2C/0/2caa267e/X5/modal-X5.png)

A quick shopping modal from the catalog view allows for browsing and adding items to the cart without going back and forth to individual item pages. The color option swatches swap the active image for quickly previewing the many colorways.

![description](https://photos.smugmug.com/Projects/Eastfork/i-zQQcHhf/0/e406a0b6/X5/description-X5.png)

The product detail pages needed to carry the editorial feel, and allow for the voice to exist for products.  

[TK] The registry

[TK] The animated logo goodness.

![cart](https://photos.smugmug.com/Projects/Eastfork/i-GFMq4LN/0/7f9fd3c9/X3/cart-X3.png)

The UX for the cart needed to avoid the standard form submission for updating the cart contents. Abstracting the cart interactions into an API that can be called by use actions on the DOM was critical – and allowed us to have natural update methods tied directly to input interactions.

[TK] The quiz thingy, and the need to add arbitrary data to the cart that gets carried through to the packing manager.

[TK] The add a gift card bit

![about](https://photos.smugmug.com/Projects/Eastfork/i-BwfNf2t/0/a59a20e1/X5/about-X5.png)

Another interesting design moment was the image treatment on the long-form content pages. Each page as a unique colorway in reference to the season glazes (configurable for each section from the Shopify Admin interface), and the images are a gray-scaled and multiplied over the background color. On hover, the image transitions to a full-color treatment. Animating the transition between these sates is tricky – CSS blend modes cannot be transitioned as they are binary states. The effect is achieved by having _two_ images, one with the multiply & grayscale, and one full-color but transparent positioned above it. On hover, the opacity of the top image is transitioned, providing the desired effect.