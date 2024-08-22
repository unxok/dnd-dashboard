import "./App.css";
import { ModeToggle } from "./components/ui/mode-toggle";
import { ThemeProvider } from "./components/ui/theme-provider";

function App() {
	return (
		<ThemeProvider defaultTheme='system'>
			<div className='bg-red-300'>hi there</div>
			<ModeToggle />
		</ThemeProvider>
	);
}

export default App;
