<script context="module">
	export const metadata = {"title":"Soft Proof","slug":"soft-proof","date":"2017.10.29","description":"Translations and compromises in image making or; the Image Cult Society.","type":"text, texts"};
	const { title, slug, date, description, type } = metadata;
</script>
<script>
  import Introduction from '../components/Introduction.svelte'
</script>


<Introduction {metadata} />
<p>There’s an interesting thing that happens when a new idea or technology gets introduced then quickly assimilated into the background hum of our daily lives. It starts out with a discreet name — a clear identifier of what this thing is and means. Than this name just sort of … slips away. It becomes so normal that to name it would seem strange. Its original name doesn’t seem to fit any more, as the name existed in the first place to demarcate the new thought from the ordinary. And now the new thing is just ordinary. Think about Google Maps. It’s just … a map. In 2005, when Google Maps was first released, it’s particular approach to the interface of a digital map was called a ‘slippy map’. Weird, right?</p>
<p>This is an interesting phenomenon around cultural approaches to technology, but not actually what I want to talk about. I want to talk about soft proofs. Soft proofs are an example of this taken to an extreme — you use them every day but you have probably never heard of them. There is no need for the soft proof to be something other than normal, the soft proof just <em>is</em> normal. But what is a soft proof, and why is it so normal? And why do I want to explore a topic so quotidian that the word used to mark it as interesting is so faded and worn?</p>
<p>A soft proof is a way of viewing an image before the image has been reproduced mechanically. In contrast to the soft proof is the hard proof: a way of viewing an image immediately after it’s been reproduced mechanically. Basically, a soft proof is an image on a screen that will be sent to a printer. Otherwise known as an image. It’s need for a discreet name seems so unnecessary that it seems bizarre to refer to all images - even this text as I write it – as soft proofs. But that is, in essence, what they are. We see images on our screens that an be reliably turned into images on other peoples screens, and even into physical images on paper.</p>
<p>The reason why this needed a name to demarcate it as special — during the advent of the digital  — is that this is a really hard problem to solve. There are a range of mathematical models for approaching a relatively unified theory of color and vision, and a wide range of physical pieces of machinery that are tasked with producing those images — from printing presses to monitors. The act of ensuring an image can be predictably reproduced is necessarily an act of translation. Translating from this color space to that; from an additive color model of a screen to the subtractive color model of ink and paper; approximating the color of a paper stock to be printed on.</p>
<p>This translating process is done using something called a Color Profile. A Color Profile is a set of rules for ensuring that an image created with red, green, and blue light can be replicated on off-white paper using cyan, magenta, yellow, orange, and green inks. The current workflow of digital to print is so smooth, so ubiquitous and mundane, as to occlude the massive technological feat that it supports it.</p>
<p>This feat was undertaken by a small group of technology companies I the early 90s, and they collaborated to define a universal standard of how this would work. </p>
<blockquote>
<p>The International Color Consortium was formed in 1993 by eight industry vendors in order to create an open, vendor-neutral color management system which would function transparently across all operating systems and software packages… . The eight founding members of the ICC were Adobe, Agfa, Apple, Kodak, Microsoft, Silicon Graphics, Sun Microsystems, and Taligent.</p>
</blockquote>
<p><a
  href="https://ninedegreesbelow.com/photography/icc-profile-negative-tristimulus.html#luther"
  rel="nofollow"
>- Color Science History and the ICC Profile Specifications, Elle Stone</a></p>
<p>The current, baseline profiles built around RGB and CMYK came about with the rise of digital image-making, which is the basis of the the current world around us, a world built on and predicated by images.</p>
<p>The dominant translation <em>is</em> dominant because it — to a large degree — works. Creating color profile is really hard, mathy, phsysicsy stuff. It’s hard to do yourself. But CMYK/RGB cuts the corners off the world to make it fit into a gamut that can be handled. But by necessity it’s a compromise: what colors are we not handling in order to handle the maximum number of colors? What parts of the color space get left behind?</p>
<blockquote>
<p>Many of these issues give me the feeling at times of reluctant rather than open co-operation between some of the companies that created this standard. Having said that, there does seem enough information in the public standard (when combined with examining available existing  profiles) to effectively and accurately characterize color profiles of devices and color spaces. I could imagine there being some poor results at times though, due to some looseness in the spec.</p>
</blockquote>
<p><a
  href="https://argyllcms.com/icc_problems.html"
  rel="nofollow"
>—  What’s wrong with the ICC profile format anyway?, Graeme Gill</a></p>
<p>Its important to understand this compromise; understand how it works and what exchange we’re making in the process. What are we giving up, and what are we getting in return?</p>
<p>What are we leaving on the table? For example, photography (up until the 80’s) calibrated for white people. African Americans and other dark skinned people photographed poorly. They were outside the color space. The story goes that school photos of interracial classrooms would have rows of perfectly exposed white kids, and voids where the black children should have been (<a
  href="http://www.broombergchanarin.com/text-racism-of-early-colour/"
  rel="nofollow"
>Adamn Broomberg</a>). More than this, the standards only changed with industry pressure from chocolate and furniture manufacturers — a realm of capital where the browns and blacks matter (<a
  href="https://priceonomics.com/how-photography-was-optimized-for-white-skin/"
  rel="nofollow"
>Rosie Cima</a>). </p>
<blockquote>
<p>Film chemistry, photo lab procedures, video screen colour balancing practices, and digital cameras in general were originally developed with a global assumption of ‘Whiteness.’”</p>
</blockquote>
<p><a
  href="http://www.cjc-online.ca/index.php/journal/article/view/2196"
  rel="nofollow"
>— Looking at Shirley, the Ultimate Norm: Colour Balance, Image Technologies, and Cognitive Equity, Lorna Roth</a></p>
<p>With the creation of the RGB color space, with the creation of the ICC, we ceded the visual world to supermassive tech interests, much like we’ve ceded our privacy and personal data. In doing so we’ve inherently made the creation and dissemination of images into a tool for capital — one that supports dominant power structures.</p>
<p>How do we understand the implicit, invisible, baked in assumptions of the soft proof? We can start by operating outside the parameters of the soft proof, recognize it as a tool to use or not use. The gap between the soft proof & the hard copy is measured in the gap between the tools used to plan & prepare versus the tools used to produce, and we can move in to this gap and inhabit it. We can create work here, and in doing so reclaim some of the space that we’ve given away.</p>
<p>The Risograph, for example, has a toolchain for soft proofing, but the machine— through its high speed & low cost — also opens up the possibility of designing images through iterative hard proofs; blending the techniques go the modern digital print process with the classical analog ones.</p>
<p>The web is a strange medium – a blending of soft and hard spaces. A plastique space, with plastic proofs and plastic copies. The same process of translation is at work — between the still & the interactive, flowing image. This is why showing comps & wireframes of websites to clients can be so tricky: our culture of image cult and technological process can elide the critical differences we sense as agents of these systems.</p>
<p>This is a call for a Marxism of image making — to seize the means of production. To create radical images & tools that exist in the corners of the gamut and color spaces discarded by the soft proof. To understand that planning is not doing, and take control of our own visual languages. </p>
