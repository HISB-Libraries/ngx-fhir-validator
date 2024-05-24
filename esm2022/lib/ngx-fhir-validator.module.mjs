import { NgModule } from '@angular/core';
import { NgxFhirValidatorComponent } from './components/ngx-fhir-validator.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { CommonModule } from "@angular/common";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatChipsModule } from "@angular/material/chips";
import { BrowserModule } from "@angular/platform-browser";
import { MatDividerModule } from "@angular/material/divider";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ValidatorConstants } from "./providers/validator-constants";
import * as i0 from "@angular/core";
export class NgxFhirValidatorModule {
    static forRoot(serverBaseUrl) {
        return {
            ngModule: NgxFhirValidatorModule,
            providers: [
                {
                    provide: 'serverBaseUrl',
                    useValue: serverBaseUrl
                }
            ]
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: NgxFhirValidatorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.0", ngImport: i0, type: NgxFhirValidatorModule, declarations: [NgxFhirValidatorComponent], imports: [CommonModule,
            BrowserModule,
            BrowserAnimationsModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            ReactiveFormsModule,
            MatIconModule,
            MatSidenavModule,
            MatToolbarModule,
            MatTableModule,
            MatPaginatorModule,
            MatProgressSpinnerModule,
            MatSortModule,
            MatRadioModule,
            FormsModule,
            MatCardModule,
            MatSnackBarModule,
            MatSelectModule,
            MatButtonToggleModule,
            MatChipsModule,
            MatCheckboxModule,
            MatTooltipModule,
            MatDividerModule], exports: [NgxFhirValidatorComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: NgxFhirValidatorModule, providers: [
            ValidatorConstants,
            provideHttpClient(withInterceptorsFromDi())
        ], imports: [CommonModule,
            BrowserModule,
            BrowserAnimationsModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            ReactiveFormsModule,
            MatIconModule,
            MatSidenavModule,
            MatToolbarModule,
            MatTableModule,
            MatPaginatorModule,
            MatProgressSpinnerModule,
            MatSortModule,
            MatRadioModule,
            FormsModule,
            MatCardModule,
            MatSnackBarModule,
            MatSelectModule,
            MatButtonToggleModule,
            MatChipsModule,
            MatCheckboxModule,
            MatTooltipModule,
            MatDividerModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: NgxFhirValidatorModule, decorators: [{
            type: NgModule,
            args: [{ declarations: [
                        NgxFhirValidatorComponent
                    ],
                    exports: [
                        NgxFhirValidatorComponent
                    ], imports: [CommonModule,
                        BrowserModule,
                        BrowserAnimationsModule,
                        MatFormFieldModule,
                        MatInputModule,
                        MatButtonModule,
                        ReactiveFormsModule,
                        MatIconModule,
                        MatSidenavModule,
                        MatToolbarModule,
                        MatTableModule,
                        MatPaginatorModule,
                        MatProgressSpinnerModule,
                        MatSortModule,
                        MatRadioModule,
                        FormsModule,
                        MatCardModule,
                        MatSnackBarModule,
                        MatSelectModule,
                        MatButtonToggleModule,
                        MatChipsModule,
                        MatCheckboxModule,
                        MatTooltipModule,
                        MatDividerModule], providers: [
                        ValidatorConstants,
                        provideHttpClient(withInterceptorsFromDi())
                    ] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZoaXItdmFsaWRhdG9yLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1maGlyLXZhbGlkYXRvci9zcmMvbGliL25neC1maGlyLXZhbGlkYXRvci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFzQixRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdEYsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDdEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQy9ELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pE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RTt3QkFDOUIsa0JBQWtCO3dCQUNsQixpQkFBaUIsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO3FCQUM5QyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ3hGaGlyVmFsaWRhdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL25neC1maGlyLXZhbGlkYXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHtNYXRUb29sYmFyTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbGJhclwiO1xuaW1wb3J0IHtNYXRGb3JtRmllbGRNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkXCI7XG5pbXBvcnQge01hdEJ1dHRvblRvZ2dsZU1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL2J1dHRvbi10b2dnbGVcIjtcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge01hdFBhZ2luYXRvck1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL3BhZ2luYXRvclwiO1xuaW1wb3J0IHtNYXRJbnB1dE1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL2lucHV0XCI7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7TWF0U25hY2tCYXJNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXJcIjtcbmltcG9ydCB7TWF0U29ydE1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL3NvcnRcIjtcbmltcG9ydCB7TWF0VGFibGVNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9tYXRlcmlhbC90YWJsZVwiO1xuaW1wb3J0IHtNYXRDaGVja2JveE1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL2NoZWNrYm94XCI7XG5pbXBvcnQge01hdENhcmRNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9tYXRlcmlhbC9jYXJkXCI7XG5pbXBvcnQge01hdFRvb2x0aXBNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwXCI7XG5pbXBvcnQge01hdEJ1dHRvbk1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL2J1dHRvblwiO1xuaW1wb3J0IHtNYXRTZWxlY3RNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3RcIjtcbmltcG9ydCB7TWF0SWNvbk1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL2ljb25cIjtcbmltcG9ydCB7TWF0U2lkZW5hdk1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL3NpZGVuYXZcIjtcbmltcG9ydCB7TWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWwvcHJvZ3Jlc3Mtc3Bpbm5lclwiO1xuaW1wb3J0IHtNYXRSYWRpb01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL3JhZGlvXCI7XG5pbXBvcnQge0Jyb3dzZXJBbmltYXRpb25zTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zXCI7XG5pbXBvcnQge01hdENoaXBzTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWwvY2hpcHNcIjtcbmltcG9ydCB7QnJvd3Nlck1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIjtcbmltcG9ydCB7TWF0RGl2aWRlck1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL2RpdmlkZXJcIjtcbmltcG9ydCB7IHByb3ZpZGVIdHRwQ2xpZW50LCB3aXRoSW50ZXJjZXB0b3JzRnJvbURpIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQge1ZhbGlkYXRvckNvbnN0YW50c30gZnJvbSBcIi4vcHJvdmlkZXJzL3ZhbGlkYXRvci1jb25zdGFudHNcIjtcblxuXG5cbkBOZ01vZHVsZSh7IGRlY2xhcmF0aW9uczogW1xuICAgICAgICBOZ3hGaGlyVmFsaWRhdG9yQ29tcG9uZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE5neEZoaXJWYWxpZGF0b3JDb21wb25lbnRcbiAgICBdLCBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFxuICAgICAgICBCcm93c2VyTW9kdWxlLFxuICAgICAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICAgICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgICAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBNYXRTaWRlbmF2TW9kdWxlLFxuICAgICAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgICAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICAgICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgICAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gICAgICAgIE1hdFNvcnRNb2R1bGUsXG4gICAgICAgIE1hdFJhZGlvTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcbiAgICAgICAgTWF0U25hY2tCYXJNb2R1bGUsXG4gICAgICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLFxuICAgICAgICBNYXRDaGlwc01vZHVsZSxcbiAgICAgICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIE1hdERpdmlkZXJNb2R1bGVdLCBwcm92aWRlcnM6IFtcbiAgICAgICAgVmFsaWRhdG9yQ29uc3RhbnRzLFxuICAgICAgICBwcm92aWRlSHR0cENsaWVudCh3aXRoSW50ZXJjZXB0b3JzRnJvbURpKCkpXG4gICAgXSB9KVxuZXhwb3J0IGNsYXNzIE5neEZoaXJWYWxpZGF0b3JNb2R1bGUge1xuXG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChzZXJ2ZXJCYXNlVXJsOiBzdHJpbmcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5neEZoaXJWYWxpZGF0b3JNb2R1bGU+e1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4RmhpclZhbGlkYXRvck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogJ3NlcnZlckJhc2VVcmwnLFxuICAgICAgICAgIHVzZVZhbHVlOiBzZXJ2ZXJCYXNlVXJsXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cbn1cbiJdfQ==