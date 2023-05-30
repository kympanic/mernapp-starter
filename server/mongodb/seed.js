const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const UserModel = require("../mongodb/models/User");
const bcrypt = require("bcryptjs");

mongoose.connect("mongourlhere", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const hashedPassword = bcrypt.hashSync(faker.internet.password("password"));

const generateFakeUser = () => {
	return {
		name: faker.person.fullName(),
		email: faker.internet.email(),
		password: hashedPassword,
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
