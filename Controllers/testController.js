const Test = require("../Models/test");
const User = require("../Models/user");
const Answer = require("../Models/answeredQuestions");

const createTest = async (req, res) => {
	try { //default epoch time
		const { startTime, endTime, type, questions, totalPoints } = req.body
		if (!startTime || !endTime || !type || !questions || !totalPoints) {
			return res.status(300).json({ message: "One or More fields are empty" });
		}

		if (startTime < Date.now() || startTime > endTime || endTime < startTime) {
			return res.status(200).json({ message: "Test Start or EndTime is not correctly set" });
		}

		const newTest = new Test({
			startTime,
			endTime,
			type,
			questions,
			totalPoints
		});

		newTest.save()
			.then(() => {
				return res.status(200).json({ message: "Test Created Successfully" })
			})
			.catch((err) => {
				console.log(err)
				return res.status(500).json({ error: err })
			})

	} catch (err) {
		console.log(err)
		return res.status(500).json({ error: err })
	}
}

const updateTestTime = async (req, res) => {
	try {
		const { startTime, endTime } = req.body;

		if (!startTime || !endTime) {
			return res.status(300).json({ message: "One or More fields are empty" });
		}

		if (startTime < Date.now() || endTime <= startTime || endTime <= Date.now() || startTime >= endTime) {
			return res.status(300).json({ message: "Enter valid time" });
		}

		await Test
			.findOneAndUpdate({ _id: req.params.t_id },
				{ "startTime": startTime, "endTime": endTime })
			.then(() => { return res.status(200).json({ message: "Test Time Updated" }) })
			.catch((err) => { return res.status(500).json({ error: err }) })

	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: err })
	}
}
const updateQuestions = async (req, res) => {
	try {
		const { questions } = req.body
		if (!questions) {
			return res.status(300).json({ message: "One or More fields are empty" });
		}

		await Test
			.findOneAndUpdate({ _id: req.params.t_id },
				{ $push: { questions: questions } })
			.then(() => { return res.status(200).json({ message: "Questions Updated" }) })
			.catch((err) => { return res.status(500).json({ error: err }) })

	} catch (err) {
		return res.status(500).json({ error: err })
	}
}

const deleteTest = async (req, res) => {
	try {
		const test = await Test.findOne({ _id: req.params.t_id })
			.catch((err) => { return res.status(500).json({ error: err }) });

		if (test.status != "Pending") {
			return res.status(500).json({ error: "This test has already started/finished" })
		}

		await Test.findOneAndDelete({ _id: test._id })
			.then(() => {
				return res.status(200).json({ message: "Test Deleted Successfully" })
			})
			.catch((err) => { return res.status(500).json({ error: err }) })

	} catch (err) {
		return res.status(500).json({ error: err })
	}
}
const getAllTest = async (req, res) => {
	try {
		const tests = await Test.find();

		if (!tests || tests == [] || tests == undefined) {
			return res.status(400).json({ message: "Tests Does not exist" })
		}

		res.status(200).json({ message: tests });

	} catch (err) {

		return res.status(500).json({ error: err })
	}
}
const getSingleTest = async (req, res) => {
	try {
		const test = await Test.findOne({ _id: req.params.t_id });

		if (!test || test == {}) {
			return res.status(400).json({ message: "Test does not exist with this id" })
		}

		res.status(200).json({ message: test });
	} catch (err) {
		return res.status(500).json({ error: err })
	}
}
const getTestsByType = async (req, res) => {
	try {
		const { type } = req.body;

		if (!type) {
			return res.status(400).json({ message: "Field is empty" });

		}
		const test = await Test.find({ type: type });

		if (!test || test === [] || test === undefined) {
			return res.status(400).json({ message: "Test does not exist with this type" })
		}

		res.status(200).json({ message: test });
	} catch (err) {

		return res.status(500).json({ error: err })
	}
}
const getTestByStartTime = async (req, res) => {
	try {
		const { startTime } = req.body;
		if (!startTime) { return res.status(300).json({ message: "Field is empty" }) }

		const timeTests = [];
		const test = await Test.find({})
			.catch((err) => { return res.status(500).json({ error: err }) })

		if (!test || test == [] || test == undefined) {
			return res.status(400).json({ message: "Tests do not exist" })
		}

		test.map((t) => {
			if (startTime == Number(t.startTime)) {
				timeTests.push(t);
			}
		});

		if (!timeTests || timeTests == [] || timeTests == undefined) {
			return res.status(400).json({ message: "Test does not exist with the given time" })
		}

		res.status(200).json({ message: timeTests });
	} catch (err) {
		return res.status(500).json({ error: err })
	}
}
const participateInTest = async (req, res) => {
	try {
		const { t_id } = req.body;
		const test = await Test
			.findOne({ _id: t_id })
			.catch((err) => {
				return res.status(500).json({ error: err });
			});

		if (test == {} || test == undefined) {
			return res.status(400).json({ message: "Test not found with this ID" });
		}

		if (test.status != "Pending") {
			return res.status(500).json({ message: "Test has already been concluded or started" });
		}

		const user = await User
			.findOne({ _id: req.params.u_id })
			.catch((err) => {
				return res.status(500).json({ error: err });
			})

		if (user == undefined || user == {}) {
			return res.status(400).json({ error: "User Does not exist with this id" });
		}

		let check1 = false; //checks if already part-taken
		user.participated.map((pt) => {
			if (pt == t_id) {
				check1 = true;
			}
		})

		if (check1) {
			return res.status(500).json({ error: "Already Participated in this test" });
		}

		user?.participated.push(test._id);

		user
			.save()
			.then(() => {
				return res.status(200).json({ message: "Participant Added Successfully" });
			}).catch((err) => {
				return res.status(500).json({ error: err });
			});

	} catch (err) {
		console.log(err)
		return res.status(500).json({ error: err });
	}
}

