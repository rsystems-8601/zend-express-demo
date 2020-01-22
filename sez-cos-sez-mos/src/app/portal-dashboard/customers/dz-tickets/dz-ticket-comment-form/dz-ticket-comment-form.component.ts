import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Component, EventEmitter, Input, Output} from "@angular/core";
import { TicketCommentCreateRequest, Board, TicketService } from '../ticket.service';
import { AuthHolderService } from 'src/app/services/auth-holder.service';


@Component({
    selector: "dz-ticket-comment-form",
    templateUrl: "./dz-ticket-comment-form.component.html",
    styleUrls: ["./dz-ticket-comment-form.component.scss"],
})
export class DzNewTicketCommentComponent {
    @Input()
    set formValues(request: TicketCommentCreateRequest) {
        this.commentForm = this.fb.group({
            text: [request.text, Validators.required],
            isDiscussion: [request.discussion],
            isInternal: [request.internal],
            isResolution: [request.resolution],
            ticketStatus: [request.status]
        });
        this.initialStatus = request.status;
    };

    initialStatus: string;
    commentInputFocused = false;

    @Input()
    set ticketStatus(status: string) {
        this.commentForm && this.commentForm.patchValue({ticketStatus: status});
        this.initialStatus = status;
    };

    @Input()
    board: Board;
    @Input()
    ticketId: number;

    @Output() post = new EventEmitter<TicketCommentCreateRequest>();

    commentForm: FormGroup;
    attachment: File;

    constructor(public auth: AuthHolderService,
                public ticketService: TicketService,
                private fb: FormBuilder) {
    }

    postComment(commentForm: FormGroup) {
        const status = commentForm.get("ticketStatus").value;
        if (status != this.initialStatus) {
            this.ticketService.updateTicket(this.ticketId, {statusName: status})
                .spinner()
                .subscribe(() => {
                    this.commentForm.patchValue({ticketStatus: status});
                    this.initialStatus = status;
                    this.emitSendComment();
                });
        } else {
            this.emitSendComment();
        }
    }

    selectAttachment(file: File) {
        this.attachment = file;
    }

    cancelFile() {
        this.attachment = null;
    }

    private emitSendComment() {
        this.post.emit({
            text: this.commentForm.get("text").value,
            discussion: this.commentForm.get("isDiscussion").value,
            internal: this.commentForm.get("isInternal").value,
            resolution: this.commentForm.get("isResolution").value,
            attachment: this.attachment
        });
        this.cancelFile();
    }
}
