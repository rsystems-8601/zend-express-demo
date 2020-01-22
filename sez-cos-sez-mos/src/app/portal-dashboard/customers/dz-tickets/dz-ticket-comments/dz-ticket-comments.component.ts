
import {Component, EventEmitter, Input, Output} from "@angular/core";

import * as moment from "moment";
import { TicketComment } from 'src/app/models/ticket.model';
import { TicketCommentCreateRequest, Board } from '../ticket.service';
import { AuthHolderService } from 'src/app/services/auth-holder.service';

@Component({
    selector: "dz-ticket-comments",
    templateUrl: "./dz-ticket-comments.component.html",
    styleUrls: ["./dz-ticket-comments.component.scss"],
})
export class DzNewTicketComments {
    private readonly DATE_FORMAT = "MMM Do YYYY, h:mm:ss a";

    @Input() comments: TicketComment[];
    @Input() commentFormValues: TicketCommentCreateRequest;
    @Input() showCommentForm = true;
    @Input() status: string;
    @Input() board: Board;
    @Input() ticketId: number;
    @Output() postComment = new EventEmitter<TicketCommentCreateRequest>();

    constructor(public auth: AuthHolderService) {
    }

    formatDate(date: Date): string {
        return moment(date).format(this.DATE_FORMAT);
    }
}
