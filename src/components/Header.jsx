import { Link } from "react-router-dom";

function Header({ isHome, query, setQuery, onSearch }) {
	return (
		<nav className="px-6 py-4 flex flex-col items-center gap-4 border-b border-white/10 md:flex-row md:justify-between">
			<Link to="/" className="text-red-600 text-3xl font-black tracking-widest">
				MOVIEX
			</Link>

			{isHome ? (
				<form onSubmit={onSearch} className="flex gap-2">
					<input
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search movies..."
						className="flex-1 w-full px-4 py-2 rounded-lg bg-white/10 outline-none placeholder-white/30"
					/>
					<button
						type="submit"
						className="bg-red-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-700 transition"
					>
						Search
					</button>
				</form>
			) : (
				<Link
					to="/"
					className="text-white/50 hover:text-white transition text-sm"
				>
					← Back to Movies
				</Link>
			)}
		</nav>
	);
}

export default Header;
