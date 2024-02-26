import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context/context";
import ImageNotAvailable from "../../assets/Image_not_available.png";

export const Details = () => {
	const { id } = useParams();
	const {
		recipeDetailData,
		setRecipeDetailData,
		handleAddToFavorite,
		favoriteList,
	} = useContext(GlobalContext);

	useEffect(() => {
		async function getRecipeDetail() {
			const res = await fetch(
				`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
			);
			const data = await res.json();

			if (data?.data) {
				setRecipeDetailData(data?.data?.recipe);
			}
		}
		getRecipeDetail();
	}, []);

	return (
		<div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 ">
			<div className="row-start-2 lg:row-start-auto">
				<div className="h-96 overflow-hidden rounded-xl group">
					<img
						src={
							recipeDetailData?.image_url.includes("http")
								? recipeDetailData?.image_url
								: ImageNotAvailable
						}
						alt="recipe item"
						className="h-full w-full object-cover block group-hover:scale-105 duration-300"
					/>
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<span className="text-sm text-cyan-700 font-medium">
					{recipeDetailData?.publisher}
				</span>
				<h3 className="font-bold text-2xl truncate text-black">
					{recipeDetailData?.title}
				</h3>
				<div>
					<button
						className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
						onClick={() => handleAddToFavorite(recipeDetailData)}
					>
						{favoriteList &&
						favoriteList.length > 0 &&
						favoriteList.findIndex(
							(item) => item.id === recipeDetailData.id
						) !== -1
							? "Add to favorites"
							: "Remove from favorites"}
					</button>
				</div>
				<div>
					<span className="text-2xl font-semibold text-black">
						Ingredients:
					</span>
					<ul className="flex flex-col gap-3">
						{recipeDetailData?.ingredients.map((ingredient, ingredientIdx) => {
							return (
								<li key={ingredientIdx}>
									<span className="text-2xl font-semibold text-black">
										{ingredient.quantity ?? "Empty Quantity"}
										{ingredient.unit ?? "Empty Unit"}
									</span>
									<span className="text-2xl font-semibold text-black">
										{ingredient.description}
									</span>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};
