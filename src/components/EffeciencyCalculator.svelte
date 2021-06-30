<p>
  Let's spend some time now making a routine task more efficient. If this is a task someone does
  <input type="number" bind:value={task_frequency}>
  time{pluralize(task_frequency)} a
  <select bind:value={task_period}>
    <option value="day">day</option>
    <option value="week">week</option>
    <option value="month">month</option>
    <option value="year">year</option>
  </select>,
  and we reduce the amount of time the task takes by
  <input type="number" bind:value={intervention_amount}>
  <select bind:value={intervention_unit}>
    <option value="second">second{pluralize(intervention_amount)}</option>
    <option value="minute">minute{pluralize(intervention_amount)}</option>
    <option value="hour">hour{pluralize(intervention_amount)}</option>
    <option value="day">day{pluralize(intervention_amount)}</option>
  </select>
  , over
  <input type="number" bind:value={value_period}>
  <select bind:value={value_unit}>
    <option value="day">day{pluralize(value_period)}</option>
    <option value="month">month{pluralize(value_period)}</option>
    <option value="year">year{pluralize(value_period)}</option>
  </select>
  we'll save
  <!-- OUTPUT -->
  <mark>
    {savings}
  </mark>
  <!-- OUTPUT -->
  <select bind:value={savings_unit}>
    <option value="second">second{pluralize(value_period)}</option>
    <option value="minute">minute{pluralize(value_period)}</option>
    <option value="hour">hour{pluralize(value_period)}</option>
    <option value="day">day{pluralize(value_period)}</option>
  </select>.
</p>


<script>
  const pluralize = (unit) => unit === 1 ? '' : 's'
  const seconds_per = new Map([
    ['second', 1],
    ['minute', 60],
    ['hour', 3600],
    ['day', 86400],
    ['week', 604800],
    ['month', 2592000],
    ['year', 31536000],
  ])

  let task_frequency = '1'
  let task_period = 'day'
  let intervention_amount = '1'
  let intervention_unit = 'minute'
  let value_period = '1'
  let value_unit = 'year'
  let savings_unit = 'minute'

  let savings

  $: {
    let intervention_unit_seconds = seconds_per.get(intervention_unit)
    let intervention_amount_seconds = Number.parseInt(intervention_amount) * intervention_unit_seconds
    let task_period_seconds = seconds_per.get(task_period)
    let value_period_seconds = Number.parseInt(value_period) * seconds_per.get(value_unit)
    let savings_unit_seconds = seconds_per.get(savings_unit)

    savings = Math.round(((intervention_amount_seconds * (task_frequency / task_period_seconds)) * value_period_seconds) / savings_unit_seconds)
  }
</script>

<style>
  mark {
    font-size: 2rem;
  }
  input {
    width: 4em;
  }
</style>