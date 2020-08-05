import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, v as validate_each_argument, a as validate_slots, e as element, t as text, b as space, c as claim_element, f as children, g as claim_text, h as detach_dev, j as claim_space, k as attr_dev, l as add_location, m as insert_dev, n as append_dev, o as noop, q as query_selector_all, p as destroy_each, H as HtmlTag } from './client.6735b514.js';
import { p as projects } from './index.1e45f033.js';
import { t as texts } from './index.8077e6bf.js';

var meta = {
	title: "East Fork Pottery",
	slug: "eastfork-pottery",
	date: "2018.06.25",
	site: "https://eastforkpottery.com",
	description: "<p>Pushing the Shopify platform to its limits to create a smooth and playful experience.</p>\n",
	collection: "projects",
	timestamp: 1529910000000
};
var content = "<p>Alex &amp; Connie Mattisse run Eastfork Pottery out of Asheville, NC. They both have a strong design sense, and a clear understanding of their brands identity and point of view.</p>\n<p>This meant that the challenges of this project centered around pushing Shopify towards a more contemporary client-side user experience, including lazy-loading grid items and smooth client-side page transitions.</p>\n<p>\n    <figure class=\"figure\">\n      <picture>\n        <img\n          class=\"figure-image lazyload\"\n          src=\"https://photos.smugmug.com/Projects/Eastfork/i-cP8LrmX/0/ddeae95c/180x180/home-X5.png\"\n          data-optimumx=\"1.6\"\n          data-src=\"https://photos.smugmug.com/Projects/Eastfork/i-cP8LrmX/0/ddeae95c/{width}x5000/home-X5.png\"\n          data-sizes=\"auto\"\n          alt=\"home\" />\n      </picture>\n    </figure>\n  </p>\n<p>The project had a strong editorial design aspect, simple layout with strong typography and photography.</p>\n<p>\n    <figure class=\"figure\">\n      <picture>\n        <img\n          class=\"figure-image lazyload\"\n          src=\"https://photos.smugmug.com/Projects/Eastfork/i-vQ7T4bm/0/d731ecea/180x180/pottery-X5.png\"\n          data-optimumx=\"1.6\"\n          data-src=\"https://photos.smugmug.com/Projects/Eastfork/i-vQ7T4bm/0/d731ecea/{width}x5000/pottery-X5.png\"\n          data-sizes=\"auto\"\n          alt=\"pottery\" />\n      </picture>\n    </figure>\n  </p>\n<p>The catalog view used a staggered grid that repeated every 15 items. This meant I needed to request paginated sets of items in multiples of 15, then repeat the layout within the pages.</p>\n<p>\n    <figure class=\"figure\">\n      <picture>\n        <img\n          class=\"figure-image lazyload\"\n          src=\"https://photos.smugmug.com/Projects/Eastfork/i-hCHnw2C/0/2caa267e/180x180/modal-X5.png\"\n          data-optimumx=\"1.6\"\n          data-src=\"https://photos.smugmug.com/Projects/Eastfork/i-hCHnw2C/0/2caa267e/{width}x5000/modal-X5.png\"\n          data-sizes=\"auto\"\n          alt=\"modal\" />\n      </picture>\n    </figure>\n  </p>\n<p>A quick shopping modal from the catalog view allows for browsing and adding items to the cart without going back and forth to individual item pages. The color option swatches swap the active image for quickly previewing the many colorways.</p>\n<p>\n    <figure class=\"figure\">\n      <picture>\n        <img\n          class=\"figure-image lazyload\"\n          src=\"https://photos.smugmug.com/Projects/Eastfork/i-zQQcHhf/0/e406a0b6/180x180/description-X5.png\"\n          data-optimumx=\"1.6\"\n          data-src=\"https://photos.smugmug.com/Projects/Eastfork/i-zQQcHhf/0/e406a0b6/{width}x5000/description-X5.png\"\n          data-sizes=\"auto\"\n          alt=\"description\" />\n      </picture>\n    </figure>\n  </p>\n<p>The product detail pages needed to carry the editorial feel, and allow for the voice to exist for products.</p>\n<p>[TK] The registry</p>\n<p>[TK] The animated logo goodness.</p>\n<p>\n    <figure class=\"figure\">\n      <picture>\n        <img\n          class=\"figure-image lazyload\"\n          src=\"https://photos.smugmug.com/Projects/Eastfork/i-GFMq4LN/0/7f9fd3c9/180x180/cart-X3.png\"\n          data-optimumx=\"1.6\"\n          data-src=\"https://photos.smugmug.com/Projects/Eastfork/i-GFMq4LN/0/7f9fd3c9/{width}x5000/cart-X3.png\"\n          data-sizes=\"auto\"\n          alt=\"cart\" />\n      </picture>\n    </figure>\n  </p>\n<p>The UX for the cart needed to avoid the standard form submission for updating the cart contents. Abstracting the cart interactions into an API that can be called by use actions on the DOM was critical – and allowed us to have natural update methods tied directly to input interactions.</p>\n<p>[TK] The quiz thingy, and the need to add arbitrary data to the cart that gets carried through to the packing manager.</p>\n<p>[TK] The add a gift card bit</p>\n<p>\n    <figure class=\"figure\">\n      <picture>\n        <img\n          class=\"figure-image lazyload\"\n          src=\"https://photos.smugmug.com/Projects/Eastfork/i-BwfNf2t/0/a59a20e1/180x180/about-X5.png\"\n          data-optimumx=\"1.6\"\n          data-src=\"https://photos.smugmug.com/Projects/Eastfork/i-BwfNf2t/0/a59a20e1/{width}x5000/about-X5.png\"\n          data-sizes=\"auto\"\n          alt=\"about\" />\n      </picture>\n    </figure>\n  </p>\n<p>Another interesting design moment was the image treatment on the long-form content pages. Each page as a unique colorway in reference to the season glazes (configurable for each section from the Shopify Admin interface), and they images are a gray-scaled and multiplied over the background color. On hover, the image transitions to a full-color treatment. Animating the transition between these sates is tricky – CSS blend modes cannot be transitioned as they are binary states. The effect is achieved by having <em>two</em> images, one with the multiply &amp; grayscale, and one full-color but transparent positioned above it. On hover, the opacity of the top image is transitioned, providing the desired effect.</p>\n";
var latestProject = {
	meta: meta,
	content: content
};

