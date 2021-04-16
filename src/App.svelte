<script>
	import { onMount } from "svelte";
	let value = "";
	let tasks = [];

	onMount(() => syncDB());

	function syncDB() {
		const taskydb = localStorage.getItem("tasky");
		if (!taskydb) return localStorage.setItem("tasky", "");
		tasks = [...JSON.parse(taskydb)];
	}

	function randString() {
		return Math.random().toString(36).substring(9);
	}

	function addTask() {
		if (value.length) {
			const newTask = {
				value: "",
				done: false,
				id: randString(),
			};
			newTask.value = value;
			tasks = [...tasks, newTask];
			localStorage.setItem("tasky", JSON.stringify(tasks));
		}
		value = "";
	}

	function removeTask(id) {
		tasks = tasks.filter((t) => t.id !== id);
		localStorage.setItem("tasky", JSON.stringify(tasks));
	}
</script>

<main>
	<nav>
		<h1>Tasky</h1>
	</nav>

	<div class="content">
		<form on:submit|preventDefault={addTask}>
			<input type="text" bind:value />
			<button type="submit">Add</button>
		</form>
		<ol>
			{#each tasks as t}
				<li>
					<p>
						{t.value}
					</p>
					<span on:click={removeTask(t.id)}>remove</span>
				</li>
			{/each}
		</ol>
	</div>
</main>

<style>
	main {
		max-width: 36rem;
		margin: 0 auto;
	}

	nav {
		padding: 0 1rem;
	}

	.content {
		padding: 1rem;
	}

	form {
		display: flex;
	}

	input {
		flex-grow: 1;
		overflow: auto;
		padding: 0.5rem 1rem;
		box-shadow: none;
		border: 0.1rem solid rgba(0, 0, 0, 0.2);
		outline: none;
	}

	input:focus {
		box-shadow: none;
		border: 0.1rem solid rgba(0, 0, 0, 0.5);
	}

	button {
		padding: 0.5rem 1rem;
		margin: 0;
		background-color: rgba(0, 0, 0, 0.5);
		color: #fff;
		border: none;
	}

	button:hover,
	button:focus-visible {
		background-color: rgba(0, 0, 0, 0.6);
		cursor: pointer;
	}

	ol,
	ul {
		padding: 0;
	}

	li {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		list-style: none;
		padding: 0.5rem 0;
	}

	li:hover {
		background-color: rgba(0, 0, 0, 0.04);
		cursor: pointer;
	}

	li p {
		margin: 0;
	}

	li span {
		font-size: 12px;
		color: rgb(255, 146, 146);
	}

	li span:hover {
		color: rgb(255, 79, 79);
	}
</style>
