<script context="module">
	export const metadata = {"title":"Pressing Words, With Your Friend, Wordpress","slug":"wordpress-but-not-terrible","date":"2018.10.24","description":"A contemporary developers guide to building things on Wordpress 4.x and not having it be terrible.","type":"text, texts"};
	const { title, slug, date, description, type } = metadata;
</script>
<script>
  import Introduction from '../components/Introduction.svelte'
</script>


<Introduction {metadata} />
<p>TL:DR; <a
  href="https://github.com/nikolaswise/nanobox-wordpress-1"
  rel="nofollow"
>Start here</a>. Install <a href="https://nanobox.io/" rel="nofollow">this thing</a> and connect it to your account on <a
  href="https://www.digitalocean.com/"
  rel="nofollow"
>here</a>. Buy a license of <a
  href="https://deliciousbrains.com/wp-migrate-db-pro/"
  rel="nofollow"
>this (it’s worth it)</a>. Read some docs for <a
  href="https://www.upstatement.com/timber/"
  rel="nofollow"
>this</a> and start building. Wordpress 5 and Gutenberg will probably break all of this except the environments. </p>
<p>When I first started working as a developer, Wordpress was <em>the</em> prevalent platform for pretty much any project. Ten years later and … Wordpress is still pretty much most of the internet. In general, Wordpress will be my last choice of a platform. I prefer to build static sites, use a headless CMS, or almost anything else at all.</p>
<p>That said, as the Technical Director at Fuzzco — a design studio that relies almost exclusively on Wordpress for their websites — Wordpress was happening. Fuzzco is rare among studios in that we manage and host projects for our clients, and often have maintenance riders that can last for years. This means that in the course of a year, not only did we build a half dozen new projects on Wordpress, but we maintained and triaged issues on over 100 legacy projects. </p>
<p>Very quickly I realized I had one option: <em>make Wordpress not terrible.</em></p>
<h2>Terrible is pretty harsh</h2>
<p>If you’re comfortable with Wordpress, you might find some fightin’ words here. What’s my problem with Wordpress and what am I trying to solve for? My biggest issue with Wordpress development as I’ve encountered it in the past is a lack of clarity around the requirements of the entire system. What does the project need to run in an environment, and why? How do we move from a repository to a local environment and start working on a codebase? How does that codebase get deployed to a server? </p>
<p>I’ve seen Wordpress systems that are frozen in time in 2006 — FTP to the server and edit a CSS file on production, or “deploy” your theme by uploading a <code>.zip</code>. I’m interested in how we can lower the cognitive overhead for getting a Wordpress project up and running, and join in with pre-processing, compiling, containerizing, testing, and all the really excellent things that we’ve come to expect from our web stacks over the past few years. </p>
<p>Another issue I have with Wordpress is its commitment to auto-magical routes and rendering templates with obscure and complicated <code>.php</code> patterns that basically concatenate strings. I’m interested in explicit routes — either hard-coded or parameterized — and separating concerns between logic and template. </p>
<p>A lot of this boils down to a disagreement between what Wordpress thinks a site should be and what I end up using it for. Wordpress as designed distinguishes between your “site” and your “theme”. Your “site” is the content in the database, the options you’ve saved, and the menus and widgets you’ve installed. It expects “themes” to be presentations of this real website stuff. This model of websites perpetuates that “design” is something that can be applied over a website, a kind of dressing up of the real things. This is the inverse, and perhaps a corollary to, the concept that designing a website is just deciding what it looks like. It’s an idea that lives within the system of silos between design and development, and that we can “design” a website in Photoshop or Sketch and hand off the comps to a developer to build it. Which is how a lot of Wordpress projects are built. </p>
<p>In short, <a href="/texts/how-to-design-while-developing/">I disagree</a> with this concept of websites. My position is that designing a website is both how it looks, how it works, and how the data and structures are composed. Taking this approach, controlling the object models, the information architectures, and the templates are all of equal importance. In my line of work, a Wordpress theme can not be applied to any other site than the one that it was designed for, a site where the structure was designed for the theme.</p>
<h2>So why use Wordpress?</h2>
<p>There are still a number of really good, compelling reasons to use Wordpress as a platform for building websites. It’s got a robust built-in commenting system with user accounts. It’s really good for things that are shaped like blogs. It’s got a huge, well-maintained ecosystem of plugins. It’s free. And since it’s most of the Internet, clients are really, really comfortable with it. </p>
<p>There are a couple of reasons <em>not</em> to use Wordpress right now. Mostly these center around the impending release of Wordpress 5.0 and the Gutenberg editor, which has a number of concerns around plugin compatibility and accessibility for authors. </p>
<p>But that’s okay, since we’ve decided to use Wordpress 4.x. As we all know, picking a version of Wordpress and then never upgrading it is one of the time honored traditions of Wordpress development. </p>
<h2>How does this work even</h2>
<p>Let’s start at the end. </p>
<p>We’re going to be hosting our production Wordpress site on a <a
  href="https://www.digitalocean.com/"
  rel="nofollow"
