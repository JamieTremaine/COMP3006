import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { Severity, ToastService } from '../../../svc/toast.service';
import { MenuService, RestaurantService } from '../../../api/services';
import { Menu } from '../../../api/models';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-menu-editor',
    standalone: true,
    imports: [NgbAccordionModule, FormsModule, ReactiveFormsModule, CommonModule ],
    templateUrl: './menu-editor.component.html',
    styleUrl: './menu-editor.component.scss'
})
export class MenuEditorComponent {

    updating?: boolean = false;
    restaurantId?: string;
    menuId?: string;

    menuForm = this.fb.group({
        name: ['', Validators.required],
        restaurantId: new FormControl({value: '', disabled: true}),
        restaurantName: new FormControl({value: '', disabled: true}),
        MenuItems: this.fb.array([])
    });

    constructor(private fb: FormBuilder, 
        private activatedRoute: ActivatedRoute, 
        private toaster: ToastService, 
        private menuService: MenuService, 
        private restaurantService: RestaurantService,
        private router: Router) {

    }
  
    ngOnInit(): void {
        if(this.activatedRoute.snapshot.paramMap.get('menuId') !== null) {
            this.updating = true;
            this.menuId = this.activatedRoute.snapshot.paramMap.get('menuId') as string;

            lastValueFrom(this.menuService.menuMenuIdGet({menuId: this.menuId})).then((result) =>{
                this.menuForm.patchValue(result);

                result.MenuItems?.forEach((item)=>{
                    this.newMenuItem(item);
                })

            }).catch(()=>this.toaster.show('Could not laod menu', Severity.success, 5000))
        }

        if(this.activatedRoute.snapshot.paramMap.get('restaurantId') !== null) {
            const id = this.activatedRoute.snapshot.paramMap.get('restaurantId') as string;
            this.menuForm.controls.restaurantId.setValue(id);
            this.restaurantId = id;

            lastValueFrom(this.restaurantService.restaurantRestaurantIdGet({restaurantId: id})).then((result) => {
                this.menuForm.controls.restaurantName.setValue(result.name as string);
            });
        }
    }

  
    newMenuItem(menuItem?: any): void {
        const item = this.fb.group({
            name: ['new item', Validators.required],
            itemTypes: this.fb.array([]),
            description: [''],
            price: ['', Validators.required],
            nutritionalInfo: this.fb.group({
            calories: ['']
            }),
            extras: this.fb.array([])
        });

        if(menuItem) {
            item.patchValue(menuItem);
            menuItem.extras.forEach((extra: any)=>{
                this.newExtra(item, extra)
            })
        }

        this.menuForm.controls.MenuItems.push(item as any);
    }


  
    newExtra(menuItem: FormControl<unknown> | FormGroup, extras?: any): void {
        const extraGroup = this.fb.group({
            name: ['new extra', Validators.required],
            extras: this.fb.array([])
        });

        if(extras) {
            extraGroup.patchValue(extras);        
            extras.extras.forEach((extra: any) =>{
                this.newExtraItem(extraGroup, extra)
            })
        }

        (menuItem.get('extras') as FormArray).push(extraGroup);
    }
  
    newExtraItem(extraControl: AbstractControl<any, any>, extra?: any): void {
        const extraItem = this.fb.group({
            name: ['', Validators.required],
            nutritionalInfo: this.fb.group({
            calories: ['']
            })
        });

        extraItem.patchValue(extra);
        (extraControl.get('extras') as FormArray).push(extraItem); 
    }

    //Cant cast types in template :)))))))) Angular github says to do this https://github.com/angular/angular/issues/45468
    castAsFormArray(item: any): FormArray {
        return item
    }

    sendMenu() {
        if(!this.menuForm.valid) {
            this.toaster.show('Some required fields have not been set', Severity.danger, 5000);
            return;
        }

        if(this.updating){
            lastValueFrom(this.menuService.menuMenuIdPut({menuId: this.menuId, body: this.menuForm.getRawValue() as Menu})).then((result) => {
                this.toaster.show('Menu saved', Severity.success, 5000);
                this.router.navigate(['/menus', this.restaurantId]);  
            }).catch(() => {
                this.toaster.show('Did not save menu', Severity.danger, 5000);
            });
        } else {
            lastValueFrom(this.menuService.menuPost({ body: this.menuForm.getRawValue() as Menu })).then((result) => {
                this.toaster.show('Menu saved', Severity.success, 5000);
                this.router.navigate(['/menus', this.restaurantId]);  
            }).catch(() => {
                this.toaster.show('Did not save menu', Severity.danger, 5000);
            });
        }
    }
}