var meta$1 = {
	title: "Pressing Words, With Your Friend, Wordpress",
	slug: "wordpress-but-not-terrible",
	date: "2018.10.24",
	description: "<p>A contemporary developers guide to building things on Wordpress 4.x and not having it be terrible.</p>\n",
	collection: "texts",
	timestamp: 1540364400000
};
var content$1 = "<p>TL:DR; <a href=\"https://github.com/nikolaswise/nanobox-wordpress-1\">Start here</a>. Install <a href=\"https://nanobox.io/\">this thing</a> and connect it to your account on <a href=\"https://www.digitalocean.com/\">here</a>. Buy a license of <a href=\"https://deliciousbrains.com/wp-migrate-db-pro/\">this (it's worth it)</a>. Read some docs for <a href=\"https://www.upstatement.com/timber/\">this</a> and start building. Wordpress 5 and Gutenberg will probably break all of this except the environments.</p>\n<p>When I first started working as a developer, Wordpress was <em>the</em> prevalent platform for pretty much any project. Ten years later and … Wordpress is still pretty much most of the internet. In general, Wordpress will be my last choice of a platform. I prefer to build static sites, use a headless CMS, or almost anything else at all.</p>\n<p>That said, as the Technical Director at Fuzzco — a design studio that relies almost exclusively on Wordpress for their websites — Wordpress was happening. Fuzzco is rare among studios in that we manage and host projects for our clients, and often have maintenance riders that can last for years. This means that in the course of a year, not only did we build a half dozen new projects on Wordpress, but we maintained and triaged issues on over 100 legacy projects.</p>\n<p>Very quickly I realized I had one option: <em>make Wordpress not terrible.</em></p>\n<h2>Terrible is pretty harsh</h2>\n<p>If you're comfortable with Wordpress, you might find some fightin' words here. What's my problem with Wordpress and what am I trying to solve for? My biggest issue with Wordpress development as I've encountered it in the past is a lack of clarity around the requirements of the entire system. What does the project need to run in an environment, and why? How do we move from a repository to a local environment and start working on a codebase? How does that codebase get deployed to a server?</p>\n<p>I've seen Wordpress systems that are frozen in time in 2006 — FTP to the server and edit a CSS file on production, or &quot;deploy&quot; your theme by uploading a <code>.zip</code>. I'm interested in how we can lower the cognitive overhead for getting a Wordpress project up and running, and join in with pre-processing, compiling, containerizing, testing, and all the really excellent things that we've come to expect from our web stacks over the past few years.</p>\n<p>Another issue I have with Wordpress is its commitment to auto-magical routes and rendering templates with obscure and complicated <code>.php</code> patterns that basically concatenate strings. I'm interested in explicit routes — either hard-coded or parameterized — and separating concerns between logic and template.</p>\n<p>A lot of this boils down to a disagreement between what Wordpress thinks a site should be and what I end up using it for. Wordpress as designed distinguishes between your &quot;site&quot; and your &quot;theme&quot;. Your &quot;site&quot; is the content in the database, the options you've saved, and the menus and widgets you've installed. It expects &quot;themes&quot; to be presentations of this real website stuff. This model of websites perpetuates that &quot;design&quot; is something that can be applied over a website, a kind of dressing up of the real things. This is the inverse, and perhaps a corollary to, the concept that designing a website is just deciding what it looks like. It's an idea that lives within the system of silos between design and development, and that we can &quot;design&quot; a website in Photoshop or Sketch and hand off the comps to a developer to build it. Which is how a lot of Wordpress projects are built.</p>\n<p>In short, <a href=\"/texts/how-to-design-while-developing/\">I disagree</a> with this concept of websites. My position is that designing a website is both how it looks, how it works, and how the data and structures are composed. Taking this approach, controlling the object models, the information architectures, and the templates are all of equal importance. In my line of work, a Wordpress theme can not be applied to any other site than the one that it was designed for, a site where the structure was designed for the theme.</p>\n<h2>So why use Wordpress?</h2>\n<p>There are still a number of really good, compelling reasons to use Wordpress as a platform for building websites. It's got a robust built-in commenting system with user accounts. It's really good for things that are shaped like blogs. It's got a huge, well-maintained ecosystem of plugins. It's free. And since it's most of the Internet, clients are really, really comfortable with it.</p>\n<p>There are a couple of reasons <em>not</em> to use Wordpress right now. Mostly these center around the impending release of Wordpress 5.0 and the Gutenberg editor, which has a number of concerns around plugin compatibility and accessibility for authors.</p>\n<p>But that's okay, since we've decided to use Wordpress 4.x. As we all know, picking a version of Wordpress and then never upgrading it is one of the time honored traditions of Wordpress development.</p>\n<h2>How does this work even</h2>\n<p>Let's start at the end.</p>\n<p>We're going to be hosting our production Wordpress site on a <a href=\"https://www.digitalocean.com/\">Digital Ocean</a> droplet — the <a href=\"https://www.digitalocean.com/pricing/\">smallest</a> one they have — for $5 per month. Depending on the project lifecycle, we can set up more droplets for a staging server and a development server. At Fuzzco we used dev servers to show sites to the internal team, staging servers to show sites to the client, and production servers to show sites to the public.</p>\n<p>I don't know about you, but I personally don't super love managing my virtual private servers manually. In order to deploy our codebases to Digital Ocean we'll use the phenomenal tool <a href=\"https://nanobox.io/\">Nanobox</a>. Nanobox is an operations layer that handles containerizing applications and deploying them agnostically to a cloud service provider. Nanobox will deploy our code from the command line to any one of our droplets.</p>\n<p>Nanobox will also containerize and run an application in a virtual machine <em>locally</em>. This means we'll use it to run our development environment, and ensure that all of our environments are identical. No more worrying about PHP versions and extensions and plugins. No more running MAMP or MySQL or Apache or whatever on your local machine before anything works. Nanobox defines the server in a <code>.yaml</code> file, and it will always be the same. It also handles all the syncing between our local disk and our virtual environment.</p>\n<p>So now that we know how our code is going from local to production, we can think for a second about <em>how</em> it's going to do that, and how we're going to manage our data.</p>\n<p>The database on the production server is &quot;canonical&quot;. That means that the database the client interacts with is the one true database, and we must treat it with care and attention. We'll never change that database ourselves, and we'll move that database <em>downstream</em> from production to staging to dev to local in order to develop against our real data. Importantly, we don't want to migrate the database manually either. It's a little expensive but using <a href=\"https://deliciousbrains.com/wp-migrate-db-pro/pricing/\">Migrate DB Pro</a> is an incredible resource for this part. I guess one could also look into <a href=\"https://github.com/wp-sync-db/wp-sync-db\">alternatives</a> for personal projects.</p>\n<p>The canonical <em>codebase</em> lives in version control, and moves the other direction. From Github to local to dev to staging to production, amen. The only things we need to track in version control are what makes our project unique. Practically, this means we need to track our theme and our plugins. Wordpress core files are not special, and we should not fill our repositories with them.</p>\n<h2>Getting started</h2>\n<p>At this point it's worth <a href=\"https://docs.nanobox.io/install/\">getting started with Nanobox</a>. I back the containers with <a href=\"https://docs.nanobox.io/install/#lightweight-vm-virtualbox\">VirtualBox</a>, since at the time I started this it was slightly more stable than Docker on MacOS High Sierra. Once Nanobox &amp; Virtualbox/Docker is installed, set up <a href=\"https://docs.nanobox.io/providers/hosting-accounts/digitalocean/\">Digital Ocean as your provider</a>. Once that's done, we have everything we need to get started!</p>\n<p>I'll be talking through a project I built in order to facilitate building other projects. This will be more intense than you might need for a single build, but this was designed a tool that anyone can use to get started quickly. Here's the basic structure of our repo:</p>\n<pre><code>📁 <span class=\"hljs-string\">/project-name</span>\n⮑ 📄 <span class=\"hljs-string\">.gitignore</span>    <span class=\"hljs-comment\"># includes /wp</span>\n⮑ 📄 package.json  <span class=\"hljs-comment\"># tooling lives here</span>\n⮑ 📄 readme.md     <span class=\"hljs-comment\"># be nice, write docs    </span>\n⮑ 📁 theme         <span class=\"hljs-comment\"># our theme codebase</span>\n⮑ 📁 plugins       <span class=\"hljs-comment\"># vendor plugins</span>\n⮑ 📁 scripts       <span class=\"hljs-comment\"># some helpers</span>\n</code></pre>\n<p>The crux of the project is our <code>boxfile.yml</code> configuration file. This is what Nanobox uses to create our containers. It looks like this!</p>\n<pre><code><span class=\"hljs-comment\"># /boxfile.yml                </span>\n<span class=\"hljs-attr\">run.config:</span>                    <span class=\"hljs-comment\"># </span>\n  <span class=\"hljs-attr\">engine:</span> <span class=\"hljs-string\">php</span>                  <span class=\"hljs-comment\">#</span>\n  <span class=\"hljs-attr\">engine.config:</span>               <span class=\"hljs-comment\">#</span>\n    <span class=\"hljs-attr\">runtime:</span> <span class=\"hljs-string\">php-7.0</span>           <span class=\"hljs-comment\"># Defines PHP version</span>\n    <span class=\"hljs-attr\">document_root:</span> <span class=\"hljs-string\">&#x27;wp/&#x27;</span>       <span class=\"hljs-comment\"># Dir to serve app from</span>\n    <span class=\"hljs-attr\">extensions:</span>                <span class=\"hljs-comment\"># PHP extensions we need</span>\n      <span class=\"hljs-bullet\">-</span> <span class=\"hljs-string\">gd</span>                     <span class=\"hljs-comment\">#</span>\n      <span class=\"hljs-bullet\">-</span> <span class=\"hljs-string\">mysqli</span>                 <span class=\"hljs-comment\">#</span>\n      <span class=\"hljs-bullet\">-</span> <span class=\"hljs-string\">curl</span>                   <span class=\"hljs-comment\">#</span>\n      <span class=\"hljs-bullet\">-</span> <span class=\"hljs-string\">zlib</span>                   <span class=\"hljs-comment\">#</span>\n      <span class=\"hljs-bullet\">-</span> <span class=\"hljs-string\">ctype</span>                  <span class=\"hljs-comment\">#</span>\n                               <span class=\"hljs-comment\">#</span>\n<span class=\"hljs-attr\">web.wp:</span>                        <span class=\"hljs-comment\">#</span>\n  <span class=\"hljs-attr\">start:</span> <span class=\"hljs-string\">php-server</span>            <span class=\"hljs-comment\">#</span>\n  <span class=\"hljs-attr\">network_dirs:</span>                <span class=\"hljs-comment\">#</span>\n    <span class=\"hljs-attr\">data.storage:</span>              <span class=\"hljs-comment\">#</span>\n      <span class=\"hljs-bullet\">-</span> <span class=\"hljs-string\">wp/wp-content/uploads/</span> <span class=\"hljs-comment\">#</span>\n<span class=\"hljs-attr\">data.db:</span>                       <span class=\"hljs-comment\">#</span>\n  <span class=\"hljs-attr\">image:</span> <span class=\"hljs-string\">nanobox/mysql:5.6</span>     <span class=\"hljs-comment\"># Nanobox DB magic</span>\n                               <span class=\"hljs-comment\">#</span>\n<span class=\"hljs-attr\">data.storage:</span>                  <span class=\"hljs-comment\">#</span>\n  <span class=\"hljs-attr\">image:</span> <span class=\"hljs-string\">nanobox/unfs:0.9</span>      <span class=\"hljs-comment\">#</span>\n</code></pre>\n<p>As noted above, we'll be serving our entire installation of Wordpress in the <code>/wp</code> directory. This will hold all the Wordpress core files and compiled theme code, none of of which we need or want in version control. As such, make sure this is listed alongside <code>node_modules</code> in the <code>.gitignore</code>.</p>\n<p>Since we've decided that we don't want to track these files, but we need them to actually have a project, we can write a helper script to take care of the gap between those two ideas.</p>\n<p>Here are the scripts we're going to write to help us handle this process:</p>\n<pre><code>📁 /<span class=\"hljs-keyword\">project</span>-name\n⮑ 📁 scripts\n   ⮑ 📄 check-<span class=\"hljs-keyword\">install</span>.sh <span class=\"hljs-comment\"># Installs Wordpress core files.</span>\n   ⮑ 📄 init.sh          <span class=\"hljs-comment\"># Runs our setup helper.</span>\n   ⮑ 📄 prestart.sh      <span class=\"hljs-comment\"># Checks if we need to init.</span>\n   ⮑ 📄 setup.js         <span class=\"hljs-comment\"># Cute lil&#x27; CLI helper.</span>\n</code></pre>\n<p>The first thing we'll do is write a script that checks if <code>/wp</code> exists. If it doesn't, throw an error that we need to initialize the project since we don't have any of the core files we need.</p>\n<pre><code><span class=\"hljs-comment\"># prestart.sh</span>\n<span class=\"hljs-comment\">#!/bin/bash</span>\necho <span class=\"hljs-string\">&#x27;Check to make sure wordpress is here at all&#x27;</span>\n<span class=\"hljs-keyword\">if</span> test -d .<span class=\"hljs-regexp\">/wp/</span>\nthen\n  echo <span class=\"hljs-string\">&#x27;yup we good&#x27;</span>\n  <span class=\"hljs-keyword\">exit</span> <span class=\"hljs-number\">0</span>\n<span class=\"hljs-keyword\">else</span>\n  echo <span class=\"hljs-string\">&#x27;Project not initialized: Run `$ npm run init`&#x27;</span>\n  <span class=\"hljs-keyword\">exit</span> <span class=\"hljs-number\">1</span>\nfi\n</code></pre>\n<p>I'm calling this <code>prestart</code> because I want to run it before <code>npm start</code>. Many times I'll be on autopilot, and after cloning a repo simply run <code>npm install</code> and <code>npm start</code>. This interrupts that process and lets me know I need a third step, <code>npm run init</code>. Let's put this in our <code>package.json</code> scripts:</p>\n<pre><code><span class=\"hljs-comment\"># package.json</span>\n{\n  <span class=\"hljs-string\">...</span>\n  <span class=\"hljs-string\">&quot;scripts&quot;</span>: {\n    <span class=\"hljs-string\">...</span>\n    <span class=\"hljs-string\">&quot;init&quot;</span>: <span class=\"hljs-string\">&quot;./scripts/init.sh&quot;</span>,\n    <span class=\"hljs-string\">&quot;prestart&quot;</span>: <span class=\"hljs-string\">&quot;./scripts/prestart.sh&quot;</span>,\n    <span class=\"hljs-string\">&quot;start&quot;</span>: <span class=\"hljs-string\">&quot;npm run dev&quot;</span>\n  }\n  <span class=\"hljs-string\">...</span>\n}\n</code></pre>\n<p>We'll get to our dev tooling later. Lets take a look at what our <code>init.sh</code> script does:</p>\n<pre><code><span class=\"hljs-comment\"># init.sh</span>\n<span class=\"hljs-comment\">#!/bin/bash</span>\n<span class=\"hljs-keyword\">node</span> <span class=\"hljs-title\">./scripts</span>/setup.js  \n</code></pre>\n<p>Not much! This just runs our setup CLI helper. You might not need all this, but since I built this system to help a team of developers work on <em>many many</em> projects you're gonna get it anyway.</p>\n<pre><code><span class=\"hljs-comment\">// setup.js</span>\n\n<span class=\"hljs-comment\">// some nice deps for making a CLI.</span>\n<span class=\"hljs-keyword\">const</span> prompt = <span class=\"hljs-built_in\">require</span>(<span class=\"hljs-string\">&#x27;prompt&#x27;</span>)\n<span class=\"hljs-keyword\">const</span> exec = <span class=\"hljs-built_in\">require</span>(<span class=\"hljs-string\">&#x27;child_process&#x27;</span>).exec\n<span class=\"hljs-keyword\">const</span> colors = <span class=\"hljs-built_in\">require</span>(<span class=\"hljs-string\">&quot;colors/safe&quot;</span>)\n\n<span class=\"hljs-comment\">// Run and log a bash command</span>\n<span class=\"hljs-keyword\">const</span> bash = <span class=\"hljs-function\"><span class=\"hljs-params\">cmd</span> =&gt;</span> {\n  msg(<span class=\"hljs-string\">&#x27;green&#x27;</span>, <span class=\"hljs-string\">`Running: <span class=\"hljs-subst\">${cmd}</span>`</span>)\n  <span class=\"hljs-keyword\">return</span> <span class=\"hljs-keyword\">new</span> <span class=\"hljs-built_in\">Promise</span>(<span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span>(<span class=\"hljs-params\">resolve, reject</span>) </span>{\n    exec(cmd, <span class=\"hljs-function\">(<span class=\"hljs-params\">err, stdout, stderr</span>) =&gt;</span> {\n      <span class=\"hljs-keyword\">if</span> (err) reject(err)\n      resolve(stdout, stderr)\n    })\n  });\n}\n\n<span class=\"hljs-comment\">// Log a message</span>\n<span class=\"hljs-keyword\">const</span> msg = <span class=\"hljs-function\">(<span class=\"hljs-params\">color, text</span>) =&gt;</span> {\n  <span class=\"hljs-built_in\">console</span>.log(colors[color](text))\n}\n\n<span class=\"hljs-comment\">// do the magic</span>\n<span class=\"hljs-keyword\">const</span> setup = <span class=\"hljs-function\">(<span class=\"hljs-params\">err, result</span>) =&gt;</span> {\n  <span class=\"hljs-keyword\">if</span> (err) msg(<span class=\"hljs-string\">`red`</span>, err)\n\n  msg(<span class=\"hljs-string\">&#x27;yellow&#x27;</span>, <span class=\"hljs-string\">&#x27;WordPress configuration values ☟&#x27;</span>)\n\n  <span class=\"hljs-keyword\">for</span> (<span class=\"hljs-keyword\">let</span> key <span class=\"hljs-keyword\">in</span> result) {\n    msg(<span class=\"hljs-string\">&#x27;yellow&#x27;</span>, <span class=\"hljs-string\">`<span class=\"hljs-subst\">${key}</span>: <span class=\"hljs-subst\">${result[key]}</span>;`</span>)\n  }\n  <span class=\"hljs-comment\">// run our check-install script.</span>\n  bash(<span class=\"hljs-string\">`<span class=\"hljs-subst\">${process.cwd()}</span>/scripts/check-install.sh`</span>)\n  .then(<span class=\"hljs-function\"><span class=\"hljs-params\">ok</span> =&gt;</span> {\n    <span class=\"hljs-comment\">// add our project to hostfile</span>\n    bash(<span class=\"hljs-string\">`nanobox dns add local <span class=\"hljs-subst\">${result.name}</span>.local`</span>)\n  })\n  .then(<span class=\"hljs-function\"><span class=\"hljs-params\">ok</span> =&gt;</span> {\n    <span class=\"hljs-comment\">// explain the next step</span>\n    msg(<span class=\"hljs-string\">&#x27;green&#x27;</span>, <span class=\"hljs-string\">`Run npm start, then finish setting up WordPress at <span class=\"hljs-subst\">${result.name}</span>.local/wp-admin`</span>)\n  })\n}\n\nmsg(<span class=\"hljs-string\">&#x27;green&#x27;</span>, <span class=\"hljs-string\">&#x27;Making Progress!&#x27;</span>)\nprompt.start();\nprompt.get({\n  <span class=\"hljs-attr\">properties</span>: {\n    <span class=\"hljs-attr\">name</span>: {\n      <span class=\"hljs-attr\">description</span>: colors.magenta(<span class=\"hljs-string\">&quot;Project name:&quot;</span>)\n    }\n  }\n}, setup);\n</code></pre>\n<p>This will open a CLI asking for the name of the project, run the <code>check-install.sh</code> script, create the hostfile line for our local DNS at <code>&lt;project-name&gt;.local</code>, and log the next action that you need to take to finish installing Wordpress.</p>\n<p>Lets take a peek at our <code>check-install.sh</code> file:</p>\n<pre><code><span class=\"hljs-comment\"># check-install.sh</span>\n<span class=\"hljs-comment\">#!/bin/bash</span>\necho <span class=\"hljs-string\">&#x27;Check to make sure wordpress is here at all&#x27;</span>\n<span class=\"hljs-keyword\">if</span> test -d .<span class=\"hljs-regexp\">/wp/</span>\nthen\n  echo <span class=\"hljs-string\">&#x27;yup we good&#x27;</span>\n<span class=\"hljs-keyword\">else</span>\n  echo <span class=\"hljs-string\">&#x27;nope we need that&#x27;</span>\n  degit git@github.com:nanobox-quickstarts/nanobox-wordpress.git wp\nfi\nrsync -va --<span class=\"hljs-keyword\">delete</span> .<span class=\"hljs-regexp\">/plugins/</span> .<span class=\"hljs-regexp\">/wp/</span>wp-content<span class=\"hljs-regexp\">/plugins/</span>\nrsync -va --<span class=\"hljs-keyword\">delete</span> .<span class=\"hljs-regexp\">/theme/</span> .<span class=\"hljs-regexp\">/wp/</span>wp-content<span class=\"hljs-regexp\">/themes/my</span>-theme\n</code></pre>\n<p>Very similar to <code>prestart</code>! The biggest difference is the bit where we use <code>degit</code> to clone Nanobox's official Wordpress repo into our untracked <code>/wp</code> directory. Degit will only get the head files, and none of the git history. Nor will it keep the <code>.git</code> file, basically making this a super clean, super fast way to download a directory of files. It's great. The last thing this does is wipe out any themes or plugins that we don't want our need in the core files and syncs out own tracked directories to the correct places in the Wordpress core file structure.</p>\n<p>Now would be a time to talk about plugins.</p>\n<h2>What's up with plugins?</h2>\n<p>Wordpress has a million plugins. We're going to focus on some of the basic ones that almost every Wordpress project ever needs, and should honestly be part of Wordpress. Building sites without these is a pain. Here they are:</p>\n<pre><code>📁 /project-name\n⮑ 📁 plugins\n  ⮑ 📁 advanced-custom-fields-<span class=\"hljs-keyword\">pro</span>\n  ⮑ 📁 custom-<span class=\"hljs-keyword\">post</span>-types-ui\n  ⮑ 📁 timber-library\n  ⮑ 📁 wp-migrate-<span class=\"hljs-keyword\">db</span>-<span class=\"hljs-keyword\">pro</span>\n</code></pre>\n<p>There are a couple more in my repo to do things like order posts in the CMS and import CSVs. Not super necessary, so we won't talk about theme here.</p>\n<h3>Advanced Custom Fields</h3>\n<p><a href=\"https://www.advancedcustomfields.com/\">ACF</a> is a staple of Wordpress development. It lets us define new key/value pairs to extend the data model of things like posts and pages, and allows us to create a set of global variable available from anywhere. Sounds simple, surprising it's not part of Wordpress.</p>\n<h3>Custom Post Types UI</h3>\n<p><a href=\"https://wordpress.org/plugins/custom-post-type-ui/\">CPT-UI</a> creates an interface in the admin panel for creating new post types. Out of the box, Wordpress comes with <code>Posts</code> and <code>Pages</code>. CPT-UI lets us build new types like <code>Projects</code> or <code>Case Studies</code> or whatever need for our data model. Again, surprising that this  isn't just part of Wordpress. C'est la vivre.</p>\n<h3>WP Migrate DB</h3>\n<p><a href=\"https://deliciousbrains.com/wp-migrate-db-pro/\">Migrate DB</a> lets us ... migrate ... our ... DB. This gives us the ability to sync our databases across environments and get media uploads and things without needing to write magic MySQL queries while tunneled into open database ports on virtual machines. This is better. Believe me.</p>\n<h3>Timber</h3>\n<p>The <a href=\"https://www.upstatement.com/timber/\">Timber</a> library from Upstatement is the greatest thing to happen to Wordpress development, after those plugins that should just be part of Wordpress. Timber introduces the concept of <em>layout templates</em> to Wordpress. This lets us write PHP to manipulate data, and pass that data to a template file where we can write <a href=\"https://twig.symfony.com/\">Twig templates</a> rather than composing strings in PHP. Basically ...</p>\n<pre><code><span class=\"hljs-meta\">&lt;?php</span> <span class=\"hljs-keyword\">echo</span> $myvar <span class=\"hljs-meta\">?&gt;</span>\n</code></pre>\n<p>Turns in to:</p>\n<p>{% raw %}</p>\n<pre><code><span class=\"hljs-template-variable\">{{ <span class=\"hljs-name\">myvar</span> }}</span><span class=\"xml\">\n</span></code></pre>\n<p>{% endraw %}</p>\n<p>This lets us write templates with a templating language, and write server-side business logic in a server-side programming language. Truly revolutionary.</p>\n<h2>What we talk about when we talk about Wordpress development: or, The Theme.</h2>\n<p>With all this initial work around Wordpress core, development environments, and a basic plugin ecosystem in place we can start talking about the good stuff: the theme!</p>\n<pre><code>📁 /project-name\n⮑ 📁 theme\n   ⮑ 📁 es6              # Source JS\n   ⮑ 📁 scss             # Source SCSS\n   ⮑ 📁 routes           # PHP<span class=\"hljs-built_in\"> route </span>logic files\n      ⮑ 📄 index.php\n      ⮑ 📄 page.php\n      ⮑ 📄 post.php\n   ⮑ 📁 views            # Twig templates\n      ⮑ 📁 layouts\n      ⮑ 📁 pages\n      ⮑ 📁 partials\n   ⮑ 📄 functions.php    # This includes routing.\n   ⮑ 📄 screenshot.png   # Theme preview image.\n   ⮑ 📄 index.php        # Need this, but it<span class=\"hljs-string\">&#x27;s empty.¯\\_(ツ)_/¯\n</span></code></pre>\n<p>We won't get too deep into this, since we're getting into more conventional territory here. Basically our <code>es6</code> directory holds source JS that will get compiled into a bundle. Same with the <code>scss</code> directory, which gets compiled into css. We handle that with npm scripts in the <code>package.json</code>.</p>\n<pre><code><span class=\"hljs-comment\"># package.json</span>\n{\n  <span class=\"hljs-string\">...</span>\n  <span class=\"hljs-string\">&quot;scripts&quot;</span>: {\n    <span class=\"hljs-string\">...</span>\n    <span class=\"hljs-string\">&quot;css&quot;</span>: <span class=\"hljs-string\">&quot;node-sass ./theme/scss/style.scss theme/style.css --watch&quot;</span>,\n    <span class=\"hljs-string\">&quot;js&quot;</span>: <span class=\"hljs-string\">&quot;rollup -c -w&quot;</span>,\n    <span class=\"hljs-string\">...</span>\n  }\n  <span class=\"hljs-string\">...</span>\n}\n</code></pre>\n<p>Hopefully none of this is to unusual — if it's is I recommend reading Paul Pederson's <a href=\"http://paulcpederson.com/articles/npm-run/\">excellent article on npm scripts</a>.</p>\n<p>There is one part of this I want to touch on before moving on:</p>\n<pre><code><span class=\"hljs-comment\"># package.json</span>\n{\n  <span class=\"hljs-string\">...</span>\n  <span class=\"hljs-string\">&quot;scripts&quot;</span>: {\n    <span class=\"hljs-string\">...</span>\n    <span class=\"hljs-string\">&quot;sync:plugins&quot;</span>: <span class=\"hljs-string\">&quot;rsync -va --delete ./plugins/ ./wp/wp-content/plugins/&quot;</span>,\n    <span class=\"hljs-string\">&quot;sync:theme&quot;</span>: <span class=\"hljs-string\">&quot;rsync -va --delete ./theme/ ./wp/wp-content/themes/fuzzco&quot;</span>,    \n    <span class=\"hljs-string\">&quot;watch&quot;</span>: <span class=\"hljs-string\">&quot;rerun-script&quot;</span>,\n    <span class=\"hljs-string\">...</span>\n  },\n  <span class=\"hljs-string\">&quot;watches&quot;</span>: {\n    <span class=\"hljs-string\">&quot;sync:plugins&quot;</span>: <span class=\"hljs-string\">&quot;plugins/**/*.*&quot;</span>,\n    <span class=\"hljs-string\">&quot;sync:theme&quot;</span>: <span class=\"hljs-string\">&quot;theme/**/*.*&quot;</span>\n  },\n  <span class=\"hljs-string\">...</span> \n</code></pre>\n<p>This bit sets up a watcher on our <code>theme</code> and <code>plugins</code> directory, which sync our tracked working files to the correct place in our Wordpress core file structure.</p>\n<h2>Functions, Routes, and Views</h2>\n<p>The last thing I want to touch on is the basic structure of using Timber to match routes with views.</p>\n<pre><code><span class=\"hljs-comment\">/** functions.php */</span>\nRoutes::map(<span class=\"hljs-string\">&#x27;/&#x27;</span>, <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span>(<span class=\"hljs-params\">$params</span>)</span>{\n  Routes::load(<span class=\"hljs-string\">&#x27;routes/page.php&#x27;</span>, $params, <span class=\"hljs-literal\">null</span>, <span class=\"hljs-number\">200</span>);\n});\nRoutes::map(<span class=\"hljs-string\">&#x27;/:page&#x27;</span>, <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> (<span class=\"hljs-params\">$params</span>) </span>{\n  $page = get_page_by_path($params[<span class=\"hljs-string\">&#x27;page&#x27;</span>]);\n  <span class=\"hljs-keyword\">if</span> ($page) {\n      Routes::load(<span class=\"hljs-string\">&#x27;routes/page.php&#x27;</span>, $params, <span class=\"hljs-literal\">null</span>, <span class=\"hljs-number\">200</span>);\n  } <span class=\"hljs-keyword\">else</span> {\n      Routes::load(<span class=\"hljs-string\">&#x27;routes/404.php&#x27;</span>, $params, <span class=\"hljs-literal\">null</span>, <span class=\"hljs-number\">404</span>);\n  }\n});\nRoutes::map(<span class=\"hljs-string\">&#x27;/blog/:post&#x27;</span>, <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span>(<span class=\"hljs-params\">$params</span>)</span>{\n  Routes::load(<span class=\"hljs-string\">&#x27;routes/post.php&#x27;</span>, $params, <span class=\"hljs-literal\">null</span>, <span class=\"hljs-number\">200</span>);\n});\n</code></pre>\n<p>These are Timber routes defined in the <code>functions.php</code> file. This replaces the standard routing of Wordpress, and we have change the structure of the Wordpress permalinks to anything other than the default to have it work. This is documented in Timber.</p>\n<p>When our server gets a request at a route of <code>/page-name</code>, it will call the <code>page.php</code> file and pass it the params associated with the route.</p>\n<pre><code><span class=\"hljs-comment\">/** page.php */</span>\n<span class=\"hljs-meta\">&lt;?php</span>\n  $context = Timber::get_context();\n  $post = <span class=\"hljs-keyword\">new</span> TimberPost();\n  $context[<span class=\"hljs-string\">&#x27;page&#x27;</span>] = $post;\n  \n  Timber::render( <span class=\"hljs-keyword\">array</span>(\n    <span class=\"hljs-string\">&#x27;views/pages/page-&#x27;</span> . $post-&gt;post_name . <span class=\"hljs-string\">&#x27;.twig&#x27;</span>,\n    <span class=\"hljs-string\">&#x27;views/pages/page.twig&#x27;</span>\n  ), $context );\n<span class=\"hljs-meta\">?&gt;</span>\n</code></pre>\n<p>The <code>page.php</code> file assigns some variables, interacts with Wordpress to get and shape our data, and then renders the twig file associated with the page. In this case, it's going to see if there's a template that matches the name of our page, otherwise it will render the default page template.</p>\n<h2>Back to the beginning</h2>\n<p>You've built your theme! Maybe it's a simple hello world, maybe it's a heavy duty big ol' thing. Either way, it's time to deploy.</p>\n<p>You can use Nanobox to create a droplet for your server. Nanobox will give your project a name in their system, and expose the URL for the server at <code>&lt;your-project&gt;.nanoapp.io</code>. I like to use the convention <code>project-dev</code>, <code>project-stage</code>, and <code>project-prod</code>. Once you create your project in Nanobox, the hard part is over and you can let them do the heavy lifting:</p>\n<pre><code>$ nanobox deploy <span class=\"hljs-keyword\">project</span>-dev\n</code></pre>\n<p>Or we can map this to our NPM script:</p>\n<pre><code>$ npm <span class=\"hljs-keyword\">run</span><span class=\"bash\"> deploy:dev  </span>\n</code></pre>\n<p>This will containerize our application, push it to our droplet, hydrate the entire thing, and serve! Now we can use Migrate DB to move our database around, and we're in business.</p>\n<h2>Putting it all together</h2>\n<p><a href=\"https://github.com/nikolaswise/nanobox-sapper-1\">The project repo</a> is a turnkey, ready to roll version of all the above. It contains all the tooling needed to get started, and if you've followed along with this guide, you should be able to get started in no time.</p>\n<p>As always, feel free to reach out to me in your venue of choice to talk about any of this — I would be happy to help you set this up for your own Wordpress project!</p>\n";
var latestText = {
	meta: meta$1,
	content: content$1
};

