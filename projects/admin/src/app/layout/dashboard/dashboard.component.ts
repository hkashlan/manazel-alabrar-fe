import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductModel } from '../../product.model';
import { MasterService } from '../../service/master.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboared',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    CurrencyPipe,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent  {
  durationInSeconds = 5;


  productlist?: ProductModel[];
  datasource: any;
  editdata?: ProductModel;
  displayedColums: string[] = ['id', 'name', 'description', 'price', 'action'];

  isadd = false;
  isedit = false;

  constructor(
    private serice: MasterService,
    private builder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.loadproductlist();
  }

  loadproductlist() {
    this.serice.getallproducts().subscribe((item) => {
      this.productlist = item;
      this.datasource = new MatTableDataSource(this.productlist);
    });
  }

  productform = this.builder.group({
    id: this.builder.control({ value: 0, disabled: true }),
    name: this.builder.control('', Validators.required),
    description: this.builder.control(''),
    price: this.builder.control(0),
  });
  
  Saveproduct() {
    if (this.productform.valid) {
      const _obj: ProductModel = {
        id: this.productform.value.id as number,
        name: this.productform.value.name as string,
        description: this.productform.value.description as string,
        price: this.productform.value.price as number,
      };
      if (this.isadd) {
        this.serice.createproduct(_obj).subscribe(() => {
          this.loadproductlist();
          this.isadd = false;
          this.isedit = false;
        });
      } else {
        _obj.id = this.productform.getRawValue().id as number;
        this.serice.updateproduct(_obj).subscribe(() => {
          this.loadproductlist();
          this.isadd = false;
          this.isedit = false;
        });
      }
    }
  }

  editproduct(id: number) {
    this.serice.getproduct(id).subscribe((item) => {
      this.editdata = item;
      this.productform.setValue({
        id: this.editdata.id,
        name: this.editdata.name,
        description: this.editdata.description,
        price: this.editdata.price,
      });
      this.isedit = true;
    });
  }
  removeproduct(id: number) {
    this.serice.deleteproduct(id).subscribe((item) => {
      this.loadproductlist();
    });
  }

  addproduct() {
    this.productform.reset();
    this.isadd = true;
    this.isedit = false;
  }
  backtolist() {
    this.isadd = false;
    this.isedit = false;
  }

  SnackBarOpen() {
    this._snackBar.open(' Updated successfully', "OK", {
      duration: this.durationInSeconds * 1000,
    });
  }

  SnackBarRemove() {
    this._snackBar.open('Remove successfully', "OK", {
      duration: this.durationInSeconds * 1000,
    });
  }
  isFormValid(): boolean {
    return this.productform.valid;
  }
}
