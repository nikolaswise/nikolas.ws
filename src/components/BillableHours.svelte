<p>
  Your team is <input type="number" bind:value={people}> people, averaging a salary of <input type="number" bind:value={avg_salary}> per person. Add <input type="number" bind:value={overhead_pct}>% for overhead and profit. You are able to schedule/sell <input type="number" bind:value={blobs_per_people}> blobs of time per year per team member, each working <input type="number" bind:value={blobs_per_week}>. That means that you're gross target per year is <mark>{gross_income}</mark>. So, <mark>{people}</mark> people working <mark>{total_blobs}</mark> blobs, targeting a gross income of <mark>{gross_income}</mark>, means billing at <mark>{price_per_blob}</mark> $/blob. A "Big" project at your agency is about <input type="number" bind:value={big_project_hours}> hours — <mark>{big_project_blobs}</mark> blobs — and takes in {big_project_gross}. With <input type="number" bind:value={project_people}> people on a project, this puts the calendar time at about <mark>{project_weeks}*</mark> weeks. This is a <select><option value="good">good</option><option value="bad">bad</option></select> price!
</p>

<p>
  * Caveats apply! This relationship is only so linear.
</p>

<script>
let people = 3
let blobs_per_people = 250
let avg_salary = 86000
let overhead_pct = 50
let project_people = 2
let big_project_hours = 200
let blobs_per_week = 6

let total_salaries
let gross_income
let total_blobs
let price_per_blob
let big_project_blobs
let big_project_gross
let project_weeks

$: {
  total_salaries = avg_salary * people
  gross_income = (total_salaries * (overhead_pct / 100) + total_salaries)
  total_blobs = people * blobs_per_people
  price_per_blob = gross_income / total_blobs
  big_project_blobs = big_project_hours / 4
  big_project_gross = big_project_blobs * price_per_blob
  project_weeks = big_project_blobs / (blobs_per_week * project_people)
}
</script>


<style>
  input {
    width: 5em;
  }
</style>