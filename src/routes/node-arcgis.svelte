<script context="module">
	export const metadata = {"title":"Node ArcGIS","slug":"node-arcgis","site":"http://esri.github.io/node-arcgis/","date":"2016.03.10","description":"An API that explored bringing the ArcGIS REST API to Node and NPM.","type":"projects, esri"};
	const { title, slug, site, date, description, type } = metadata;
</script>
<script>
  import Introduction from '../components/Introduction.svelte'
</script>


<Introduction {metadata} />
<h4>Goals</h4>
<p>With this project, I was attempting to create a centralized code base for common platform interactions — reducing duplicated code and allowing a greater sharing of resources across different development teams at Esri.</p>
<p>Esri product developers around the globe were recreating the same solutions to common problems in the context of their applications. Node ArcGIS reduces duplicated code and allows a greater sharing of time and resources across teams, and opens solutions to the open-source community. Node ArcGIS is an API that adheres to contemporary specs, acting a buffer between NodeJS workflows and the older, highly stable, <a
  href="https://developers.arcgis.com/rest"
  rel="nofollow"
>ArcGIS REST API</a>. Node ArcGIS brings the power of the ArcGIS platform to the largest and fastest growing language and package manager - <a
  href="https://nodejs.org/en/"
  rel="nofollow"
>Node JS</a> and <a href="https://www.npmjs.com/package/arcgis" rel="nofollow">NPM</a>.</p>
<p><img
  src="https://photos.smugmug.com/Projects/Node-arcgis/i-kJnNcvC/0/1e471604/X3/docs-X3.png"
  alt="Node Arcgis Documentation"
></p>
<p>The project allows for developers on widely different projects and teams work together to solve common problems, and opens those solutions to the broader open-source community. Node ArcGIS is also a fast-moving, agile API front that adheres to contemporary API specs, acting a buffer between what Node developers expect from an API and the older, stable, but slow-moving ArcGIS REST API.</p>
<p>Read the <a
  href="/texts/building-a-client-library/"
>in-depth introduction to the project with code samples</a> for a a full run-down of what designing a project like this is all about.</p>
<h2>Update from 2018</h2>
<p>Two of my favorite developers, <a
  href="https://twitter.com/geogangster"
  rel="nofollow"
>John Gravois</a> and <a href="https://twitter.com/patrickarlt" rel="nofollow">Patrick Arlt</a>, took this idea all the way home with their excellent <a
  href="https://github.com/Esri/arcgis-rest-js"
  rel="nofollow"
>ArcGIS REST JS</a> project!</p>
