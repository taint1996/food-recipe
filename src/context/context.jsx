import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);
export const GlobalState = ({ children }) => {
	const [searchParams, setSearchParams] = useState("");
	const [loading, setLoading] = useState(false);
	const [recipeList, setRecipeList] = useState([]);
	const [recipeDetailData, setRecipeDetailData] = useState(null);
	const [favoriteList, setFavoriteList] = useState([]);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			const res = await fetch(
				`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParams}`
			);
			const data = await res.json();

			if (data?.data?.recipes) {
				setRecipeList(data?.data?.recipes);
				setLoading(false);
				setSearchParams("");
				navigate("/");
			}
		} catch (e) {
			console.log(`Error at handle submit ${e}`);
			setLoading(false);
			setSearchParams("");
		}
	};

	const handleAddToFavorite = (currentItem) => {
		let favorites = [...favoriteList];
		const index = favorites.findIndex((item) => item.id === currentItem.id);

		if (index === -1) {
			favorites.push(currentItem);
		} else {
			favorites.splice(currentItem);
		}
		setFavoriteList(favorites);
	};

	return (
		<GlobalContext.Provider
			value={{
				searchParams,
				loading,
				recipeList,
				setSearchParams,
				handleSubmit,
				recipeDetailData,
				setRecipeDetailData,
				favoriteList,
				handleAddToFavorite,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
