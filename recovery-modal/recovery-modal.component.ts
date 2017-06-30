import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../login.service';
import { NgbModal, NgbPopover, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'ngbd-modal-content',
	providers: [LoginService],
	templateUrl: './recovery-modal.component.html',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['./recovery-modal.component.css'/*, '../styles/landingCard.css'*/]
})
export class RecoveryModalComponent implements OnInit {
	recoveryResponse: {
		userEmail:	string; 
		recoveryResult:string;
		recoveryError: string;
	}
	recoveryButtonPopoverMessage: string;
	@ViewChild('recoveryButton') recoveryButton : NgbPopover;
	constructor(public activeModal: NgbActiveModal, 
				private LoginService: LoginService,
				private router: Router) { 
		this.recoveryResponse = {
			userEmail:'',
			recoveryResult:'',
			recoveryError: ''
		};
	}
	sendRecovery (userMail:string){
		this.LoginService.sendRecoveryMail(userMail).subscribe(
			(_res) => {
				this.recoveryResponse = _res;
			},
			(_error) => {
				this.recoveryButtonPopoverMessage = 'Connection error, no server response';
				this.recoveryButton.open();
			},
			() => {
				if(this.recoveryResponse.recoveryResult == 'RECOVERY_OK') {
					this.recoveryButton.close();
					this.router.navigate(['main', {outlets: {landingOutlet:['login','RECOVERY_OK']}}]);
					this.activeModal.close();
				}
				else {
					this.recoveryButtonPopoverMessage = this.recoveryResponse.recoveryError;
					this.recoveryButton.open();
				}
			});
	}
	ngOnInit() {}
}
