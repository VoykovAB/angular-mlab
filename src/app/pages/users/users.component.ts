import {Component, OnInit} from '@angular/core';
import {IUser} from '../../models/user.model';
import {ApiService} from '../../services/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    public users: Array<IUser> = [];
    public colors: string[] = [
        'active',
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
    ];
    public formGroup: FormGroup;
    public current_id = 'new';

    constructor(private _api: ApiService,
                private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            first_name: [
                '',
                [
                    Validators.required,
                    Validators.minLength(4)
                ]
            ],
            last_name: [
                '',
                [
                    Validators.required,
                    Validators.minLength(4)
                ]
            ],
            birth_date: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                ]
            ],
            email: [
                '',
                [
                    Validators.required,
                    Validators.email,
                    Validators.minLength(6)
                ]
            ],
            _id: ['']
        });
        this.checkUsers();
    }

    get first_name() {
        return this.formGroup.get('first_name');
    }

    get last_name() {
        return this.formGroup.get('last_name');
    }

    get birth_date() {
        return this.formGroup.get('birth_date');
    }

    get email() {
        return this.formGroup.get('email');
    }

    public checkUsers() {
        const subscription = this._api.get().subscribe((resp) => {
                this.users = resp;
                subscription.unsubscribe();
            }
        );
    }

    public deleteUser(user: IUser) {
        console.log('component', user);
        const subscription = this._api.delete(user._id).subscribe((resp) => {
                if (resp['ok']) {
                    this.users.forEach((user_i: IUser, i: number) => {
                        if (user_i._id === user._id) {
                            this.users.splice(i, 1);
                            return;
                        }
                    });
                }
                subscription.unsubscribe();
            }
        );
    }

    public createUser() {
        const subscription = this._api
            .post({
                first_name: this.formGroup.controls['first_name'].value,
                last_name: this.formGroup.controls['last_name'].value,
                birth_date: this.formGroup.controls['birth_date'].value,
                email: this.formGroup.controls['email'].value,
            })
            .subscribe((resp) => {
                    this.users.push(resp);
                    this.resetForm();
                    subscription.unsubscribe();
                }
            );
    }

    public updateUser() {
        const subscription = this._api
            .put({
                first_name: this.formGroup.controls['first_name'].value,
                last_name: this.formGroup.controls['last_name'].value,
                birth_date: this.formGroup.controls['birth_date'].value,
                email: this.formGroup.controls['email'].value,
                _id: this.formGroup.controls['_id'].value
            })
            .subscribe((resp) => {
                    if (resp['ok']) {
                        this.users[this.current_id].first_name = this.formGroup.controls['first_name'].value;
                        this.users[this.current_id].last_name = this.formGroup.controls['last_name'].value;
                        this.users[this.current_id].birth_date = this.formGroup.controls['birth_date'].value;
                        this.users[this.current_id].email = this.formGroup.controls['email'].value;
                        this.resetForm();
                    }
                    subscription.unsubscribe();
                }
            );
    }

    public userToUpdate(user: IUser, id: number) {
        this.resetForm();

        this.formGroup.get('first_name').setValue(user.first_name);
        this.formGroup.get('last_name').setValue(user.last_name);
        this.formGroup.get('birth_date').setValue(user.birth_date);
        this.formGroup.get('email').setValue(user.email);
        this.formGroup.get('_id').setValue(user._id);

        this.current_id = String(id);
    }

    public resetForm() {
        this.current_id = 'new';
        this.formGroup.reset();
    }
}