>Digital Ocean</a> droplet — the <a
  href="https://www.digitalocean.com/pricing/"
  rel="nofollow"
>smallest</a> one they have — for $5 per month. Depending on the project lifecycle, we can set up more droplets for a staging server and a development server. At Fuzzco we used dev servers to show sites to the internal team, staging servers to show sites to the client, and production servers to show sites to the public. </p>
<p>I don’t know about you, but I personally don’t super love managing my virtual private servers manually. In order to deploy our codebases to Digital Ocean we’ll use the phenomenal tool <a
  href="https://nanobox.io/"
  rel="nofollow"
>Nanobox</a>. Nanobox is an operations layer that handles containerizing applications and deploying them agnostically to a cloud service provider. Nanobox will deploy our code from the command line to any one of our droplets. </p>
<p>Nanobox will also containerize and run an application in a virtual machine <em>locally</em>. This means we’ll use it to run our development environment, and ensure that all of our environments are identical. No more worrying about PHP versions and extensions and plugins. No more running MAMP or MySQL or Apache or whatever on your local machine before anything works. Nanobox defines the server in a <code>.yaml</code> file, and it will always be the same. It also handles all the syncing between our local disk and our virtual environment.</p>
<p>So now that we know how our code is going from local to production, we can think for a second about <em>how</em> it’s going to do that, and how we’re going to manage our data.</p>
<p>The database on the production server is “canonical”. That means that the database the client interacts with is the one true database, and we must treat it with care and attention. We’ll never change that database ourselves, and we’ll move that database <em>downstream</em> from production to staging to dev to local in order to develop against our real data. Importantly, we don’t want to migrate the database manually either. It’s a little expensive but using <a
  href="https://deliciousbrains.com/wp-migrate-db-pro/pricing/"
  rel="nofollow"
>Migrate DB Pro</a> is an incredible resource for this part. I guess one could also look into <a
  href="https://github.com/wp-sync-db/wp-sync-db"
  rel="nofollow"
>alternatives</a> for personal projects. </p>
<p>The canonical <em>codebase</em> lives in version control, and moves the other direction. From Github to local to dev to staging to production, amen. The only things we need to track in version control are what makes our project unique. Practically, this means we need to track our theme and our plugins. Wordpress core files are not special, and we should not fill our repositories with them.</p>
<h2>Getting started</h2>
<p>At this point it’s worth <a
  href="https://docs.nanobox.io/install/"
  rel="nofollow"
>getting started with Nanobox</a>. I back the containers with <a
  href="https://docs.nanobox.io/install/#lightweight-vm-virtualbox"
  rel="nofollow"
>VirtualBox</a>, since at the time I started this it was slightly more stable than Docker on MacOS High Sierra. Once Nanobox & Virtualbox/Docker is installed, set up <a
  href="https://docs.nanobox.io/providers/hosting-accounts/digitalocean/"
  rel="nofollow"
