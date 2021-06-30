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
<p>This is a re-imagining of <a
  href="https://xkcd.com/1205"
  rel="nofollow"
>Randall Monroe’s <em>Is It Worth The Time</em> chart</a> through the lens of <a
  href="http://worrydream.com/#!/ClimateChange"
  rel="nofollow"
>Bret Victor’s idea of computational rhetoric</a> imspired by implementations from <a
  href="https://doriantaylor.com/toys"
  rel="nofollow"
>Dorian Taylor</a>.</p>
