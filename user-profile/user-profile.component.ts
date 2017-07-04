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
	onHoverFileButton:boolean;
	@ViewChild('avatarImg') avatarImg :  ElementRef;
	constructor(private UserProfileModal: NgbActiveModal, 
				private AppComService: AppComService,
				private CurrentUserService : CurrentUserService) {
		this.appUser = 'N/A';
		this.onHoverFileButton=false;
		this.avatarImgName = "Choose a local image file ...";
	}
	onSubmit(userProfileForm: NgForm){
	}
	onChangeAvatarFile(event){
		if(event.srcElement.files.length > 0) {
			console.log('File added: [%s]', event.srcElement.files[0].name);
			this.avatarImgName = event.srcElement.files[0].name;
			let regExp = new RegExp(/(.jpeg|.jpg|.png|.bmp)$/);
			if(regExp.test(event.srcElement.files[0].name)) {
				console.log('Fileok');
			}
			else {
				console.log('filenotok');
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
