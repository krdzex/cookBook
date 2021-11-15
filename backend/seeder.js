
import User from "./src/models/user.model"
import Recipe from "./src/models/recipe.model"
const users = [
	{
		userName: 'Test1',
		email: 'test1@gmail.com',
		password: 'Test1',
	},
	{
		userName: 'Test2',
		email: 'test2@gmail.com',
		password: 'Test2',
	},
	{
		userName: 'Test3',
		email: 'test3@gmail.com',
		password: 'Test3',
	},
];
export const seedUsers = () => {

	try {
		User.deleteMany().then(User.insertMany(users).then(res => seedRecipes(res)));
	} catch (error) {
		console.log(err)
	}

}

export const seedRecipes = (users) => {
	const allRecipes = []
	for (let i = 0; i < users.length; i++) {
		let recipe = {
			img: `Test_image${i + 1}.jpg`,
			author: users[i]._id,
			ingredients: ['Test1', "Test2"],
			name: "Test " + i,
			description: "This is test",
			categorie: "Salads",
			instructions: "This is test",
			ratings: [5, 2, 3],
			ratedBy: [users[0]._id, users[1]._id, users[2]._id],
		}
		allRecipes.push(recipe)
	}
	Recipe.deleteMany().then(Recipe.insertMany(allRecipes).then(console.log("Data imported")))
}