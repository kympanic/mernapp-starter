const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const UserModel = require("../mongodb/models/User");

mongoose.connect(
	"mongodb+srv://hanuelai:hWsjZ6BasbOLPsyo@cluster0.xen9f4y.mongodb.net/?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

const generateFakeUser = () => {
	return {
		name: faker.person.fullName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
	};
};

const seedDatabase = async (numUsers) => {
	try {
		await UserModel.deleteMany({}); // Clear existing data

		const users = [];
		for (let i = 0; i < numUsers; i++) {
			const fakeUser = generateFakeUser();
			users.push(fakeUser);
		}

		await UserModel.insertMany(users);
		console.log(`${numUsers} fake users inserted into the database.`);
	} catch (error) {
		console.error("Error seeding the database:", error);
	} finally {
		mongoose.disconnect();
	}
};

const numUsers = 10;
seedDatabase(numUsers);
