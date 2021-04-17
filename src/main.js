import App from './App.svelte';

// Early call theme settings
const taskytheme = localStorage.getItem("tasky_theme");
!taskytheme && localStorage.setItem("tasky_theme", "light");

const app = new App({
	target: document.body,
	props: {
		darkmode: taskytheme === "dark"
	}
});

export default app;