/* src/routes/index.svelte generated by Svelte v3.24.0 */
const file = "src/routes/index.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	return child_ctx;
}

// (59:0) {#if latestProject}
function create_if_block_1(ctx) {
	let h2;
	let t0;
	let t1;
	let h3;
	let a0;
	let t2_value = latestProject.meta.title + "";
	let t2;
	let a0_href_value;
	let t3;
	let html_tag;
	let raw_value = latestProject.meta.description + "";
	let t4;
	let p;
	let a1;
	let t5;

	const block = {
		c: function create() {
			h2 = element("h2");
			t0 = text("Latest Project");
			t1 = space();
			h3 = element("h3");
			a0 = element("a");
			t2 = text(t2_value);
			t3 = space();
			t4 = space();
			p = element("p");
			a1 = element("a");
			t5 = text("More Projects");
			this.h();
		},
		l: function claim(nodes) {
			h2 = claim_element(nodes, "H2", { class: true });
			var h2_nodes = children(h2);
			t0 = claim_text(h2_nodes, "Latest Project");
			h2_nodes.forEach(detach_dev);
			t1 = claim_space(nodes);
			h3 = claim_element(nodes, "H3", { class: true });
			var h3_nodes = children(h3);
			a0 = claim_element(h3_nodes, "A", { href: true });
			var a0_nodes = children(a0);
			t2 = claim_text(a0_nodes, t2_value);
			a0_nodes.forEach(detach_dev);
			h3_nodes.forEach(detach_dev);
			t3 = claim_space(nodes);
			t4 = claim_space(nodes);
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			a1 = claim_element(p_nodes, "A", { href: true });
			var a1_nodes = children(a1);
			t5 = claim_text(a1_nodes, "More Projects");
			a1_nodes.forEach(detach_dev);
			p_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h2, "class", "svelte-9qqyqm");
			add_location(h2, file, 59, 2, 1292);
			attr_dev(a0, "href", a0_href_value = "/projects/" + latestProject.meta.slug);
			add_location(a0, file, 62, 4, 1332);
			attr_dev(h3, "class", "svelte-9qqyqm");
			add_location(h3, file, 61, 2, 1323);
			html_tag = new HtmlTag(t4);
			attr_dev(a1, "href", "/projects");
			add_location(a1, file, 68, 4, 1480);
			add_location(p, file, 67, 2, 1472);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h2, anchor);
			append_dev(h2, t0);
			insert_dev(target, t1, anchor);
			insert_dev(target, h3, anchor);
			append_dev(h3, a0);
			append_dev(a0, t2);
			insert_dev(target, t3, anchor);
			html_tag.m(raw_value, target, anchor);
			insert_dev(target, t4, anchor);
			insert_dev(target, p, anchor);
			append_dev(p, a1);
			append_dev(a1, t5);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(h2);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(h3);
			if (detaching) detach_dev(t3);
			if (detaching) html_tag.d();
			if (detaching) detach_dev(t4);
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(59:0) {#if latestProject}",
		ctx
	});

	return block;
}

