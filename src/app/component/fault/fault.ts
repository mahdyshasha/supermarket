import { Component, OnInit, inject } from '@angular/core'; 
import { Nav3 } from "../nav3/nav3";
import { Footer } from "../footer/footer";
import { Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // أضف ReactiveFormsModule
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // أضف هذا
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // مكتبة التنبيهات
@Component({
  selector: 'app-fault',
  standalone: true, 
  imports: [Nav3, Footer, CommonModule,RouterLink, MatIconModule, ReactiveFormsModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './fault.html',
  styleUrl: './fault.css'
})
export class Fault implements OnInit { 
private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  profileForm!: FormGroup;
  displayName: string | null = '';

confirmSave() {

    const dialogRef = this.snackBar.open( 'هل تريد حفظ التغييرات الجديدة؟', 'حفظ الآن',{
      duration: 3000, 
      verticalPosition: 'top',
      panelClass: ['confirm-snackbar']
    });

    dialogRef.onAction().subscribe(() => {
      this.saveChanges();
    });
  }
  ngOnInit() {
    const savedData = localStorage.getItem('userData');
    const user = savedData ? JSON.parse(savedData) : {};
    this.displayName = user.firstName || '';


    this.profileForm = this.fb.group({
      firstName: [user.firstName || '', Validators.required],
      email: [user.email || '', [Validators.required, Validators.email]],
      phone: [user.phone || ''],
      birthDate: [user.birthDate || ''],
      currentPassword: [''],
      newPassword: ['', Validators.minLength(6)]
    });
  }

  saveChanges() {
    if (this.profileForm.invalid) {
      this.showMsg('يرجى التأكد من البيانات المدخلة', 'error');
      return;
    }


    const updatedData = {
      ...JSON.parse(localStorage.getItem('userData') || '{}'), 
      firstName: this.profileForm.value.firstName,
      email: this.profileForm.value.email,
      phone: this.profileForm.value.phone,
      birthDate: this.profileForm.value.birthDate
    };

    localStorage.setItem('userData', JSON.stringify(updatedData));
    this.displayName = updatedData.firstName;

   
  }

  showMsg(msg: string, type: string) {
    this.snackBar.open(msg, 'إغلاق', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['msg-success'] : ['msg-error']
    });
  }
  logout() {
    if (confirm("هل أنت متأكد؟")) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}