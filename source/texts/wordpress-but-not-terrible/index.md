---
title: "Pressing Words, With Your Friend, Wordpress"
date: 2018.10.24
description: A contemporary developers guide to building things on Wordpress and not having it be terrible. 
template: _templates/article.html
block: text
---

TL:DR; [Start here](https://github.com/nikolaswise/nanobox-wordpress-1). Install [this thing](https://nanobox.io/) and connect it to your account on [this other thing](https://www.digitalocean.com/). Buy a license of [this (it's worth it)](https://deliciousbrains.com/wp-migrate-db-pro/). Read some docs for [this](https://www.upstatement.com/timber/) and build away.

When I first started working as a developer, Wordpress was _the_ prevalent platform for pretty much any project. Ten years later and ... Wordpress is still pretty much most of the internet. In general, Wordpress will be my last choice of a platform, preferring to use static sites, headless CMS's, or almost anything else at all.

But Nik, I hear you cry, did you not just wrap up your tenure as the Technical Director at Fuzzco, a design studio that relies almost exclusively on Wordpress for all of their websites? Yes, indeed I did. Fuzzco is rare among studios in that we manage and host projects for our clients, and often have maintenance riders that can last for years. This means that in the course of a year, not only did we build a half dozen new projects on Wordpress, but we maintained and triaged issues on over 100 legacy projects. 

Very quickly I realized I had one option: _make Wordpress not terrible._

## Why Use Wordpress

There are still a number of really good, compelling reasons to use Wordpress as a platform for building websites. It's got a robust built-in commenting system with user accounts. It's really good for things that are shaped like blogs. It's got a huge, well maintained ecosystem of plugins. It's free. And since it's most of the Internet, clients are really, really comfortable with it. 

There are a couple of reasons _not_ to use Wordpress right now. Mostly these center around the impending release of Wordpress 5.0 and the Gutenberg editor, which has a number of concerns around plugin compatibility and accessibility for authors. 

But that's okay, since we've decided to use Wordpress 4.x. And, as we all know, picking a version of Wordpress and than never upgrading it is one of the time honored traditions of Wordpress development. So on to our next step ...

## How Does This Work Even

Let's start at the end. 

We're going to be hosting our production Wordpress site on a [Digital Ocean](https://www.digitalocean.com/) droplet, the [smallest](https://www.digitalocean.com/pricing/) one they have, for $5 per month. Depending on the project lifecycle, we can set up more droplets for a staging server and a dev server. At Fuzzco we used Dev servers to show sites to the internal team, staging servers to show sites to the client, and production servers to show things to the public. 

I don't know about you, but I personally don't super love managing my virtual private servers manually. At the very least,that takes a not insignificant amount of time per droplet, and the more we can automate and remove from the process the better. So: in order to deploy our codebases to Digital Ocean we'll use the phenomenal tool [Nanobox](https://nanobox.io/). Nanobox is an operations layer that handles containerizing applications and deploying them agnostically to a cloud service provider. Nanobox will deploy our code from the command line to any one of our droplets. 

Nanobox will also containerize and run an application in a virtual machine _locally_. This means we'll use it run our development environment, and ensure that all of our environments are identical. No more worrying about PHP versions and extensions and plugins. No more running MAMP or MySQL or Apache or whatever on your local machine before anything works. Nanobox defines the server in a `.yaml` file, and it will always be the same. It also handles all the syncing between our local disk and our virtual environment.

So now that we know how our code is going from local to production, we can think for a second about _how_ it's going to do that, and how we're going to manage our data.

The database on the production server is "canonical". That means that the database the client interacts with the one true database, and we must treat it with care and attention. We'll never change that database ourselves, and we'll move that database _downstream_ from production to staging to dev to local in order to develop against our real data. Importantly, we don't want to migrate the database manually either. It's a little expensive but using [Migrate DB Pro](https://deliciousbrains.com/wp-migrate-db-pro/pricing/) is an incredible, incredible resource for this part. I guess one could also look into [alternatives](https://github.com/wp-sync-db/wp-sync-db) for personal projects. 

The canonical _codebase_ lives in version control, and moves the other direction. From Github to local to dev to staging to production, amen. The only things we need to track in version control are what makes our project unique — all it needs to work as it's own full website. Practically this means we need to track our Wordpress theme and our plugins, that's all. Wordpress core files are not special, and we should not fill our repositories with them.

## Getting Started