// (75:0) {#if latestText}
function create_if_block(ctx) {
	let h2;
	let t0;
	let t1;
	let date;
	let t2_value = latestText.meta.date + "";
	let t2;
	let t3;
	let h3;
	let a;
	let t4_value = latestText.meta.title + "";
	let t4;
	let t5;
	let html_tag;
	let raw_value = latestText.meta.description + "";
	let a_href_value;

	const block = {
		c: function create() {
			h2 = element("h2");
			t0 = text("Texts");
			t1 = space();
			date = element("date");
			t2 = text(t2_value);
			t3 = space();
			h3 = element("h3");
			a = element("a");
			t4 = text(t4_value);
			t5 = text(" — ");
			this.h();
		},
		l: function claim(nodes) {
			h2 = claim_element(nodes, "H2", { class: true });
			var h2_nodes = children(h2);
			t0 = claim_text(h2_nodes, "Texts");
			h2_nodes.forEach(detach_dev);
			t1 = claim_space(nodes);
			date = claim_element(nodes, "DATE", { class: true });
			var date_nodes = children(date);
			t2 = claim_text(date_nodes, t2_value);
			date_nodes.forEach(detach_dev);
			t3 = claim_space(nodes);
			h3 = claim_element(nodes, "H3", { class: true });
			var h3_nodes = children(h3);
			a = claim_element(h3_nodes, "A", { href: true });
			var a_nodes = children(a);
			t4 = claim_text(a_nodes, t4_value);
			t5 = claim_text(a_nodes, " — ");
			a_nodes.forEach(detach_dev);
			h3_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h2, "class", "svelte-9qqyqm");
			add_location(h2, file, 75, 2, 1563);
			attr_dev(date, "class", "svelte-9qqyqm");
			add_location(date, file, 77, 2, 1581);
			html_tag = new HtmlTag(null);
			attr_dev(a, "href", a_href_value = "/texts/" + latestText.meta.slug);
			add_location(a, file, 79, 4, 1628);
			attr_dev(h3, "class", "svelte-9qqyqm");
			add_location(h3, file, 78, 2, 1619);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h2, anchor);
			append_dev(h2, t0);
			insert_dev(target, t1, anchor);
			insert_dev(target, date, anchor);
			append_dev(date, t2);
			insert_dev(target, t3, anchor);
			insert_dev(target, h3, anchor);
			append_dev(h3, a);
			append_dev(a, t4);
			append_dev(a, t5);
			html_tag.m(raw_value, a);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(h2);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(date);
			if (detaching) detach_dev(t3);
			if (detaching) detach_dev(h3);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(75:0) {#if latestText}",
		ctx
	});

	return block;
}