>Digital Ocean as your provider</a>. Once that’s done, we have everything we need to get started!</p>
<p>I’ll be talking through a project I built in order to facilitate building other projects. This will be more intense than you might need for a single build, but this was designed a tool that anyone can use to get started quickly. Here’s the basic structure of our repo:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">📁 /project-name
⮑ 📄 .gitignore    # includes /wp
⮑ 📄 package.json  # tooling lives here
⮑ 📄 readme.md     # be nice, write docs    
⮑ 📁 theme         # our theme codebase
⮑ 📁 plugins       # vendor plugins
⮑ 📁 scripts       # some helpers</code>`}</pre>
<p>The crux of the project is our <code>boxfile.yml</code> configuration file. This is what Nanobox uses to create our containers. It looks like this!</p>
<pre class="language-undefined">{@html `<code class="language-undefined"># /boxfile.yml                
run.config:                    # 
  engine: php                  #
  engine.config:               #
    runtime: php-7.0           # Defines PHP version
    document_root: &#39;wp/&#39;       # Dir to serve app from
    extensions:                # PHP extensions we need
      - gd                     #
      - mysqli                 #
      - curl                   #
      - zlib                   #
      - ctype                  #
                               #
web.wp:                        #
  start: php-server            #
  network_dirs:                #
    data.storage:              #
      - wp/wp-content/uploads/ #
data.db:                       #
  image: nanobox/mysql:5.6     # Nanobox DB magic
                               #
data.storage:                  #
  image: nanobox/unfs:0.9      #</code>`}</pre>
<p>As noted above, we’ll be serving our entire installation of Wordpress in the <code>/wp</code> directory. This will hold all the Wordpress core files and compiled theme code, none of of which we need or want in version control. As such, make sure this is listed alongside <code>node_modules</code> in the <code>.gitignore</code>.</p>
<p>Since we’ve decided that we don’t want to track these files, but we need them to actually have a project, we can write a helper script to take care of the gap between those two ideas. </p>
<p>Here are the scripts we’re going to write to help us handle this process:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">📁 /project-name
⮑ 📁 scripts
   ⮑ 📄 check-install.sh # Installs Wordpress core files.
   ⮑ 📄 init.sh          # Runs our setup helper.
   ⮑ 📄 prestart.sh      # Checks if we need to init.
   ⮑ 📄 setup.js         # Cute lil&#39; CLI helper.</code>`}</pre>
