import { Link } from "react-router-dom";

function Header({ isHome, query, setQuery, onSearch }) {
	return (
		<nav className="px-12 py-6 flex items-center justify-between border-b border-white/10">
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
						className="px-4 py-2 rounded-lg bg-white/10 outline-none placeholder-white/30 w-72"
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
