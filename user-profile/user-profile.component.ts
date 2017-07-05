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
	@ViewChild('avatarImg') avatarImg :  ElementRef;
	constructor(private UserProfileModal: NgbActiveModal, 
				private AppComService: AppComService,
				private CurrentUserService : CurrentUserService) {
		this.appUser = 'N/A';
		this.onHoverFileButton=false;
		if (window.screen.width > 1000) this.avatarImgName = "Choose a local image file ...";
		else this.avatarImgName = "Choose file ...";
		this.validAvatarFile = false;
	}
	onSubmit(userProfileForm: NgForm){
	}
	onChangeAvatarFile(event){
		if(event.srcElement.files.length > 0) {
			console.log('File added: [%s]', event.srcElement.files[0].name);
			this.avatarImgName = event.srcElement.files[0].name;
			if(window.screen.width < 1000) truncate(event.srcElement.files[0].name
			let regExp = new RegExp(/(.jpeg|.jpg|.png|.bmp)$/);
			if(regExp.test(event.srcElement.files[0].name)) {
				this.validAvatarFile=true;
			}
			else {
				this.validAvatarFile=false;
			}
			let avatarImgFile : File = event.srcElement.files[0];
			let formData : FormData = new FormData();
			formData.append('avatar', avatarImgFile, avatarImgFile.name);
			this.AppComService.sendAvatarImg(formData).subscribe((_res)=> console.log(_res));
		}
	}
	ngOnInit() {
		this.CurrentUserService.getCurrentUser().subscribe((currentUser:string) => {
			this.appUser = currentUser;
		});			
			
	}
}
