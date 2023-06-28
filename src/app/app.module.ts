import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CalculationActionsComponent } from './components/calculation-actions-component/calculation-actions.component';
import { CalculationResultsComponent } from './components/calculation-results-component/calculation-results.component';
import { CalculationService } from './shared/calculation.service';

@NgModule({
  declarations: [
    AppComponent,
    CalculationActionsComponent,
    CalculationResultsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CalculationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