<p>The first thing we’ll do is write a script that checks if <code>/wp</code> exists. If it doesn’t, throw an error that we need to initialize the project since we don’t have any of the core files we need.</p>
<pre class="language-undefined">{@html `<code class="language-undefined"># prestart.sh
#!/bin/bash
echo &#39;Check to make sure wordpress is here at all&#39;
if test -d ./wp/
then
  echo &#39;yup we good&#39;
  exit 0
else
  echo &#39;Project not initialized: Run &#96;$ npm run init&#96;&#39;
  exit 1
fi</code>`}</pre>
<p>I’m calling this <code>prestart</code> because I want to run it before <code>npm start</code>. Many times I’ll be on autopilot, and after cloning a repo simply run <code>npm install</code> and <code>npm start</code>. This interrupts that process and lets me know I need a third step, <code>npm run init</code>. Let’s put this in our <code>package.json</code> scripts:</p>
<pre class="language-undefined">{@html `<code class="language-undefined"># package.json
&#123;
  ...
  &quot;scripts&quot;: &#123;
    ...
    &quot;init&quot;: &quot;./scripts/init.sh&quot;,
    &quot;prestart&quot;: &quot;./scripts/prestart.sh&quot;,
    &quot;start&quot;: &quot;npm run dev&quot;
  &#125;
  ...
&#125;</code>`}</pre>
<p>We’ll get to our dev tooling later. Lets take a look at what our <code>init.sh</code> script does:</p>
<pre class="language-undefined">{@html `<code class="language-undefined"># init.sh
#!/bin/bash
node ./scripts/setup.js  </code>`}</pre>
<p>Not much! This just runs our setup CLI helper. You might not need all this, but since I built this system to help a team of developers work on <em>many many</em> projects you’re gonna get it anyway.</p>
<pre class="language-undefined">{@html `<code class="language-undefined">// setup.js

// some nice deps for making a CLI.
const prompt = require(&#39;prompt&#39;)
const exec = require(&#39;child_process&#39;).exec
const colors = require(&quot;colors/safe&quot;)

// Run and log a bash command
const bash = cmd =&gt; &#123;
  msg(&#39;green&#39;, &#96;Running: $&#123;cmd&#125;&#96;)
  return new Promise(function(resolve, reject) &#123;
    exec(cmd, (err, stdout, stderr) =&gt; &#123;
      if (err) reject(err)
      resolve(stdout, stderr)
    &#125;)
  &#125;);
&#125;

// Log a message
const msg = (color, text) =&gt; &#123;
  console.log(colors[color](text))
&#125;

// do the magic
const setup = (err, result) =&gt; &#123;
  if (err) msg(&#96;red&#96;, err)

  msg(&#39;yellow&#39;, &#39;WordPress configuration values ☟&#39;)

  for (let key in result) &#123;
    msg(&#39;yellow&#39;, &#96;$&#123;key&#125;: $&#123;result[key]&#125;;&#96;)
  &#125;
  // run our check-install script.
  bash(&#96;$&#123;process.cwd()&#125;/scripts/check-install.sh&#96;)
  .then(ok =&gt; &#123;
    // add our project to hostfile
    bash(&#96;nanobox dns add local $&#123;result.name&#125;.local&#96;)
  &#125;)
  .then(ok =&gt; &#123;
    // explain the next step
    msg(&#39;green&#39;, &#96;Run npm start, then finish setting up WordPress at $&#123;result.name&#125;.local/wp-admin&#96;)
  &#125;)
&#125;

msg(&#39;green&#39;, &#39;Making Progress!&#39;)
prompt.start();
prompt.get(&#123;
  properties: &#123;
    name: &#123;
      description: colors.magenta(&quot;Project name:&quot;)
    &#125;
  &#125;
&#125;, setup);</code>`}</pre>
<p>This will open a CLI asking for the name of the project, run the <code>check-install.sh</code> script, create the hostfile line for our local DNS at <code>&lt;project-name&gt;.local</code>, and log the next action that you need to take to finish installing Wordpress. </p>
<p>Lets take a peek at our <code>check-install.sh</code> file:</p>
<pre class="language-undefined">{@html `<code class="language-undefined"># check-install.sh
#!/bin/bash
echo &#39;Check to make sure wordpress is here at all&#39;
if test -d ./wp/
then
  echo &#39;yup we good&#39;
else
  echo &#39;nope we need that&#39;
  degit git@github.com:nanobox-quickstarts/nanobox-wordpress.git wp
fi
rsync -va --delete ./plugins/ ./wp/wp-content/plugins/
rsync -va --delete ./theme/ ./wp/wp-content/themes/my-theme</code>`}</pre>
<p>Very similar to <code>prestart</code>! The biggest difference is the bit where we use <code>degit</code> to clone Nanobox’s official Wordpress repo into our untracked <code>/wp</code> directory. Degit will only get the head files, and none of the git history. Nor will it keep the <code>.git</code> file, basically making this a super clean, super fast way to download a directory of files. It’s great. The last thing this does is wipe out any themes or plugins that we don’t want our need in the core files and syncs out own tracked directories to the correct places in the Wordpress core file structure.</p>
<p>Now would be a time to talk about plugins. </p>
<h2>What’s up with plugins?</h2>
<p>Wordpress has a million plugins. We’re going to focus on some of the basic ones that almost every Wordpress project ever needs, and should honestly be part of Wordpress. Building sites without these is a pain. Here they are:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">📁 /project-name
⮑ 📁 plugins
  ⮑ 📁 advanced-custom-fields-pro
  ⮑ 📁 custom-post-types-ui
  ⮑ 📁 timber-library
  ⮑ 📁 wp-migrate-db-pro</code>`}</pre>
<p>There are a couple more in my repo to do things like order posts in the CMS and import CSVs. Not super necessary, so we won’t talk about theme here. </p>
<h3>Advanced Custom Fields</h3>
<p><a href="https://www.advancedcustomfields.com/" rel="nofollow">ACF</a> is a staple of Wordpress development. It lets us define new key/value pairs to extend the data model of things like posts and pages, and allows us to create a set of global variable available from anywhere. Sounds simple, surprising it’s not part of Wordpress.</p>
<h3>Custom Post Types UI</h3>
<p><a
  href="https://wordpress.org/plugins/custom-post-type-ui/"
  rel="nofollow"
>CPT-UI</a> creates an interface in the admin panel for creating new post types. Out of the box, Wordpress comes with <code>Posts</code> and <code>Pages</code>. CPT-UI lets us build new types like <code>Projects</code> or <code>Case Studies</code> or whatever need for our data model. Again, surprising that this  isn’t just part of Wordpress. C’est la vivre.</p>
<h3>WP Migrate DB</h3>
<p><a
  href="https://deliciousbrains.com/wp-migrate-db-pro/"
  rel="nofollow"
>Migrate DB</a> lets us … migrate … our … DB. This gives us the ability to sync our databases across environments and get media uploads and things without needing to write magic MySQL queries while tunneled into open database ports on virtual machines. This is better. Believe me. </p>
<h3>Timber</h3>
<p>The <a href="https://www.upstatement.com/timber/" rel="nofollow">Timber</a> library from Upstatement is the greatest thing to happen to Wordpress development, after those plugins that should just be part of Wordpress. Timber introduces the concept of <em>layout templates</em> to Wordpress. This lets us write PHP to manipulate data, and pass that data to a template file where we can write <a
  href="https://twig.symfony.com/"
  rel="nofollow"
>Twig templates</a> rather than composing strings in PHP. Basically …</p>
<pre class="language-undefined">{@html `<code class="language-undefined">&lt;?php echo $myvar ?&gt;</code>`}</pre>
<p>Turns in to:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">&#123;&#123; myvar &#125;&#125;</code>`}</pre>
<p>This lets us write templates with a templating language, and write server-side business logic in a server-side programming language. Truly revolutionary. </p>
<h2>What we talk about when we talk about Wordpress development: or, The Theme.</h2>
<p>With all this initial work around Wordpress core, development environments, and a basic plugin ecosystem in place we can start talking about the good stuff: the theme!</p>
<pre class="language-undefined">{@html `<code class="language-undefined">📁 /project-name
⮑ 📁 theme
   ⮑ 📁 es6              # Source JS
   ⮑ 📁 scss             # Source SCSS
   ⮑ 📁 routes           # PHP route logic files
      ⮑ 📄 index.php
      ⮑ 📄 page.php
      ⮑ 📄 post.php
   ⮑ 📁 views            # Twig templates
      ⮑ 📁 layouts
      ⮑ 📁 pages
      ⮑ 📁 partials
   ⮑ 📄 functions.php    # This includes routing.
   ⮑ 📄 screenshot.png   # Theme preview image.
   ⮑ 📄 index.php        # Need this, but it&#39;s empty.¯\_(ツ)_/¯</code>`}</pre>
