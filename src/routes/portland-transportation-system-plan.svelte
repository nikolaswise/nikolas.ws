<script context="module">
	export const metadata = {"title":"Portland Transporation System Plan","slug":"portland-transportation-system-plan","site":"http://pbot-tsp.surge.sh","date":"2017.05.20","description":"Design & Development of public policy & GIS data presenting the City of Portlands plans for 20 years of public works development. The project has a back end that generates searchable, performant web content from canonical .docx files, as well as presenting an application for exploring GIS data.","type":"projects, department"};
	const { title, slug, site, date, description, type } = metadata;
</script>
<script>
  import Introduction from '../components/Introduction.svelte'
</script>


<Introduction {metadata} />
<p><img
  src="https://photos.smugmug.com/Projects/Transporation-service-plan/i-FDz7Dm7/0/06d8752b/X5/home-X5.png"
  alt="home"
></p>
<p>• Introduce project, public money and accountability, what for and why.
• Key requirements around Section 508 and WCAAG AA, the Library computer.
• Map / Text View etc.</p>
<p><img
  src="https://photos.smugmug.com/Projects/Transporation-service-plan/i-wtLbM6q/0/e06f6dea/X4/txt-X4.png"
  alt="txt"
></p>
<p>• Text only view, parsed to HTML from legal DocX files.</p>
<p><img
  src="https://photos.smugmug.com/Projects/Transporation-service-plan/i-JB6728d/0/44ff0340/XL/index-XL.gif"
  alt="index"
></p>
<p>Table of contents generated from the heading tags, accessible through the index. Scroll to animations keep the user from getting lost.</p>
<p><img
  src="https://photos.smugmug.com/Projects/Transporation-service-plan/i-6xkt8ZR/0/866a11d6/XL/search-XL.gif"
  alt="search"
></p>
<p>The complete text is searchable, allowing for quick location of  information by location or type.</p>
<p><img
  src="https://photos.smugmug.com/Projects/Transporation-service-plan/i-WDDb2MV/0/f418990b/X5/layers-X5.png"
  alt="layers"
></p>
<p>Canonical data lives in the cities existing GIS, hosted and exposed via ArcGIS online and consumed by Leaflet.</p>
<p><img
  src="https://photos.smugmug.com/Projects/Transporation-service-plan/i-X4MQVL2/0/5ff57824/X5/draw-X5.png"
  alt="draw"
></p>
<p>Web-specific cartography and rendering support in leaflet …</p>
<p><img
  src="https://photos.smugmug.com/Projects/Transporation-service-plan/i-z3tjSrh/0/5aa8532d/X5/popup-X5.png"
  alt="popup"
></p>
<p>Exploration of features exposed via popup.</p>
<p><img
  src="https://photos.smugmug.com/Projects/Transporation-service-plan/i-2ZnZVsk/0/a06a6e02/XL/linking-XL.gif"
  alt="linking"
></p>
<p>Connection between data in popups, connecting to relevant section in the text.</p>
