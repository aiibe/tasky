<script>
	import { onMount } from "svelte";
	let value = "";
	let tasks = [];
	let darkmode = false;

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
</script>

<main style="background-color: {darkmode ? 'rgb(36, 36, 36)' : '#fff'}">
	<div>
		<nav>
			<div>
				<h1
					style="color: {darkmode
						? 'rgb(147, 147, 147)'
						: 'rgb(77, 77, 77)'}"
				>
					Tasky
				</h1>
			</div>
			<div class="darkbox">
				<input
					id="dark"
					type="checkbox"
					bind:checked={darkmode}
					on:change={toggleMode}
				/>
				<label for="dark" />
			</div>
		</nav>

		<div class="content">
			<form on:submit|preventDefault={addTask}>
				<input
					type="text"
					bind:value
					style={darkmode
						? "background-color:rgb(30, 30, 30); color: rgb(147, 147, 147)"
						: "background-color:initial; color: rgb(77, 77, 77)"}
				/>
				<button type="submit">Add</button>
			</form>
			<ul>
				{#each tasks as t}
					<li>
						<p
							style={darkmode
								? "color: rgb(147, 147, 147)"
								: "color: rgb(77, 77, 77)"}
						>
							{t.value}
						</p>
						<span on:click={removeTask(t.id)}>remove</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</main>

<style lang="scss">
	main {
		height: 100%;
		> div {
			max-width: 36rem;
			margin: 0 auto;
			height: 100%;
		}
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;

		h1 {
			margin: 0;
		}
	}

	.content {
		padding: 1rem;

		form {
			display: flex;
			input[type="text"] {
				flex-grow: 1;
				overflow: auto;
				padding: 0.5rem 1rem;
				box-shadow: none;
				border: 0.1rem solid rgba(0, 0, 0, 0.2);
				outline: none;

				&:focus {
					box-shadow: none;
					border: 0.1rem solid rgba(0, 0, 0, 0.5);
				}
			}
		}

		ul {
			padding: 0;
			li {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				list-style: none;
				padding: 0.5rem 0;

				&:hover {
					background-color: rgba(0, 0, 0, 0.04);
					cursor: pointer;
				}

				p {
					margin: 0;
				}

				span {
					font-size: 12px;
					color: rgb(255, 146, 146);

					&:hover {
						color: rgb(255, 79, 79);
					}
				}
			}
		}
	}

	.darkbox {
		width: 2rem;
		height: 1rem;
		background: rgba(0, 0, 0, 0.2);
		position: relative;
		border-radius: 2.5rem;

		label {
			width: 1.2rem;
			height: 1.2rem;
			display: block;
			border: 1px solid rgba(0, 0, 0, 0.1);
			border-radius: 50%;
			transition: all 0.5s ease;
			cursor: pointer;
			position: absolute;
			top: -2px;
			left: 0px;
			background: rgb(147, 147, 147);
		}

		input[type="checkbox"] {
			visibility: hidden;

			&:checked + label {
				left: 15px;
				background-color: rgb(48, 48, 48);
			}
		}
	}

	button {
		padding: 0.5rem 1rem;
		margin: 0;
		background-color: rgba(0, 0, 0, 0.5);
		color: #fff;
		border: none;

		&:hover,
		&:focus-visible {
			background-color: rgba(0, 0, 0, 0.6);
			cursor: pointer;
		}
	}
</style>
