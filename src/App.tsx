import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home";

const queryClient = new QueryClient();

const App = () => {
  return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</Router>
		</QueryClientProvider>
  )
}

export default App
