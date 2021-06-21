---
title: "Pressing Words, With Your Friend, Wordpress"
slug: wordpress-but-not-terrible
date: 2018.10.24
description: A contemporary developers guide to building things on Wordpress 4.x and not having it be terrible. 
type: text
---

TL:DR; [Start here](https://github.com/nikolaswise/nanobox-wordpress-1). Install [this thing](https://nanobox.io/) and connect it to your account on [here](https://www.digitalocean.com/). Buy a license of [this (it's worth it)](https://deliciousbrains.com/wp-migrate-db-pro/). Read some docs for [this](https://www.upstatement.com/timber/) and start building. Wordpress 5 and Gutenberg will probably break all of this except the environments. 

When I first started working as a developer, Wordpress was _the_ prevalent platform for pretty much any project. Ten years later and … Wordpress is still pretty much most of the internet. In general, Wordpress will be my last choice of a platform. I prefer to build static sites, use a headless CMS, or almost anything else at all.

That said, as the Technical Director at Fuzzco — a design studio that relies almost exclusively on Wordpress for their websites — Wordpress was happening. Fuzzco is rare among studios in that we manage and host projects for our clients, and often have maintenance riders that can last for years. This means that in the course of a year, not only did we build a half dozen new projects on Wordpress, but we maintained and triaged issues on over 100 legacy projects. 

Very quickly I realized I had one option: _make Wordpress not terrible._

## Terrible is pretty harsh

If you're comfortable with Wordpress, you might find some fightin' words here. What's my problem with Wordpress and what am I trying to solve for? My biggest issue with Wordpress development as I've encountered it in the past is a lack of clarity around the requirements of the entire system. What does the project need to run in an environment, and why? How do we move from a repository to a local environment and start working on a codebase? How does that codebase get deployed to a server? 

I've seen Wordpress systems that are frozen in time in 2006 — FTP to the server and edit a CSS file on production, or "deploy" your theme by uploading a `.zip`. I'm interested in how we can lower the cognitive overhead for getting a Wordpress project up and running, and join in with pre-processing, compiling, containerizing, testing, and all the really excellent things that we've come to expect from our web stacks over the past few years. 

Another issue I have with Wordpress is its commitment to auto-magical routes and rendering templates with obscure and complicated `.php` patterns that basically concatenate strings. I'm interested in explicit routes — either hard-coded or parameterized — and separating concerns between logic and template. 

A lot of this boils down to a disagreement between what Wordpress thinks a site should be and what I end up using it for. Wordpress as designed distinguishes between your "site" and your "theme". Your "site" is the content in the database, the options you've saved, and the menus and widgets you've installed. It expects "themes" to be presentations of this real website stuff. This model of websites perpetuates that "design" is something that can be applied over a website, a kind of dressing up of the real things. This is the inverse, and perhaps a corollary to, the concept that designing a website is just deciding what it looks like. It's an idea that lives within the system of silos between design and development, and that we can "design" a website in Photoshop or Sketch and hand off the comps to a developer to build it. Which is how a lot of Wordpress projects are built. 

In short, [I disagree](/texts/how-to-design-while-developing/) with this concept of websites. My position is that designing a website is both how it looks, how it works, and how the data and structures are composed. Taking this approach, controlling the object models, the information architectures, and the templates are all of equal importance. In my line of work, a Wordpress theme can not be applied to any other site than the one that it was designed for, a site where the structure was designed for the theme.

## So why use Wordpress?

There are still a number of really good, compelling reasons to use Wordpress as a platform for building websites. It's got a robust built-in commenting system with user accounts. It's really good for things that are shaped like blogs. It's got a huge, well-maintained ecosystem of plugins. It's free. And since it's most of the Internet, clients are really, really comfortable with it. 

There are a couple of reasons _not_ to use Wordpress right now. Mostly these center around the impending release of Wordpress 5.0 and the Gutenberg editor, which has a number of concerns around plugin compatibility and accessibility for authors. 

But that's okay, since we've decided to use Wordpress 4.x. As we all know, picking a version of Wordpress and then never upgrading it is one of the time honored traditions of Wordpress development. 

## How does this work even

Let's start at the end. 

We're going to be hosting our production Wordpress site on a [Digital Ocean](https://www.digitalocean.com/) droplet — the [smallest](https://www.digitalocean.com/pricing/) one they have — for $5 per month. Depending on the project lifecycle, we can set up more droplets for a staging server and a development server. At Fuzzco we used dev servers to show sites to the internal team, staging servers to show sites to the client, and production servers to show sites to the public. 

I don't know about you, but I personally don't super love managing my virtual private servers manually. In order to deploy our codebases to Digital Ocean we'll use the phenomenal tool [Nanobox](https://nanobox.io/). Nanobox is an operations layer that handles containerizing applications and deploying them agnostically to a cloud service provider. Nanobox will deploy our code from the command line to any one of our droplets. 

Nanobox will also containerize and run an application in a virtual machine _locally_. This means we'll use it to run our development environment, and ensure that all of our environments are identical. No more worrying about PHP versions and extensions and plugins. No more running MAMP or MySQL or Apache or whatever on your local machine before anything works. Nanobox defines the server in a `.yaml` file, and it will always be the same. It also handles all the syncing between our local disk and our virtual environment.

So now that we know how our code is going from local to production, we can think for a second about _how_ it's going to do that, and how we're going to manage our data.

The database on the production server is "canonical". That means that the database the client interacts with is the one true database, and we must treat it with care and attention. We'll never change that database ourselves, and we'll move that database _downstream_ from production to staging to dev to local in order to develop against our real data. Importantly, we don't want to migrate the database manually either. It's a little expensive but using [Migrate DB Pro](https://deliciousbrains.com/wp-migrate-db-pro/pricing/) is an incredible resource for this part. I guess one could also look into [alternatives](https://github.com/wp-sync-db/wp-sync-db) for personal projects. 

The canonical _codebase_ lives in version control, and moves the other direction. From Github to local to dev to staging to production, amen. The only things we need to track in version control are what makes our project unique. Practically, this means we need to track our theme and our plugins. Wordpress core files are not special, and we should not fill our repositories with them.

## Getting started

At this point it's worth [getting started with Nanobox](https://docs.nanobox.io/install/). I back the containers with [VirtualBox](https://docs.nanobox.io/install/#lightweight-vm-virtualbox), since at the time I started this it was slightly more stable than Docker on MacOS High Sierra. Once Nanobox & Virtualbox/Docker is installed, set up [Digital Ocean as your provider](https://docs.nanobox.io/providers/hosting-accounts/digitalocean/). Once that's done, we have everything we need to get started!

I'll be talking through a project I built in order to facilitate building other projects. This will be more intense than you might need for a single build, but this was designed a tool that anyone can use to get started quickly. Here's the basic structure of our repo:

```
📁 /project-name
⮑ 📄 .gitignore    # includes /wp
⮑ 📄 package.json  # tooling lives here
⮑ 📄 readme.md     # be nice, write docs    
⮑ 📁 theme         # our theme codebase
⮑ 📁 plugins       # vendor plugins
⮑ 📁 scripts       # some helpers
```

The crux of the project is our `boxfile.yml` configuration file. This is what Nanobox uses to create our containers. It looks like this!

```                            
# /boxfile.yml                
run.config:                    # 
  engine: php                  #
  engine.config:               #
    runtime: php-7.0           # Defines PHP version
    document_root: 'wp/'       # Dir to serve app from
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
  image: nanobox/unfs:0.9      #
```                            

As noted above, we'll be serving our entire installation of Wordpress in the `/wp` directory. This will hold all the Wordpress core files and compiled theme code, none of of which we need or want in version control. As such, make sure this is listed alongside `node_modules` in the `.gitignore`.

Since we've decided that we don't want to track these files, but we need them to actually have a project, we can write a helper script to take care of the gap between those two ideas. 

Here are the scripts we're going to write to help us handle this process:

```
📁 /project-name
⮑ 📁 scripts
   ⮑ 📄 check-install.sh # Installs Wordpress core files.
   ⮑ 📄 init.sh          # Runs our setup helper.
   ⮑ 📄 prestart.sh      # Checks if we need to init.
   ⮑ 📄 setup.js         # Cute lil' CLI helper.
```

The first thing we'll do is write a script that checks if `/wp` exists. If it doesn't, throw an error that we need to initialize the project since we don't have any of the core files we need.

```
# prestart.sh
#!/bin/bash
echo 'Check to make sure wordpress is here at all'
if test -d ./wp/
then
  echo 'yup we good'
  exit 0
else
  echo 'Project not initialized: Run `$ npm run init`'
  exit 1
fi
```

I'm calling this `prestart` because I want to run it before `npm start`. Many times I'll be on autopilot, and after cloning a repo simply run `npm install` and `npm start`. This interrupts that process and lets me know I need a third step, `npm run init`. Let's put this in our `package.json` scripts:

```
# package.json
{
  ...
  "scripts": {
    ...
    "init": "./scripts/init.sh",
    "prestart": "./scripts/prestart.sh",
    "start": "npm run dev"
  }
  ...
}
```

We'll get to our dev tooling later. Lets take a look at what our `init.sh` script does:

```
# init.sh
#!/bin/bash
node ./scripts/setup.js  
```

Not much! This just runs our setup CLI helper. You might not need all this, but since I built this system to help a team of developers work on _many many_ projects you're gonna get it anyway.

```
// setup.js

// some nice deps for making a CLI.
const prompt = require('prompt')
const exec = require('child_process').exec
const colors = require("colors/safe")

// Run and log a bash command
const bash = cmd => {
  msg('green', `Running: ${cmd}`)
  return new Promise(function(resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) reject(err)
      resolve(stdout, stderr)
    })
  });
}

// Log a message
const msg = (color, text) => {
  console.log(colors[color](text))
}

// do the magic
const setup = (err, result) => {
  if (err) msg(`red`, err)

  msg('yellow', 'WordPress configuration values ☟')

  for (let key in result) {
    msg('yellow', `${key}: ${result[key]};`)
  }
  // run our check-install script.
  bash(`${process.cwd()}/scripts/check-install.sh`)
  .then(ok => {
    // add our project to hostfile
    bash(`nanobox dns add local ${result.name}.local`)
  })
  .then(ok => {
    // explain the next step
    msg('green', `Run npm start, then finish setting up WordPress at ${result.name}.local/wp-admin`)
  })
}

msg('green', 'Making Progress!')
prompt.start();
prompt.get({
  properties: {
    name: {
      description: colors.magenta("Project name:")
    }
  }
}, setup);
```

This will open a CLI asking for the name of the project, run the `check-install.sh` script, create the hostfile line for our local DNS at `<project-name>.local`, and log the next action that you need to take to finish installing Wordpress. 

Lets take a peek at our `check-install.sh` file:

```
# check-install.sh
#!/bin/bash
echo 'Check to make sure wordpress is here at all'
if test -d ./wp/
then
  echo 'yup we good'
else
  echo 'nope we need that'
  degit git@github.com:nanobox-quickstarts/nanobox-wordpress.git wp
fi
rsync -va --delete ./plugins/ ./wp/wp-content/plugins/
rsync -va --delete ./theme/ ./wp/wp-content/themes/my-theme
```

Very similar to `prestart`! The biggest difference is the bit where we use `degit` to clone Nanobox's official Wordpress repo into our untracked `/wp` directory. Degit will only get the head files, and none of the git history. Nor will it keep the `.git` file, basically making this a super clean, super fast way to download a directory of files. It's great. The last thing this does is wipe out any themes or plugins that we don't want our need in the core files and syncs out own tracked directories to the correct places in the Wordpress core file structure.

Now would be a time to talk about plugins. 

## What's up with plugins?

Wordpress has a million plugins. We're going to focus on some of the basic ones that almost every Wordpress project ever needs, and should honestly be part of Wordpress. Building sites without these is a pain. Here they are:

```
📁 /project-name
⮑ 📁 plugins
  ⮑ 📁 advanced-custom-fields-pro
  ⮑ 📁 custom-post-types-ui
  ⮑ 📁 timber-library
  ⮑ 📁 wp-migrate-db-pro
```

There are a couple more in my repo to do things like order posts in the CMS and import CSVs. Not super necessary, so we won't talk about theme here. 

### Advanced Custom Fields 

[ACF](https://www.advancedcustomfields.com/) is a staple of Wordpress development. It lets us define new key/value pairs to extend the data model of things like posts and pages, and allows us to create a set of global variable available from anywhere. Sounds simple, surprising it's not part of Wordpress.

### Custom Post Types UI

[CPT-UI](https://wordpress.org/plugins/custom-post-type-ui/) creates an interface in the admin panel for creating new post types. Out of the box, Wordpress comes with `Posts` and `Pages`. CPT-UI lets us build new types like `Projects` or `Case Studies` or whatever need for our data model. Again, surprising that this  isn't just part of Wordpress. C'est la vivre.

### WP Migrate DB

[Migrate DB](https://deliciousbrains.com/wp-migrate-db-pro/) lets us ... migrate ... our ... DB. This gives us the ability to sync our databases across environments and get media uploads and things without needing to write magic MySQL queries while tunneled into open database ports on virtual machines. This is better. Believe me. 

### Timber

The [Timber](https://www.upstatement.com/timber/) library from Upstatement is the greatest thing to happen to Wordpress development, after those plugins that should just be part of Wordpress. Timber introduces the concept of _layout templates_ to Wordpress. This lets us write PHP to manipulate data, and pass that data to a template file where we can write [Twig templates](https://twig.symfony.com/) rather than composing strings in PHP. Basically ...

```
<?php echo $myvar ?>
```

Turns in to:

{% raw %}
```
{{ myvar }}
```
{% endraw %}

This lets us write templates with a templating language, and write server-side business logic in a server-side programming language. Truly revolutionary. 

## What we talk about when we talk about Wordpress development: or, The Theme.

With all this initial work around Wordpress core, development environments, and a basic plugin ecosystem in place we can start talking about the good stuff: the theme!

```
📁 /project-name
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
   ⮑ 📄 index.php        # Need this, but it's empty.¯\_(ツ)_/¯
```

We won't get too deep into this, since we're getting into more conventional territory here. Basically our `es6` directory holds source JS that will get compiled into a bundle. Same with the `scss` directory, which gets compiled into css. We handle that with npm scripts in the `package.json`.

```
# package.json
{
  ...
  "scripts": {
    ...
    "css": "node-sass ./theme/scss/style.scss theme/style.css --watch",
    "js": "rollup -c -w",
    ...
  }
  ...
}
```

Hopefully none of this is to unusual — if it's is I recommend reading Paul Pederson's [excellent article on npm scripts](http://paulcpederson.com/articles/npm-run/).

There is one part of this I want to touch on before moving on:

```
# package.json
{
  ...
  "scripts": {
    ...
    "sync:plugins": "rsync -va --delete ./plugins/ ./wp/wp-content/plugins/",
    "sync:theme": "rsync -va --delete ./theme/ ./wp/wp-content/themes/fuzzco",    
    "watch": "rerun-script",
    ...
  },
  "watches": {
    "sync:plugins": "plugins/**/*.*",
    "sync:theme": "theme/**/*.*"
  },
  ... 
```

This bit sets up a watcher on our `theme` and `plugins` directory, which sync our tracked working files to the correct place in our Wordpress core file structure. 

## Functions, Routes, and Views

The last thing I want to touch on is the basic structure of using Timber to match routes with views. 

```
/** functions.php */
Routes::map('/', function($params){
  Routes::load('routes/page.php', $params, null, 200);
});
Routes::map('/:page', function ($params) {
  $page = get_page_by_path($params['page']);
  if ($page) {
      Routes::load('routes/page.php', $params, null, 200);
  } else {
      Routes::load('routes/404.php', $params, null, 404);
  }
});
Routes::map('/blog/:post', function($params){
  Routes::load('routes/post.php', $params, null, 200);
});
```

These are Timber routes defined in the `functions.php` file. This replaces the standard routing of Wordpress, and we have change the structure of the Wordpress permalinks to anything other than the default to have it work. This is documented in Timber. 

When our server gets a request at a route of `/page-name`, it will call the `page.php` file and pass it the params associated with the route. 

```
/** page.php */
<?php
  $context = Timber::get_context();
  $post = new TimberPost();
  $context['page'] = $post;
  
  Timber::render( array(
    'views/pages/page-' . $post->post_name . '.twig',
    'views/pages/page.twig'
  ), $context );
?>
```

The `page.php` file assigns some variables, interacts with Wordpress to get and shape our data, and then renders the twig file associated with the page. In this case, it's going to see if there's a template that matches the name of our page, otherwise it will render the default page template.

## Back to the beginning

You've built your theme! Maybe it's a simple hello world, maybe it's a heavy duty big ol' thing. Either way, it's time to deploy.

You can use Nanobox to create a droplet for your server. Nanobox will give your project a name in their system, and expose the URL for the server at `<your-project>.nanoapp.io`. I like to use the convention `project-dev`, `project-stage`, and `project-prod`. Once you create your project in Nanobox, the hard part is over and you can let them do the heavy lifting:

```
$ nanobox deploy project-dev
```

Or we can map this to our NPM script:

```
$ npm run deploy:dev  
```

This will containerize our application, push it to our droplet, hydrate the entire thing, and serve! Now we can use Migrate DB to move our database around, and we're in business. 

## Putting it all together

[The project repo](https://github.com/nikolaswise/nanobox-sapper-1) is a turnkey, ready to roll version of all the above. It contains all the tooling needed to get started, and if you've followed along with this guide, you should be able to get started in no time. 

As always, feel free to reach out to me in your venue of choice to talk about any of this — I would be happy to help you set this up for your own Wordpress project!