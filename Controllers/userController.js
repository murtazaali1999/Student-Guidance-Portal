const User = require("../Models/user");
const sendEmail = require("../utils/nodeMailer").sendEmail;

const signup = async (req, res) => {
    try {
        const { name, age, email, password } = req.body;

        if (!name || !age || !email || !password) {
            return res.status(300).json({ error: "One or more fields are empty" });
        }

        let check1 = false;
        const users = await User.find();

        users.map((user) => {
            if (user.email == email) {
                check1 = true;
            }
        });

        if (check1 == true) {
            return res.status(300).json({ error: "User already exists with this email" });
        }

        const newUser = new User({
            name,
            age,
            email,
            password
        });

        newUser
            .save()
            .then(() => {
                return res.status(200).json({ User: newUser, message: "User registerd Successfully" })
            })
            .catch((err) => {
                return res.status(500).json({ error: err })
            })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
}
const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(300).json({ error: "One or more fields are empty" });
        }

        const user = await User.findOne({ email, password });

        if (user == [] || user == undefined) {
            return res.status(400).json({ error: "User does not exist with this email and password" });
        }

        return res.status(200).json({ User: user });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
}
const updateCredentials = async (req, res) => {
    try {
        const { name, age } = req.body;
        if (!name || !age) {
            return res.status(300).json({ error: "One or more fieldsa are empty" });
        }

        const user = User.findOne({ _id: req.params.u_id });

        if (user == {} || user == undefined) {
            return res.status(400).json({ error: "One or more fieldsa are empty" });
        }

        user.name = name;
        user.age = age;

        user.save()
            .then(() => {
                return res.status(200).json({ User: user, message: "User Updated Successfully" })
            })
            .catch((err) => {
                return res.status(500).json({ error: err })
            });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
}
const getResetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(300).send("Email is required");
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.send("Voter with the give email is not present");
        }

        const randomNum = Math.round(
            (Math.random() * 34567456784568987654) / 26543
        );

        const url = "http://localhost:5533/reset/password/" + `${randomNum}`;

        console.log("urlllllll==========", url);

        user.resetToken = randomNum;

        await user.save();

        const message = `Your "Reset Password Token" has been generated. Kindly click the link below to reset it.
      \n\n${url}\n\n
      If you have not requested this email, you may ignore it.`;

        try {
            console.log("Message===============", message);

            await sendEmail({
                email: user.email,
                subject: "Password recovery email",
                message,
            });
            res.status(200).send(`Email sent to ${user.email}`);
        } catch (err) {
            await voter.save({ validateBeforeSave: false });
            return new Error("internal server error");
        }
        // res.status(200).send("Check Your Email")
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
}
const resetPassword = async (req, res) => {
    try {
        const { newPassword, confirmPassword, resetToken } = req.body;

        if (!newPassword || !confirmPassword || !resetToken)
            return res.status(300).json({ error: "One or More fields are empty" });

        if (newPassword !== confirmPassword)
            return res.status(500).status({ error: "Both Passwords Should be same" });

        const user = await User.findOne({ resetToken });

        if (user == {} || user == undefined) {
            return res.status(400).json({ error: "Token is not correct or it has been expired" });
        }

        user.resetToken = null;
        user.password = confirmPassword;

        await user.save();

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
}
const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.u_id });

        if (user == {} || user == undefined) {
            return res.status(400).json({ error: "User with this ID does not exist" });
        }

        res.status(200).json({ User: user });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
}
const getAllUser = async (req, res) => {
    try {
        const users = await User.find();

        if (users == [] || users == undefined) {
            return res.status(400).json({ error: "User with this ID does not exist" });
        }

        res.status(200).json({ User: users });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
}

module.exports = {
    signup,
    login,
    updateCredentials,
    getResetPasswordToken,
    resetPassword,
    getUser,
    getAllUser
}