const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String, 
    password: String,
    firstName: String, 
    lastName: String,
    coursesTaken: [{
        course: {type: Schema.Types.ObjectId, ref: 'Course'},
        reason: String,
    }],
    interests: [String],
    clubs: [String],
    majors: [String], 
    minors: [String],
    chats: [{type: Schema.Types.ObjectId, ref: 'Chat'}],
});

const courseSchema = new Schema({
    departmentName: String,
    departmentCode: String,
    courseName: String,
    courseNumber: String,
    season: String,
    year: String, 
});

const chatSchema = new Schema({
    members: [{type: Schema.Types.ObjectId, ref: 'User'}],
    topic: String,
    messages: [
        {
            sender: {type: Schema.Types.ObjectId, ref: 'User'},
            senderName: String,
            sentAt: Date,
            text: String,  
        }
    ]
});

chatSchema.methods.isMember = function(userId) {
    return this.members.some((memberId) => { return memberId.equals(userId); });
}

const dataSchema = new Schema({
    name: String,
    values: [String]
})

const User = mongoose.model('User', userSchema);
const Chat = mongoose.model('Chat', chatSchema);
const Course = mongoose.model('Course', courseSchema);
const Data = mongoose.model('Data', dataSchema);

module.exports = {
    User: User,
    Chat: Chat,
    Course: Course,
    Data: Data,
}