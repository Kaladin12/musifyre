"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constructs_1 = require("constructs");
const aws_cdk_lib_1 = require("aws-cdk-lib");
class snsConstruct extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        this.createRoomsTopic(props.topicName);
    }
    createRoomsTopic(name) {
        this.roomTopic = new aws_cdk_lib_1.aws_sns.Topic(this, name, {
            topicName: name
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU25zQ29uc3RydWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU25zQ29uc3RydWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQXVDO0FBQ3ZDLDZDQUE2QztBQU03QyxNQUFNLFlBQWEsU0FBUSxzQkFBUztJQUdsQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXdCO1FBQ2hFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsSUFBWTtRQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUkscUJBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtZQUN6QyxTQUFTLEVBQUUsSUFBSTtTQUNoQixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7IGF3c19zbnMgYXMgc25zIH0gZnJvbSAnYXdzLWNkay1saWInO1xuXG5pbnRlcmZhY2Ugc25zQ29uc3RydWN0UHJvcHMge1xuICB0b3BpY05hbWU6IHN0cmluZztcbn1cblxuY2xhc3Mgc25zQ29uc3RydWN0IGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIHJvb21Ub3BpYzogc25zLlRvcGljO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBzbnNDb25zdHJ1Y3RQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG4gICAgdGhpcy5jcmVhdGVSb29tc1RvcGljKHByb3BzLnRvcGljTmFtZSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVJvb21zVG9waWMobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5yb29tVG9waWMgPSBuZXcgc25zLlRvcGljKHRoaXMsIG5hbWUsIHtcbiAgICAgIHRvcGljTmFtZTogbmFtZVxuICAgIH0pO1xuICB9XG59XG4iXX0=