const submitTest = async (req, res) => {
	try {
		const { questions } = req.body;
		const test = await Test.findOne({ _id: req.params.t_id })
			.catch((err) => {
				console.log(err);
				return res.status(500).json({ error: err })
			});

		if (test == {} || test == undefined) {
			return res.status(400).json({ message: "Couldn't find Test" });
		}

		if (test.status != "Progress") {
			return res.status(500).json({
				error: "You cannot submit this test,Because the test has already started or finished"
			});
		}

		const user = await User.findOne({ _id: req.params.u_id })
			.catch((err) => {
				console.log(err);
				return res.status(500).json({ error: err })
			});

		if (user == {} || user == undefined) {
			return res.status(400).json({ message: "Couldn't find User" });
		}

		let check1 = false;
		user.participated.map((usr) => {
			if (String(usr) == String(req.params.t_id)) {
				check1 = true;
			}
		})

		if (check1 == false) {
			return res.status(400).json({ message: "User cannot participate in this test,because user has not registered themselves for this test" });
		}

		let points = 0;
		for (var i = 0; i < test.questions.length; i++) {
			for (var j = 0; j < questions.length; j++) {
				if (questions[j].questionName == test.questions[i].questionName) {
					console.log("same question");
					if (questions[j].givenAnswer == test.questions[i].correctAnswer.answer) {
						console.log(questions[j].questionName, test.questions[i].questionName);

						points = test.questions[j].correctAnswer.points;
					}
				}
			}
		}

		const newAnswer = new Answer({
			user: user._id,
			test: test._id,
			questions,
			points: points
		});

		console.log(points);

		/* 		newAnswer
					.save()
					.then(() => { return res.status(200).json({ message: "Test Submitted Successfully" }) })
					.catch((err) => {
						return res.status(500).json({ error: err })
					});
		 */
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: err })
	}
}


const startTest = async (req, res) => {
	try {
		const tests = await Test.find({})
			.catch((err) => { return res.status(500).json({ error: err }) });
		let check1 = false;
		tests.map((test) => {
			if (Date.now() >= test.startTime && Date.now() < test.endTime) {
				test.status = "Progress";
				check1 = true;
			}
		})
		if (!check1)
			return res.status(500).json({ message: "No Test has started Yet" })

		Test
			.insertMany(tests)
			.then(() => { return res.status(200).json({ message: "Tests have started" }) })
			.catch((err) => { return res.status(500).json({ error: err }) }); //bulk insert

	} catch (err) {
		return res.status(500).json({ error: err })
	}
}
const endTest = async (req, res) => {
	try {
		const tests = await Test.find({})
			.catch((err) => { return res.status(500).json({ error: err }) });

		let check1 = false;
		tests.map((test) => {
			if (Date.now() >= test.endTime) {
				test.status = "Ended";
				check1 = true;
			}
		})
		if (!check1)
			return res.status(500).json({ message: "No Test have ended Yet" })

		Test
			.insertMany(tests)
			.then(() => { return res.status(200).json({ message: "Tests have started" }) })
			.catch((err) => { return res.status(500).json({ error: err }) }); //bulk insert

	} catch (err) {
		return res.status(500).json({ error: err })
	}
}

module.exports = {
	createTest,
	updateTestTime,
	updateQuestions,
	deleteTest,
	getAllTest,
	getSingleTest,
	getTestsByType,
	getTestByStartTime,
	submitTest,
	participateInTest,
	startTest,
	endTest
}