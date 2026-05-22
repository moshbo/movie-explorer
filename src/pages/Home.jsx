import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const POPULAR_IDS = [
	"tt0111161",
	"tt0068646",
	"tt0468569",
	"tt0110912",
	"tt0109830",
	"tt1375666",
	"tt0133093",
	"tt0099685",
	"tt0816692",
	"tt6751668",
	"tt4154796",
	"tt7286456",
	"tt15398776",
	"tt1517268",
	"tt6710474",
	"tt1745960",
	"tt0102926",
	"tt0167260",
	"tt0108052",
	"tt10366206",
];

function Home() {
	const [query, setQuery] = useState("");
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isSearching, setIsSearching] = useState(false);

	useEffect(() => {
		async function fetchPopular() {
			try {
				const requests = POPULAR_IDS.map((id) =>
					axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`),
				);
				const results = await Promise.allSettled(requests);
				const movies = results
					.filter((r) => r.status === "fulfilled")
					.map((r) => r.value.data);
				setMovies(movies);
			} catch {
				setError("Something went wrong.");
			} finally {
				setLoading(false);
			}
		}
		fetchPopular();
	}, []);

	async function handleSearch(e) {
		e.preventDefault();
		if (!query) return;
		setLoading(true);
		setError(null);
		setIsSearching(true);
		try {
			const { data } = await axios.get(
				`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`,
			);
			if (data.Response === "True") {
				setMovies(data.Search);
			} else {
				setError("No movies found. Try another search.");
				setMovies([]);
			}
		} catch {
			setError("Something went wrong.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen bg-[#141414] text-white">
			{/* Navbar */}
			<Header
				isHome
				query={query}
				setQuery={setQuery}
				onSearch={handleSearch}
			/>

			{/* Content */}
			<div className="px-12 py-10">
				{loading && (
					<p className="text-center text-white/40 mt-32">Loading...</p>
				)}
				{error && <p className="text-center text-red-400">{error}</p>}

				{!loading && movies.length > 0 && (
					<>
						<h2 className="text-xl font-semibold mb-6 text-white/70">
							{isSearching ? (
								<>
									Results for <span className="text-white">"{query}"</span>
								</>
							) : (
								"Popular Movies"
							)}
						</h2>
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
							{movies.map((movie) => (
								<Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
									<div className="group rounded-lg overflow-hidden cursor-pointer">
										<div className="overflow-hidden rounded-lg">
											<img
												src={
													movie.Poster !== "N/A"
														? movie.Poster
														: "https://via.placeholder.com/300x450?text=No+Image"
												}
												alt={movie.Title}
												className="w-full object-cover group-hover:scale-105 transition duration-300"
											/>
										</div>
										<div className="pt-2">
											<p className="font-semibold text-sm truncate">
												{movie.Title}
											</p>
											<p className="text-white/40 text-xs">{movie.Year}</p>
										</div>
									</div>
								</Link>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Home;