// (87:0) {#each recentTexts as text}
function create_each_block(ctx) {
	let div;
	let date;
	let t0_value = /*text*/ ctx[1].meta.date + "";
	let t0;
	let t1;
	let h3;
	let a;
	let t2_value = /*text*/ ctx[1].meta.title + "";
	let t2;
	let a_href_value;
	let t3;

	const block = {
		c: function create() {
			div = element("div");
			date = element("date");
			t0 = text(t0_value);
			t1 = space();
			h3 = element("h3");
			a = element("a");
			t2 = text(t2_value);
			t3 = space();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			date = claim_element(div_nodes, "DATE", { class: true });
			var date_nodes = children(date);
			t0 = claim_text(date_nodes, t0_value);
			date_nodes.forEach(detach_dev);
			t1 = claim_space(div_nodes);
			h3 = claim_element(div_nodes, "H3", { class: true });
			var h3_nodes = children(h3);
			a = claim_element(h3_nodes, "A", { href: true });
			var a_nodes = children(a);
			t2 = claim_text(a_nodes, t2_value);
			a_nodes.forEach(detach_dev);
			h3_nodes.forEach(detach_dev);
			t3 = claim_space(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(date, "class", "svelte-9qqyqm");
			add_location(date, file, 88, 4, 1834);
			attr_dev(a, "href", a_href_value = "/texts/" + /*text*/ ctx[1].meta.slug);
			add_location(a, file, 90, 6, 1879);
			attr_dev(h3, "class", "svelte-9qqyqm");
			add_location(h3, file, 89, 4, 1868);
			attr_dev(div, "class", "text svelte-9qqyqm");
			add_location(div, file, 87, 2, 1811);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, date);
			append_dev(date, t0);
			append_dev(div, t1);
			append_dev(div, h3);
			append_dev(h3, a);
			append_dev(a, t2);
			append_dev(div, t3);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(87:0) {#each recentTexts as text}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let meta;
	let t0;
	let h1;
	let t1;
	let t2;
	let p;
	let t3;
	let t4;
	let t5;
	let t6;
	let div;
	let if_block0 = latestProject && create_if_block_1(ctx);
	let if_block1 = latestText && create_if_block(ctx);
	let each_value = /*recentTexts*/ ctx[0];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			meta = element("meta");
			t0 = space();
			h1 = element("h1");
			t1 = text("Nikolas Wise is a web developer, front-end system architect, and creative technologist.");
			t2 = space();
			p = element("p");
			t3 = text("For over 10 years, he has worked on web applications, design systems and component libraries, and customer facing web experiences. with fine artists, design studios, and the R&D wings of technology companies to explore the edges of what's possible.");
			t4 = space();
			if (if_block0) if_block0.c();
			t5 = space();
			if (if_block1) if_block1.c();
			t6 = space();
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-18yjp9s\"]", document.head);
			meta = claim_element(head_nodes, "META", { name: true, content: true });
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			h1 = claim_element(nodes, "H1", { class: true });
			var h1_nodes = children(h1);
			t1 = claim_text(h1_nodes, "Nikolas Wise is a web developer, front-end system architect, and creative technologist.");
			h1_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			t3 = claim_text(p_nodes, "For over 10 years, he has worked on web applications, design systems and component libraries, and customer facing web experiences. with fine artists, design studios, and the R&D wings of technology companies to explore the edges of what's possible.");
			p_nodes.forEach(detach_dev);
			t4 = claim_space(nodes);
			if (if_block0) if_block0.l(nodes);
			t5 = claim_space(nodes);
			if (if_block1) if_block1.l(nodes);
			t6 = claim_space(nodes);
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div_nodes);
			}

			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			document.title = "nikolas.ws";
			attr_dev(meta, "name", "description");
			attr_dev(meta, "content", "Nikolas Wise is …");
			add_location(meta, file, 49, 1, 841);
			attr_dev(h1, "class", "svelte-9qqyqm");
			add_location(h1, file, 52, 0, 911);
			add_location(p, file, 56, 0, 1013);
			attr_dev(div, "class", "texts svelte-9qqyqm");
			add_location(div, file, 85, 0, 1761);
		},
		m: function mount(target, anchor) {
			append_dev(document.head, meta);
			insert_dev(target, t0, anchor);
			insert_dev(target, h1, anchor);
			append_dev(h1, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, p, anchor);
			append_dev(p, t3);
			insert_dev(target, t4, anchor);
			if (if_block0) if_block0.m(target, anchor);
			insert_dev(target, t5, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, t6, anchor);
			insert_dev(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}
		},
		p: function update(ctx, [dirty]) {
			if (latestProject) if_block0.p(ctx, dirty);
			if (latestText) if_block1.p(ctx, dirty);

			if (dirty & /*recentTexts*/ 1) {
				each_value = /*recentTexts*/ ctx[0];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			detach_dev(meta);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(h1);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(p);
			if (detaching) detach_dev(t4);
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach_dev(t5);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(t6);
			if (detaching) detach_dev(div);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let recentTexts = [texts[1], texts[2], texts[3], texts[4]];
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Routes> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Routes", $$slots, []);

	$$self.$capture_state = () => ({
		projects,
		latestProject,
		texts,
		latestText,
		recentTexts
	});

	$$self.$inject_state = $$props => {
		if ("recentTexts" in $$props) $$invalidate(0, recentTexts = $$props.recentTexts);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [recentTexts];
}

class Routes extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Routes",
			options,
			id: create_fragment.name
		});
	}
}

