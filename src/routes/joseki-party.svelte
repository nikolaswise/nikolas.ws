<script context="module">
	export const metadata = {"title":"Joseki Party","slug":"joseki-party","date":"2016.08.31","site":"http://joseki.party/","description":"The simplest game of _Baduk_, _Weiqi_, or _Go_ this side of the internet. Start a game of Go, and play with a friend simply by sending them a link. Invite people to witness your victory – or humiliating defeat depending on how good your friend is.","template":"_templates/project.html","block":"text","type":"projects, department"};
	const { title, slug, date, site, description, template, block, type } = metadata;
</script>
<script>
  import Introduction from '../components/Introduction.svelte'
</script>


<Introduction {metadata} />
<h3>Concept</h3>
<p>I’ve been playing Go (poorly) for the past 10 years or so ( on and off), so when <a
  href="http://paulcpederson.com/"
  rel="nofollow"
>Paul</a> asked me if I knew how to play after the recent <a href>triumph of AlphaGo</a> over Lee Sedol, 9 Dan, I was pretty excited to have an opponent. Paul learned the game quick and soon was playing at my level (and slightly above!). We played over lunch, and one day when we were both working from home rather than the office, we decided to see what was out there for playing online.</p>
<p>While there are some amazing servers out there for playing Go like <a
  href="https://online-go.com/"
  rel="nofollow"
>Online Go</a>, <a href="https://www.gokgs.com/" rel="nofollow">KGS</a>, and <a href="http://www.tygembaduk.com/" rel="nofollow">Tygem Baduk</a>, they all required a significant amount of set up, investment, and it was tricky for us to just pick up a game with each other right away. What we needed was a Go server where one player could send a URL to the other and start playing.</p>
<p>So we built that!</p>
<p><img
  src="https://photos.smugmug.com/Projects/Joseki-party/i-StZmkMS/0/4fb63fac/X3/title-X3.png"
  alt="Title Screen for Joseki Party"
></p>
<h3>The Big Idea</h3>
<p>We had a couple of hard requirements for the project, which shaped a lot of our design decisions.</p>
<p><strong>No Auth:</strong> We wanted to avoid any sort of user account management — no creating accounts, no signing in, no OAuth with Twitter or Facebook so you can share post your game points. This was going to be about zero-friction Go. Any set up where a user has to do anything beyond start playing when they got a link was off the table.</p>
<p><strong>No Server:</strong> Paul and I are front-end types — we both know plenty of NodeJS but dislike writing servers. This was going to be pure client-side.</p>
<p><strong>No Framework:</strong> There’s been a <em>lot</em> of discourse about the state of JavaScript frameworks in 2016. And after using any number of different frameworks for any number of projects (and one notable example of 4 frameworks in <em>one</em> project) I thought we could experiment with <a
  href="http://vanilla-js.com/"
  rel="nofollow"
>Vanills JS</a> and see where that landed us.</p>
<p><strong>Live:</strong> It’s a game, so we decided it should feel as close as possible to sitting down and playing a game. We wanted to avoid browser refreshes, notifications, and things of that nature. When you play, your opponent sees the move. When your opponent plays, you see the move.</p>
<p><strong>MVI Loops:</strong> A major part of the project was getting deep into the practicalities of writing <a
  href="http://staltz.com/unidirectional-user-interface-architectures.html"
  rel="nofollow"
>unidirectional applications</a> with a Model → View → Intent system.</p>
<p><strong>A New Visual Language:</strong> One of my major design interests is in the translation between the analog and the digital. I wanted to take the same approach to the aesthetics of Go — attempt the keep the striking nature of the game itself but ditch any attempt at skeuomorphism that pervades practically <em>all</em> of the computer Go programs I’ve ever played on.</p>
<p><img
  src="https://photos.smugmug.com/Projects/Joseki-party/i-dwf5h8p/0/ca9e4700/X3/new-game-X3.png"
  alt="Starting a New Game"
></p>
<h3>Solutions</h3>
<p><strong><a href="https://firebase.google.com/" rel="nofollow">Firebase</a></strong> solved a lot of our problems with the practicalities of a shared, live game state without using a server. We decided on generating random names for games, and saving the model of the game state under those keys in a single Firebase project. The NPM project <strong><a href="https://www.npmjs.com/package/weiqi" rel="nofollow">Weiqi by cjlarose</a></strong> provided the essential client-side tools for manipulating the game, with a small addition in a <strong><a
  href="https://github.com/nikolaswise/weiqi.js"
  rel="nofollow"
>fork of the project</a></strong> to add a method for removing dead stones from the board before scoring. <strong><a href="https://surge.sh/" rel="nofollow">Surge</a></strong> provides the hosting, and their excellent <strong><a
  href="https://surge.sh/help/adding-a-200-page-for-client-side-routing"
  rel="nofollow"
>client side routing</a></strong> allowed us to make the whole thing a single page app.</p>
<p><img
  src="https://photos.smugmug.com/Projects/Joseki-party/i-N2Lk3cW/0/f7eece08/X3/opening-X3.png"
  alt="Opening State"
></p>
<p>The client side routing lets us provide a single link to Black, White, or a neutral observer who just wants to watch the game unfold.</p>
<p><img
  src="https://photos.smugmug.com/Projects/Joseki-party/i-DzVDfMH/0/b867008a/X3/gameplay-X3.png"
  alt="Playing the Game"
></p>
<h3>The Fun Parts</h3>
<p>Exploring different aesthetics that our game board could take was a real interesting undertaking — one that is still ongoing. With the perpetually fluid nature of the web, we can create any number of wildly unorthodox color schemes.</p>
<p><img
  src="https://photos.smugmug.com/Projects/Joseki-party/i-C8sbxnC/0/XL/changing-scheme-XL.jpg"
  alt="Changing the Color Scheme"
></p>
<p>So send me a link if you want to play! I’ve been playing nothing but 13x13 lately, so start a bigger game and I’ll probably be toast.</p>
