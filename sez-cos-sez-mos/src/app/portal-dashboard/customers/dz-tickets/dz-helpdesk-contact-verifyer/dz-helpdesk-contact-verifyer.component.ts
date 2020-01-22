import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";

import {ModalDirective} from "ngx-bootstrap";
import { HelpDeskContact, TicketService } from '../ticket.service';
import { customSpinner } from 'src/app/infra/rx-spinner-operator';

@Component({
    selector: "dz-helpdesk-contact-verifyer",
    templateUrl: "./dz-helpdesk-contact-verifyer.component.html"
})
export class DzHelpDeskContactVerifier {
    @Input() offerDefaultContact = true;
    @Output() persist = new EventEmitter<HelpDeskContact>();
    @Output() persistWithoutContact = new EventEmitter<HelpDeskContact>();
    @ViewChild('contactCreationModal', {static: false}) private contactCreationModal: ModalDirective;
    @ViewChild('defaultContactModal', {static: false}) private defaultContactModal: ModalDirective;

    private userId: number;

    userEmail: string;
    userOrgName: string;
    defaultContact: HelpDeskContact;

    constructor(private ticketService: TicketService) {
    }

    verifyContactExistsFor(userId: number, email: string, orgName: string) {
        this.userId = userId;
        this.userEmail = email;
        this.userOrgName = orgName;

        this.ticketService.getHelpDeskContactSkipNotFoundHandler(userId).pipe(customSpinner()).subscribe(
            contact => {
                if (contact.email.toLowerCase() === this.userEmail.toLowerCase()) {
                    this.persist.emit(null)
                } else {
                    this.defaultContact = contact;
                    this.contactCreationModal.show();
                }
            },
            () => this.contactCreationModal.show()
        );
    }

    cancelContactCreation() {
        if (this.offerDefaultContact) {
            this.contactCreationModal.hide();
            this.defaultContactModal.show();
        } else {
            this.cancelPosting();
        }
    }

    approveContactCreation() {
        this.contactCreationModal.hide();
        this.ticketService.createContact(this.userId).spinner().subscribe(() => this.persist.emit(null));
    }

    approveDefaultOrNoContact() {
        this.defaultContactModal.hide();
        this.persist.emit(this.defaultContact);
    }

    cancelPosting() {
        this.contactCreationModal.hide();
        this.defaultContactModal.hide();
    }
}