export default Routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZjI0NGYzZjkuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvaW5kZXguc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XG4gIGltcG9ydCBwcm9qZWN0cyBmcm9tICcuLi9kYXRhL3Byb2plY3RzL2luZGV4Lmpzb24nXG4gIGltcG9ydCBsYXRlc3RQcm9qZWN0IGZyb20gJy4uL2RhdGEvcHJvamVjdHMvbGF0ZXN0Lmpzb24nXG5cbiAgaW1wb3J0IHRleHRzIGZyb20gJy4uL2RhdGEvdGV4dHMvaW5kZXguanNvbidcbiAgaW1wb3J0IGxhdGVzdFRleHQgZnJvbSAnLi4vZGF0YS90ZXh0cy9sYXRlc3QuanNvbidcbiAgXG4gIGxldCByZWNlbnRUZXh0cyA9IFtcbiAgICB0ZXh0c1sxXSxcbiAgICB0ZXh0c1syXSxcbiAgICB0ZXh0c1szXSxcbiAgICB0ZXh0c1s0XVxuICBdXG48L3NjcmlwdD5cblxuPHN0eWxlPlxuICBoMSB7XG4gICAgZm9udC1zaXplOiB2YXIoLS1zLTIwKTtcbiAgICBsaW5lLWhlaWdodDogY2FsYygxZW0gKyB2YXIoLS11LTZwKSk7XG4gIH1cbiAgaDIge1xuICAgIGZvbnQtc2l6ZTogdmFyKC0tcy0xMik7XG4gICAgbWFyZ2luLXRvcDogNXJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICB9XG5cbiAgaDMge1xuICAgIGZvbnQtc2l6ZTogdmFyKC0tcy0xNCk7XG4gIH1cbiAgLnRleHRzIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcbiAgICBtYXJnaW4tdG9wOiAycmVtO1xuICAgIGdyaWQtY29sdW1uLWdhcDogMnJlbTtcbiAgfVxuICAudGV4dCBoMyB7XG4gICAgZm9udC1zaXplOiB2YXIoLS1zLTEyKTtcbiAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xuXG4gIH1cblxuICBkYXRlIHtcbiAgICBmb250LXNpemU6IHZhcigtLXMtOCk7XG4gICAgZm9udC1mYW1pbHk6ICdJbnB1dCc7XG4gIH1cbjwvc3R5bGU+XG5cbjxzdmVsdGU6aGVhZD5cblx0PHRpdGxlPm5pa29sYXMud3M8L3RpdGxlPlxuXHQ8bWV0YSBuYW1lPVwiZGVzY3JpcHRpb25cIiBjb250ZW50PVwiTmlrb2xhcyBXaXNlIGlzIOKAplwiPlxuPC9zdmVsdGU6aGVhZD5cblxuPGgxPlxuXHROaWtvbGFzIFdpc2UgaXMgYSB3ZWIgZGV2ZWxvcGVyLCBmcm9udC1lbmQgc3lzdGVtIGFyY2hpdGVjdCwgYW5kIGNyZWF0aXZlIHRlY2hub2xvZ2lzdC4gXG48L2gxPlxuXG48cD5Gb3Igb3ZlciAxMCB5ZWFycywgaGUgaGFzIHdvcmtlZCBvbiB3ZWIgYXBwbGljYXRpb25zLCBkZXNpZ24gc3lzdGVtcyBhbmQgY29tcG9uZW50IGxpYnJhcmllcywgYW5kIGN1c3RvbWVyIGZhY2luZyB3ZWIgZXhwZXJpZW5jZXMuIHdpdGggZmluZSBhcnRpc3RzLCBkZXNpZ24gc3R1ZGlvcywgYW5kIHRoZSBSJkQgd2luZ3Mgb2YgdGVjaG5vbG9neSBjb21wYW5pZXMgdG8gZXhwbG9yZSB0aGUgZWRnZXMgb2Ygd2hhdCdzIHBvc3NpYmxlLjwvcD5cblxueyNpZiBsYXRlc3RQcm9qZWN0fVxuICA8aDI+TGF0ZXN0IFByb2plY3Q8L2gyPlxuICAgIFxuICA8aDM+XG4gICAgPGEgaHJlZj1cIi9wcm9qZWN0cy97bGF0ZXN0UHJvamVjdC5tZXRhLnNsdWd9XCI+XG4gICAgICB7bGF0ZXN0UHJvamVjdC5tZXRhLnRpdGxlfVxuICAgIDwvYT5cbiAgPC9oMz5cbiAge0BodG1sIGxhdGVzdFByb2plY3QubWV0YS5kZXNjcmlwdGlvbn1cbiAgPHA+XG4gICAgPGEgaHJlZj1cIi9wcm9qZWN0c1wiPlxuICAgICAgTW9yZSBQcm9qZWN0c1xuICAgIDwvYT5cbiAgPC9wPlxuey9pZn1cblxueyNpZiBsYXRlc3RUZXh0fVxuICA8aDI+VGV4dHM8L2gyPlxuXG4gIDxkYXRlPntsYXRlc3RUZXh0Lm1ldGEuZGF0ZX08L2RhdGU+XG4gIDxoMz5cbiAgICA8YSBocmVmPVwiL3RleHRzL3tsYXRlc3RUZXh0Lm1ldGEuc2x1Z31cIj5cbiAgICAgIHtsYXRlc3RUZXh0Lm1ldGEudGl0bGV9IOKAlCB7QGh0bWwgbGF0ZXN0VGV4dC5tZXRhLmRlc2NyaXB0aW9ufVxuICAgIDwvYT5cbiAgPC9oMz5cbnsvaWZ9XG5cbjxkaXYgY2xhc3M9XCJ0ZXh0c1wiPlxueyNlYWNoIHJlY2VudFRleHRzIGFzIHRleHR9XG4gIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+XG4gICAgPGRhdGU+e3RleHQubWV0YS5kYXRlfTwvZGF0ZT5cbiAgICA8aDM+XG4gICAgICA8YSBocmVmPVwiL3RleHRzL3t0ZXh0Lm1ldGEuc2x1Z31cIj5cbiAgICAgICAge3RleHQubWV0YS50aXRsZX1cbiAgICAgIDwvYT5cbiAgICA8L2gzPiAgXG4gIDwvZGl2PlxuICBcbnsvZWFjaH1cbiAgXG48L2Rpdj5cblxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBK0RPLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSzs7Ozs7aUJBR3RCLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VEQUpmLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkFldEMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJOzs7OztnQkFHdEIsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLOzs7O2lCQUFXLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0RBRDdDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5QkFTOUIsR0FBSSxJQUFDLElBQUksQ0FBQyxJQUFJOzs7Ozt5QkFHaEIsR0FBSSxJQUFDLElBQUksQ0FBQyxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkRBREQsR0FBSSxJQUFDLElBQUksQ0FBQyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lCQWhDaEMsYUFBYTtpQkFnQmIsVUFBVTtrQ0FZUixHQUFXOzs7O2dDQUFoQixNQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTVCRCxhQUFhO09BZ0JiLFVBQVU7OztpQ0FZUixHQUFXOzs7OytCQUFoQixNQUFJOzs7Ozs7Ozs7Ozs7Ozs7O29DQUFKLE1BQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQS9FQSxXQUFXLElBQ2IsS0FBSyxDQUFDLENBQUMsR0FDUCxLQUFLLENBQUMsQ0FBQyxHQUNQLEtBQUssQ0FBQyxDQUFDLEdBQ1AsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
