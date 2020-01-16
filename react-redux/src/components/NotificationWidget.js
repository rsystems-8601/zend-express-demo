import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
//import assign from 'object-assign';

let notificationWrapperId = 'toast-container';
let defaultTimeout =1000; // ms
let animationDuration = 300; // ms
export const SUCCESS = 'success';
export const FAILURE = 'failure';
export const WARNING = 'warning';
/* Colors */
const colorWhite = 'white';
const colorError = '#E85742';
const colorSuccess = '#55CA92';
const colorWarning = '#F5E273';
const textColorWarning = '#333333';

/* React Notification Component */
class Toast extends React.Component {
	static propTypes = {
		text: PropTypes.string,
		timeout: PropTypes.number,
		type: PropTypes.string,
		color:PropTypes.object,
		style: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.bool
		])
	};



	getStyles() {
		let styles={};
		var contentStyle = "alert row valign-wrapper";

		const containerStyle = {
			WebkitUserDrag: 'none',
            WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
            top: '0px',
            opacity: '1',
		};

		/* If type is set, merge toast action styles with base */
		switch (this.props.type) {
			case SUCCESS:
				
				styles.content = contentStyle+" alert-success" ;
				break;

			case FAILURE:
				styles.content = contentStyle+" alert-error" ;
				break;

			case WARNING:
				styles.content = contentStyle+" alert-warning" ;
				break;

			

			default:
				styles.content = contentStyle+" alert-success";
				break;
		}

		styles.container = containerStyle;

		return styles;
	}

	

	
	render() {
		let {text, type} = this.props;
		let styles = this.getStyles();
		let {styleParent} = this.getStyles().container;
		return (

			

			<div className="toast" style={styleParent}>

				<div className={this.getStyles().content}>
					<div className="col s9 content valign">
					<span>{text}</span>
					</div>
				</div>

				
			</div>
		);
	}
}

/* Private Functions */

/* Render React component */
function renderToast(text, type, timeout, color) {
	ReactDOM.render(
		<Toast text={text} timeout={timeout} type={type} color={color}/>,
		document.getElementById(notificationWrapperId)
	);
}

/* Unmount React component */
function hideToast() {
	ReactDOM.unmountComponentAtNode(document.getElementById(notificationWrapperId));
}

/* Public functions */

/* Show Animated Toast Message */
/* Returns true if the toast was shown, or false if show failed due to an existing notification */
function show(text, type, timeout, color) {
	if (!document.getElementById(notificationWrapperId).hasChildNodes()) {
		let renderTimeout = timeout;

		// Use default timeout if not set.
		if (!renderTimeout) {
			renderTimeout = defaultTimeout;
		}

		// Render Component with Props.
		renderToast(text, type, renderTimeout, color);

		if (timeout === -1) {
			return false;
		}

		// Unmount react component after the animation finished.
		setTimeout(function() {
			hideToast();
		}, renderTimeout + animationDuration);

        return true;
	}
    return false;
}

/**
 * Add to Animated Toast Message Queue
 * Display immediately if no queue
 * @param  {Number} initialRecallDelay   If the call to show fails because of an existing
 *                                       notification, how long to wait until we retry (ms)
 * @param  {Number} recallDelayIncrement Each time a successive call fails, the recall delay
 *                                       will be incremented by this (ms)
 * @return {[type]}                      [description]
 */
function createShowQueue(initialRecallDelay = 500, recallDelayIncrement = 500) {
    // Array to hold queued messages
    this.msgs = [];

    // Is the showNotify function in progress - used so we can call showNotify when a
    // message is added to an empty queue.
    this.isNotifying = false;

    this.currentRecallDelay = initialRecallDelay;

    // Retrieve the next message from the queue and try to show it
    this.showNotify = () => {
        // If there are no messages in the queue
        if (this.msgs.length === 0) {
            this.isNotifying = false;
            return;
        }

        this.isNotifying = true;

        const current = this.msgs.pop();

        // show will now return true if it is able to send the message,
        // or false if there is an existing message
        if (show(current.text, current.type, current.timeout, current.color)) {
            this.currentRecallDelay = initialRecallDelay;
            if (current.timeout > 0) {
                setTimeout(() => this.showNotify(), current.timeout + animationDuration);
            }
        } else {
            // If message show failed, re-add the current message to the front of the queue
            this.msgs.unshift(current);
            setTimeout(() => this.showNotify(), this.currentRecallDelay);
            this.currentRecallDelay += recallDelayIncrement;
        }
    };

    return (type = 'success', text, timeout = defaultTimeout, color = colorWhite) => {
        this.msgs.push({text, type, timeout, color});
        if (!this.isNotifying) {
            this.showNotify();
        }
    };
}

/* Export notification container */
export default class NotificationWidget extends React.Component {
	render() {
		return (
			<div id={notificationWrapperId}></div>
		);
	}
}

/* Export notification functions */
export let notify = {
	show,
    createShowQueue
};
