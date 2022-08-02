const mongoose = require('mongoose');

/********** Schema **********
 * Question: 
 *      title
 */

const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

//******************* virtuals for populating all options and option_count of a question (following principle of least cardinality) ******************/
QuestionSchema.virtual('options_count', {
    ref: 'Option',
    localField: '_id',
    foreignField: 'question',
    justOne: false,
    count: true
});

QuestionSchema.virtual('options', {
    ref: 'Option',
    localField: '_id',
    foreignField: 'question',
    justOne: false
});

//******************* using mongoose middleware (pre-hook) to remove all options associated with particular question ******************/
QuestionSchema.pre('remove', async function () {
    await this.model('Option').deleteMany({ question: this._id });
})

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;