import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function MovieDetails() {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchMovie() {
			const { data } = await axios.get(
				`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`,
			);
			setMovie(data);
			setLoading(false);
		}
		fetchMovie();
	}, [id]);

	if (loading)
		return (
			<div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">
				<p className="text-white/40 text-xl">Loading...</p>
			</div>
		);

	return (
		<div className="min-h-screen bg-[#141414] text-white">
			{/* Navbar */}
			<Header />

			{/* Content */}
			<div className="px-12 py-12 max-w-5xl mx-auto">
				<div className="flex flex-col md:flex-row gap-12">
					<img
						src={
							movie.Poster !== "N/A"
								? movie.Poster
								: "https://via.placeholder.com/300x450?text=No+Image"
						}
						alt={movie.Title}
						className="w-64 rounded-xl shadow-2xl mx-auto md:mx-0 flex-shrink-0"
					/>
					<div className="flex flex-col gap-5">
						<h1 className="text-5xl font-bold">{movie.Title}</h1>
						<div className="flex gap-3 text-sm text-white/40 flex-wrap">
							<span>{movie.Year}</span>
							<span>•</span>
							<span>{movie.Rated}</span>
							<span>•</span>
							<span>{movie.Runtime}</span>
							<span>•</span>
							<span>{movie.Genre}</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-yellow-400 text-2xl font-bold">
								⭐ {movie.imdbRating}
							</span>
							<span className="text-white/30 text-sm">/ 10</span>
						</div>
						<p className="text-white/70 leading-relaxed text-lg">
							{movie.Plot}
						</p>
						<div className="flex flex-col gap-2 text-sm border-t border-white/10 pt-4">
							<p>
								<span className="text-white/40">Director</span> ·{" "}
								<span className="text-white">{movie.Director}</span>
							</p>
							<p>
								<span className="text-white/40">Cast</span> ·{" "}
								<span className="text-white">{movie.Actors}</span>
							</p>
							<p>
								<span className="text-white/40">Language</span> ·{" "}
								<span className="text-white">{movie.Language}</span>
							</p>
							<p>
								<span className="text-white/40">Box Office</span> ·{" "}
								<span className="text-white">{movie.BoxOffice || "N/A"}</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MovieDetails;
