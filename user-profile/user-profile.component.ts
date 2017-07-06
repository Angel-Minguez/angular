import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComService } from '../app-com.service';
import { CurrentUserService } from '../current-user.service';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css'],
	providers: [AppComService]
})
export class UserProfileComponent implements OnInit {
	appUser: string;
	avatarImgName: string;
	validAvatarFile: boolean;
	onHoverFileButton:boolean;
	fileUploadFeedbackMessage: string;
	@ViewChild('fileCheck') fileCheck :  ElementRef;
	@ViewChild('fileUploadFeedback') fileUploadFeedback :  ElementRef;
	constructor(private UserProfileModal: NgbActiveModal, 
				private AppComService: AppComService,
				private CurrentUserService : CurrentUserService) {
		this.appUser = 'N/A';
		this.onHoverFileButton = false;
		this.fileUploadFeedbackMessage = 'Upload a png, jpg, jpeg or bmp file.';
		if (window.screen.width > 1000) this.avatarImgName = "Choose a local image file ...";
		else this.avatarImgName = "Choose file ...";
		this.validAvatarFile = false;
	}
	onSubmit(userProfileForm: NgForm){
	}
	onChangeAvatarFile(event){
		if(event.srcElement.files.length > 0) {
			console.log('File added: [%s]', event.srcElement.files[0].name);
			if(window.screen.width < 1000) 
				if(event.srcElement.files[0].name.length < 20)this.avatarImgName = event.srcElement.files[0].name;
				else this.avatarImgName = event.srcElement.files[0].name.slice(0,17)+' ...';
			else if(event.srcElement.files[0].name.length < 32) this.avatarImgName = event.srcElement.files[0].name;
				else this.avatarImgName = event.srcElement.files[0].name.slice(0,29)+' ...';
			let regExp = new RegExp(/(.jpeg|.jpg|.png|.bmp)$/);
			if(regExp.test(event.srcElement.files[0].name)) {
				if(event.srcElement.files[0].size > 1000000) {
					this.validAvatarFile=false;
					this.fileCheck.nativeElement.style.color = 'red';
					this.fileUploadFeedbackMessage = "Image size it's too big.";
					this.fileUploadFeedback.nativeElement.style.color = 'red';
				} else {
					console.log('Sending file: [%s]', event.srcElement.files[0].name );
					this.validAvatarFile=true;
					this.fileCheck.nativeElement.style.color = 'green';
					let avatarImgFile : File = event.srcElement.files[0];
					let formData : FormData = new FormData();
					formData.append('avatarImg', avatarImgFile, event.srcElement.files[0].name);
					this.AppComService.sendAvatarImg(formData).subscribe((_res)=> console.log(_res));
				}
			}
			else {
				this.validAvatarFile=false;
				this.fileCheck.nativeElement.style.color = 'red';
				this.fileUploadFeedbackMessage = 'Invalid file extension';
				this.fileUploadFeedback.nativeElement.style.color = 'red';
			}
		}
	}
	ngOnInit() {
		this.CurrentUserService.getCurrentUser().subscribe((currentUser:string) => {
			this.appUser = currentUser;
		});				
	}
}
