const mongoose = require('mongoose');

/********** Schema **********
 * Option: 
 *      question,
 *      text,
 *      votes,
 *      link_to_vote
 */

const OptionSchema = new mongoose.Schema({
    question: {
        type: mongoose.Types.ObjectId,
        ref: 'Question',
        required: [true, "Please provide question"]
    },

    text: {
        type: String,
        required: [true, "Please provide option"]
    },

    votes: {
        type: Number,
        default: 0
    },

    link_to_vote: {
        type: String
    }
});

//********************* static methods to get the req object ******************/
let reqObject;
OptionSchema.statics.getReq = function (reqParam) {
    reqObject = reqParam;
}

//******************** post hook to build link_to_vote url ******************/
OptionSchema.post('save', async function () { 
    
    const protocol = reqObject.protocol;
    const host = reqObject.get('host');
    const base = reqObject.baseUrl;

    const url = `${protocol}://${host}${base}/${this.question}/options/${this._id}/add_vote`;
    try {
        await this.model('Option').updateOne({ _id: this._id }, { link_to_vote: url });
    } catch(error) {
        console.log(error);
    }
})

const Option = mongoose.model('Option', OptionSchema);
module.exports = Option;