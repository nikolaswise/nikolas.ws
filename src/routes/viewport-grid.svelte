<script context="module">
	export const metadata = {"title":"Viewport Grid","slug":"viewport-grid","date":"2015.04.20","site":"http://esripdx.github.io/viewport-grid/","description":"A view port based CSS grid system that defines column widths as a set percentage of the screen rather the width of a container.","template":"_templates/project.html","block":"text","type":"projects, esri"};
	const { title, slug, date, site, description, template, block, type } = metadata;
</script>
<script>
  import Introduction from '../components/Introduction.svelte'
</script>


<Introduction {metadata} />
<h3>What It Is</h3>
<p>A viewport based CSS grid system that defines column widths as a set percentage of the screen rather the width of a container.</p>
<p><img src="./title.png" alt="Viewport Grid"></p>
<h4>What It Does</h4>
<p>Creates a robust grid that simplifies column nesting, responsive widths, while providing options for gutter widths column counts, and other grid behavior. Viewport Grid puts less columns on small screen, and more columns on large screens. A column becomes a standard unit of measurement, creating a constant and abstracted grid system that stands behind the content of a page rather than within it.</p>
<p><img src="./introduction.png" alt="Viewport Grid"></p>
<h4>Why We Did It</h4>
<p>Original designed to address the needs of the  <a
  href="http://esri.github.io/calcite-web/"
  rel="nofollow"
>Calcite Web</a> grid system, Viewport Grid was developed independently in order to expose it’s value to other, non-calcite projects.</p>
<p><img src="./collapsed.png" alt="Viewport Grid"></p>
<h4>Why It’s Interesting:</h4>
<p>Grid theory in graphic design for print applications differs from established methods for using grids in CSS. Viewport Grid works to create a system where the classic grid design techniques can be used on the web, meaning a closer connection between the ‘page’ and the ‘screen.’</p>
<p><img src="./responsive-columns.png" alt="Viewport Grid">
<img src="./responsive.png" alt="Viewport Grid"></p>
<p>Viewport Grid puts less columns on small screen, and more columns on large screens. A column becomes a standard unit of measurement, creating a constant and abstracted grid system that stands behind the content of a page rather than within it. Original designed to address the needs of the  <a
  href="http://esri.github.io/calcite-web/"
  rel="nofollow"
>Calcite Web</a> grid system, Viewport Grid was developed independently to create a system where the classic grid design techniques can be used on the web.</p>
