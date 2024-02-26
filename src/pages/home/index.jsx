import React, { useContext } from "react";
import { GlobalContext } from "../../context/context";
import { RecipeItem } from "../../components/recipe-item";

export const Home = () => {
	const { loading, recipeList } = useContext(GlobalContext);

	if (loading) return <div>Loading...</div>;

	return (
		<div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
			{recipeList && recipeList.length > 0 ? (
				recipeList.map((item) => <RecipeItem item={item} key={item.id} />)
			) : (
				<div>
					<p className="lg:text-4xl text-xl text-center text-black font-extrabold">
						Nothing to show. Please search another food.
					</p>
				</div>
			)}
		</div>
	);
};
