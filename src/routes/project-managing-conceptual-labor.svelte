<script context="module">
	export const metadata = {"title":"Project Managing Conceptual Labor","slug":"project-managing-conceptual-labor","date":"2021.07.02","description":"Managing the lifecycle of development projects - as well as other open-ended creative endeavors — tends to be an act of wishful thinking more than \"planning\". How can we do better at this?","type":"text"};
	const { title, slug, date, description, type } = metadata;
</script>
<script>
  import Introduction from '../components/Introduction.svelte'
  import BillableHours from '../components/BillableHours.svelte'
</script>


<Introduction {metadata} />
<p>A functional unit of project management is the “blob” (or “cell” in Taylor’s formulation). A Blob is a 4-ish hour chunk of uninterrupted time in which about 3 hours of billable work gets done. In my estimation, a career could be built on scheduling or selling 250 blobs per year at 5 to 6 blobs per week, each blob billed at a target gross rate.</p>
<!-- To gross $X per year, bill Y blobs per year at a rate of Z $/blob. A Big project is 80% of your year, and is N blobs, for a total of $Foo. A small project is 20$ of your year, and is P blobs for $Bar. -->
<p>Blobs must end at a <em>stable state</em> which is documented and accounted for, ideally with some sort of useful artifact. Blobs are expensive!</p>
<p>Conceptual Labor is fundamentally un-estimatable, and the really valuable work that we do tends to be conceptual labor. This means billing as-you-go and working to create a spare where the remaining work is no longer conceptual labor and can be estimated.</p>
<p>Writing comprehensive “behavior sheets” or specs is a good way to front-load the conceptual labor in a project, and as a plus they can be turned into test suites pretty easily. Writing these is – of course – conceptual labor and cannot be estimated.</p>
<p>As an aside, Taylor has found that a really robust spec takes about 1/3 of the total time of a project, which could be a neat estimating tactic.</p>
<p>Taylorism (different Taylor) is not a bad impulse when applied to our work, and separated from the dehumanizing goals of capital. Measuring, systematizing, and creating a library of of-the-shelf solutions helps provide a service.</p>
<p>Plan more than just your work in blobs! Assume 3 blobs per day, and fill with whatever; side projects, art, family, and personal time.</p>
<p>When pitching projects that include conceptual labor, <em>do not</em> pitch result X by date Y for price Z: Someone is going to get fucked on that deal. Figure out a different deal.</p>
<p>One of those something else is systematized, off the shelf solutions. I worked towards this deal at Fuzzco, working on e-commerce sites for small businesses. This removes as much conceptual labor from the project as possible by re-using the results from other, previously completed works of conceptual labor. This means you can solve the <em>same</em> hard problem many times, but still falls down on solving a radically <em>new</em> problem.</p>
<p>Another something else is to <em>make a very different kind of deal</em>. If working in-house, this means letting go of predictability and focusing on exploratory blobs with stable states. Follow them where they go. Don’t worry about what or when, just make sure that there is conceptual integrity, clear proprieties, and let ‘em rip.</p>
<p>If working client-side, this means working pay-go with docs for a desired solution, and letting go of implementation. </p>
<p>Case Study: A Small, Boutique Agency</p>
<!-- Estimator time! -->
<BillableHours />
<p>The important thing about this number of billable blobs per person is that it <em>wont burn out your team</em>. It accounts for generous PTO and sick leave, and will create <em>more</em> space for <em>better</em> work.
</p>
