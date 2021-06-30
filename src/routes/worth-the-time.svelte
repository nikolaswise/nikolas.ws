<script context="module">
	export const metadata = {"title":"Is it Worth the Time?","slug":"worth-the-time","date":"2021.06.24","description":"An interactive component for computing time savings and efficiencies.","type":"text, computational rhetoric"};
	const { title, slug, date, description, type } = metadata;
</script>
<script>
  import Introduction from '../components/Introduction.svelte'
  import EffeciencyCalculator from '../components/EffeciencyCalculator.svelte'
</script>


<Introduction {metadata} />
<EffeciencyCalculator/>
