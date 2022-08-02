const express = require('express');

//***************** importing all controllers methods *******************/
const {
    getAllQuestions,
    getAllOptions,
    getSingleQuestion,
    getSingleOption,
    createQuestion,
    createOption,
    deleteQuestion,
    deleteOption,
    addVote
} = require('../controllers/api/v1/questionController');
const router = express.Router();

router.route('/').get(getAllQuestions).post(createQuestion); //* get all question and create question route
router.route('/:id/options').post(createOption).get(getAllOptions); //* get all option and create option route
router.route('/:id/options/:optionId').delete(deleteOption).get(getSingleOption); //* get single option and delete option route
router.route('/:id/options/:optionId/add_vote').post(addVote); //* add vote route
router.route('/:id').delete(deleteQuestion).get(getSingleQuestion); //* get single question and delete question route

module.exports = router;