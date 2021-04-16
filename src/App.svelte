<script>
	import { onMount } from "svelte";
	let value = "";
	let tasks = [];
	let darkmode = false;
	let smoothTransition = "transition-all duration-1000";

	onMount(() => initLoad());

	function initLoad() {
		const taskydb = localStorage.getItem("tasky");
		const taskytheme = localStorage.getItem("tasky_theme");
		if (!taskydb) {
			localStorage.setItem("tasky", "");
		} else {
			tasks = [...JSON.parse(taskydb)];
		}

		if (!taskytheme) return localStorage.setItem("tasky_theme", "light");
		darkmode = taskytheme === "dark";
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

	function toggleMode() {
		localStorage.setItem("tasky_theme", darkmode ? "dark" : "light");
	}

	function aufocus(input) {
		input.focus();
	}
</script>

<main
	class="{darkmode
		? 'bg-gray-800'
		: 'bg-gray-200'} fixed w-full h-full {smoothTransition}"
>
	<div class="bg-transparent max-w-xl mx-auto p-4 h-full">
		<nav class="flex justify-between items-center mb-2">
			<div>
				<h1 class="font-bold text-3xl text-green-500">Tasky</h1>
			</div>
			<div
				class="{darkmode
					? 'bg-gray-600'
					: 'bg-gray-100'} relative w-8 h-4 {smoothTransition}"
			>
				<input
					class="hidden"
					id="dark"
					type="checkbox"
					bind:checked={darkmode}
					on:change={toggleMode}
				/>
				<label
					for="dark"
					class="{darkmode
						? 'left-4'
						: 'left-0'} block hover:bg-green-500 cursor-pointer w-5 h-5 bg-gray-400 absolute -top-0.5 transition-all duration-300"
				/>
			</div>
		</nav>

		<div class="content">
			<form
				on:submit|preventDefault={addTask}
				class="flex justify-between items-center mb-4"
			>
				<input
					class="{darkmode
						? 'bg-gray-600'
						: 'bg-white'} text-xl w-full h-10 ring-0 py-1 px-2 outline-none rounded-none border-none shadow-none {smoothTransition}"
					use:aufocus
					type="text"
					bind:value
				/>
				<button
					class="{darkmode
						? 'bg-gray-700'
						: 'bg-gray-100'} hover:bg-green-500 hover:text-gray-100 text-green-500 h-10 border-none py-1 px-2 cursor-pointer {smoothTransition}"
					type="submit">Add</button
				>
			</form>
			<ul>
				{#each tasks as t}
					<li
						class="flex items-center text-gray-600 hover:text-green-500"
					>
						<p class="text-xl">
							{t.value}
						</p>
						<span
							on:click={removeTask(t.id)}
							class="hover:text-red-500 ml-4 text-sm cursor-pointer"
							>remove</span
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</main>