<p>We won’t get too deep into this, since we’re getting into more conventional territory here. Basically our <code>es6</code> directory holds source JS that will get compiled into a bundle. Same with the <code>scss</code> directory, which gets compiled into css. We handle that with npm scripts in the <code>package.json</code>.</p>
<pre class="language-undefined">{@html `<code class="language-undefined"># package.json
&#123;
  ...
  &quot;scripts&quot;: &#123;
    ...
    &quot;css&quot;: &quot;node-sass ./theme/scss/style.scss theme/style.css --watch&quot;,
    &quot;js&quot;: &quot;rollup -c -w&quot;,
    ...
  &#125;
  ...
&#125;</code>`}</pre>
<p>Hopefully none of this is to unusual — if it’s is I recommend reading Paul Pederson’s <a
  href="http://paulcpederson.com/articles/npm-run/"
  rel="nofollow"
>excellent article on npm scripts</a>.</p>
<p>There is one part of this I want to touch on before moving on:</p>
<pre class="language-undefined">{@html `<code class="language-undefined"># package.json
&#123;
  ...
  &quot;scripts&quot;: &#123;
    ...
    &quot;sync:plugins&quot;: &quot;rsync -va --delete ./plugins/ ./wp/wp-content/plugins/&quot;,
    &quot;sync:theme&quot;: &quot;rsync -va --delete ./theme/ ./wp/wp-content/themes/fuzzco&quot;,    
    &quot;watch&quot;: &quot;rerun-script&quot;,
    ...
  &#125;,
  &quot;watches&quot;: &#123;
    &quot;sync:plugins&quot;: &quot;plugins/**/*.*&quot;,
    &quot;sync:theme&quot;: &quot;theme/**/*.*&quot;
  &#125;,
  ... </code>`}</pre>
