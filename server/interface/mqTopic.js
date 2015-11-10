/**
 * Created by chihhsien on 7/28/15.
 */
var MXviewcloudDashbaordTopic = 'MXviewcloudDashbaordTopic';
var RegisterMXviewTopic = 'registerMXviewTopic';

function mqTopic() {
    console.log('construct mqTopic');
};

mqTopic.prototype.getMXviewDashbaordTopic = function() {
    return MXviewcloudDashbaordTopic;
};

mqTopic.prototype.getRegisterMXviewTopic = function() {
    return RegisterMXviewTopic;
};

module.exports = mqTopic;