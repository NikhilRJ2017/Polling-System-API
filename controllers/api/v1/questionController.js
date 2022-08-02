const Question = require("../../../models/Question")
const Option = require("../../../models/Option");
const { StatusCodes } = require('http-status-codes');
const CustomErrors = require('../../../config/errors/index');

//******************** Get all Questions *******************/
const getAllQuestions = async (req, res) => {

    //*querying all questions
    const questions = await Question.find({}).populate('options_count options');

    //*sending response
    res.status(StatusCodes.OK).json({
        message: "Success",
        count: questions.length,
        questions: questions,
    })
}

//******************** Get all options ********************/
const getAllOptions = async (req, res) => {

    //*getting question id from params
    const { id: questionId } = req.params;

    //*checking if question exists
    const question = await Question.findById(questionId);
    if (!question) {
        throw new CustomErrors.NotFound(`No question with ${questionId}`);
    }

    //*querying all options for particular question id
    const allOptions = await Option.find({ question: questionId });

    //*sending response
    res.status(StatusCodes.OK).json({
        message: "Success",
        count: allOptions.length,
        options: allOptions
    })
}

//******************** get single questions ********************/
const getSingleQuestion = async (req, res) => {

    //*getting question id from params
    const { id: questionId } = req.params;

    //*checking if question exists
    const question = await Question.findById(questionId).populate('options_count options');
    if (!question) {
        throw new CustomErrors.NotFound(`No question with ${questionId}`);
    }

    //*sending response
    res.status(StatusCodes.OK).json({
        message: "Success",
        question: question
    })
}

//******************** get single option ********************/
const getSingleOption = async (req, res) => {

    //*getting question id and optionid from params
    const { id: questionId, optionId } = req.params;

    //*checking if question exists
    const isQuestionExist = await Question.findById(questionId);
    if (!isQuestionExist) {
        throw new CustomErrors.NotFound(`No question with ${questionId}`);
    }

    //*checking if option exists
    const option = await Option.findOne({ _id: optionId, question: questionId });
    if (!option) {
        throw new CustomErrors.NotFound(`No option with id ${optionId} for question id ${questionId}`);
    }

    //*sending response
    res.status(StatusCodes.OK).json({
        message: "Success",
        option: option
    })
}

//******************** create question **********************/
const createQuestion = async (req, res) => {

    //*getting question title from body
    const { title } = req.body;

    //*creating question
    const question = await Question.create({ title });

    //*sending response
    res.status(StatusCodes.CREATED).json({
        message: "Success",
        question: question,
    })

}

//******************** create option **********************/
const createOption = async (req, res) => {
    //*getting question id from params
    const { id: questionId } = req.params;

     //*checking if question exists
    const isQuestionExist = await Question.findById(questionId);
    if (!isQuestionExist) {
        throw new CustomErrors.NotFound(`No question with ${questionId}`);
    }

    //*getting option text from body
    const { text } = req.body;
    if (!text) {
        throw new CustomErrors.BadRequest(`Please provide option text`);
    }

    //*calling getReq methods in Option.js to set the reqObject to build link_to_vote url
    Option.getReq(req);
    
    //*creating option
    const option = await Option.create({ question: questionId, text });

    //*sending response
    res.status(StatusCodes.CREATED).json({
        message: "Success",
        option: option
    })
}

//******************** delete question ********************/
const deleteQuestion = async (req, res) => {

    //*getting question id from params
    const { id: questionId } = req.params;

    //*checking if question exists
    const question = await Question.findById(questionId);
    if (!question) {
        throw new CustomErrors.NotFound(`No question with ${questionId}`);
    }

    //*removing question along with its options (check in Question model)
    await question.remove();

    //*sending response
    res.status(StatusCodes.OK).json({
        message: "Success"
    })


}

//******************** delete option ********************/
const deleteOption = async (req, res) => {

     //*getting question id and optionid from params
    const { id: questionId, optionId } = req.params;

     //*checking if question exists
    const isQuestionExist = await Question.findById(questionId);
    if (!isQuestionExist) {
        throw new CustomErrors.NotFound(`No question with ${questionId}`);
    }

     //*checking if option exists
    const isOptionExist = await Option.findOne({ _id:optionId, question: questionId });
    if (!isOptionExist) {
        throw new CustomErrors.NotFound(`No option with id ${optionId} for question id ${questionId}`);
    }

    //*removing option
    await isOptionExist.remove();

    //*sending response
    res.status(StatusCodes.OK).json({
        message: "Success"
    })
}

//******************** add votes ********************/
const addVote = async (req, res) => {

    //*getting question id and optionid from params
    const { id: questionId, optionId } = req.params;

    //*checking if question exists
    const isQuestionExist = await Question.findById(questionId);
    if (!isQuestionExist) {
        throw new CustomErrors.NotFound(`No question with ${questionId}`);
    }

     //*checking if option exists
    const option = await Option.findOne({ _id: optionId, question: questionId});
    if (!option) {
        throw new CustomErrors.NotFound(`No option with id ${optionId} for question id ${questionId}`);
    }

    //*updating votes
    await Option.updateOne({ _id: optionId }, { $inc: { votes: 1 }});

    //*sending response
    res.status(StatusCodes.OK).json({
        message: "Success"
    })

}

//* exporting all controller methods
module.exports = {
    getAllQuestions,
    getAllOptions,
    getSingleQuestion,
    getSingleOption,
    createQuestion,
    createOption,
    deleteQuestion,
    deleteOption,
    addVote
}