<p>This bit sets up a watcher on our <code>theme</code> and <code>plugins</code> directory, which sync our tracked working files to the correct place in our Wordpress core file structure. </p>
<h2>Functions, Routes, and Views</h2>
<p>The last thing I want to touch on is the basic structure of using Timber to match routes with views. </p>
<pre class="language-undefined">{@html `<code class="language-undefined">/** functions.php */
Routes::map(&#39;/&#39;, function($params)&#123;
  Routes::load(&#39;routes/page.php&#39;, $params, null, 200);
&#125;);
Routes::map(&#39;/:page&#39;, function ($params) &#123;
  $page = get_page_by_path($params[&#39;page&#39;]);
  if ($page) &#123;
      Routes::load(&#39;routes/page.php&#39;, $params, null, 200);
  &#125; else &#123;
      Routes::load(&#39;routes/404.php&#39;, $params, null, 404);
  &#125;
&#125;);
Routes::map(&#39;/blog/:post&#39;, function($params)&#123;
  Routes::load(&#39;routes/post.php&#39;, $params, null, 200);
&#125;);</code>`}</pre>
<p>These are Timber routes defined in the <code>functions.php</code> file. This replaces the standard routing of Wordpress, and we have change the structure of the Wordpress permalinks to anything other than the default to have it work. This is documented in Timber. </p>
<p>When our server gets a request at a route of <code>/page-name</code>, it will call the <code>page.php</code> file and pass it the params associated with the route. </p>
<pre class="language-undefined">{@html `<code class="language-undefined">/** page.php */
&lt;?php
  $context = Timber::get_context();
  $post = new TimberPost();
  $context[&#39;page&#39;] = $post;
  
  Timber::render( array(
    &#39;views/pages/page-&#39; . $post-&gt;post_name . &#39;.twig&#39;,
    &#39;views/pages/page.twig&#39;
  ), $context );
?&gt;</code>`}</pre>
<p>The <code>page.php</code> file assigns some variables, interacts with Wordpress to get and shape our data, and then renders the twig file associated with the page. In this case, it’s going to see if there’s a template that matches the name of our page, otherwise it will render the default page template.</p>
<h2>Back to the beginning</h2>
<p>You’ve built your theme! Maybe it’s a simple hello world, maybe it’s a heavy duty big ol’ thing. Either way, it’s time to deploy.</p>
<p>You can use Nanobox to create a droplet for your server. Nanobox will give your project a name in their system, and expose the URL for the server at <code>&lt;your-project&gt;.nanoapp.io</code>. I like to use the convention <code>project-dev</code>, <code>project-stage</code>, and <code>project-prod</code>. Once you create your project in Nanobox, the hard part is over and you can let them do the heavy lifting:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">$ nanobox deploy project-dev</code>`}</pre>
<p>Or we can map this to our NPM script:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">$ npm run deploy:dev  </code>`}</pre>
<p>This will containerize our application, push it to our droplet, hydrate the entire thing, and serve! Now we can use Migrate DB to move our database around, and we’re in business. </p>
<h2>Putting it all together</h2>
<p><a
  href="https://github.com/nikolaswise/nanobox-sapper-1"
  rel="nofollow"
>The project repo</a> is a turnkey, ready to roll version of all the above. It contains all the tooling needed to get started, and if you’ve followed along with this guide, you should be able to get started in no time. </p>
<p>As always, feel free to reach out to me in your venue of choice to talk about any of this — I would be happy to help you set this up for your own Wordpress project!</p>
