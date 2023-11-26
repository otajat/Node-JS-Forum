const Question = require("../modules/question");
// const CheckSession = require("./auth");

const postQuestion = async (req, res) => {
    console.log("DKHLNA L POST QUESTION ROUTE")



    try {
        const { question } = req.body;
        const userid=req.session.user
        console.log("we have a connected user ")
        const newQuestion = new Question({
                user:userid,
                question:question,
                date:Date.now()
            });
        
        
        await newQuestion.save();
        return res.redirect("/question_list")

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    };

module.exports = postQuestion;