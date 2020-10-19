import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MnLoginComponent } from './mn-login/mn-login.component';
// import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTabsModule } from '@angular/material';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MnAuthService } from './mn-auth.service';
import { MnAuthGuard } from './mn-auth-guard';
// import { MnPwresetComponent } from './mn-pwreset/mn-pwreset.component';


@NgModule({
  imports: [
    CommonModule,
    // MatButtonModule,
    // MatCardModule,
    // MatFormFieldModule,
    // MatIconModule,
    // MatInputModule,
    // MatTabsModule,
    // FlexLayoutModule,
    FormsModule
  ],
  // declarations: [MnLoginComponent, MnPwresetComponent],
  // exports: [MnLoginComponent, MnPwresetComponent],
  providers: [MnAuthService, MnAuthGuard]
})
export class MnAuthModule { }
