import * as _angular_core from '@angular/core';
import { OnInit, ModuleWithProviders } from '@angular/core';
import * as i8 from '@angular/forms';
import { UntypedFormControl, FormGroup } from '@angular/forms';
import * as i12 from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as i18 from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as i2 from '@angular/common';
import * as i3 from '@angular/platform-browser';
import * as i4 from '@angular/platform-browser/animations';
import * as i5 from '@angular/material/form-field';
import * as i6 from '@angular/material/input';
import * as i7 from '@angular/material/button';
import * as i9 from '@angular/material/icon';
import * as i10 from '@angular/material/sidenav';
import * as i11 from '@angular/material/toolbar';
import * as i13 from '@angular/material/paginator';
import * as i14 from '@angular/material/progress-spinner';
import * as i15 from '@angular/material/sort';
import * as i16 from '@angular/material/radio';
import * as i17 from '@angular/material/card';
import * as i19 from '@angular/material/select';
import * as i20 from '@angular/material/button-toggle';
import * as i21 from '@angular/material/chips';
import * as i22 from '@angular/material/checkbox';
import * as i23 from '@angular/material/tooltip';
import * as i24 from '@angular/material/divider';

declare class EnvironmentHandlerService {
    private serverBaseUrl;
    constructor(serverBaseUrl: any);
    getFhirServerBaseURL(): string;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<EnvironmentHandlerService, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<EnvironmentHandlerService>;
}

interface ImplementationGuide {
    name: string;
    version: string;
    canonicalUrl: string;
}

declare class FhirValidatorService {
    private http;
    private _snackBar;
    private environmentHandler;
    private readonly serverBaseUrl;
    constructor(http: HttpClient, _snackBar: MatSnackBar, environmentHandler: EnvironmentHandlerService);
    showErrorMessage(messageStr?: string): void;
    showSuccessMessage(messageStr: string): void;
    closeNotification(): void;
    getUiValidationMessages(fhirResource: any, resourceFormat: string, selectedIg: ImplementationGuide): string;
    isJson(str: any): boolean;
    isXmlString(str: string): boolean;
    beautifyJSON(str: string): string;
    beautifyXML(str: string): string;
    validateFhirResource(fhirResource: any, resourceFormat: string, ig: string): Observable<any>;
    getIgList(): Observable<Object>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<FhirValidatorService, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<FhirValidatorService>;
}

interface ValidationResults {
    isValid?: boolean | null;
    hasBasicErrors?: boolean;
    infoCount?: number;
    notesCount?: number;
    warningsCount?: number;
    errorsCount?: number;
    resource?: string | null;
}

interface ResponseItem {
    severity: string;
    message: string;
    location: string;
    expanded: boolean;
}

interface ApiResponse {
    formattedResource: string;
    issue: ResponseItem[];
}

interface ValidatorInput {
    format: 'xml' | 'json' | 'xml and json';
    accepts: '.xml' | '.json' | 'text/*,.xml,.json';
}

type SubmitButtonAlignment = 'left' | 'right';
declare class NgxFhirValidatorComponent implements OnInit {
    private fhirValidatorService;
    validatorTitle: _angular_core.InputSignal<string>;
    validationResultsExpanded: _angular_core.InputSignal<boolean>;
    resultDetailsExpandBtnShown: _angular_core.InputSignal<boolean>;
    formatResourceBtnShown: _angular_core.InputSignal<boolean>;
    clearValidatorBtnShown: _angular_core.InputSignal<boolean>;
    submitBtnShown: _angular_core.InputSignal<boolean>;
    exportResultsButtonShown: _angular_core.InputSignal<boolean>;
    submitBtnTitle: _angular_core.InputSignal<string>;
    validationInputFormat: _angular_core.InputSignal<ValidatorInput>;
    maxFileSize: _angular_core.InputSignal<number>;
    submitBtnAlignment: _angular_core.InputSignal<SubmitButtonAlignment>;
    cancelValidationBtnShown: _angular_core.InputSignal<boolean>;
    buttonTxtColor: _angular_core.InputSignal<string>;
    buttonBackgroundColor: _angular_core.InputSignal<string>;
    exportValidationResultsBtnName: _angular_core.InputSignal<string>;
    ig: _angular_core.InputSignal<ImplementationGuide>;
    onValidation: _angular_core.OutputEmitterRef<ValidationResults>;
    onApiError: _angular_core.OutputEmitterRef<any>;
    onResourceContentChanged: _angular_core.OutputEmitterRef<any>;
    onExportValidationResults: _angular_core.OutputEmitterRef<any>;
    inputRef: any;
    resultDetailsExpanded: boolean;
    apiResponse: ApiResponse | null;
    fhirResource: string;
    resourceFormat: string;
    fileName: string;
    validationErrorStr: string;
    hasResponseData: boolean;
    parsedFhirResource: string;
    displayedColumns: string[];
    isLoading: boolean;
    allExpanded: boolean;
    severityLevels: string[];
    severityLevelsFormControl: UntypedFormControl;
    dataSource: MatTableDataSource<any>;
    validationFinished: boolean;
    isValidResource: boolean;
    serverErrorDetected: boolean;
    serverErrorList: any[];
    serverErrorStatus: string;
    lines: number;
    width: number;
    igList: _angular_core.WritableSignal<ImplementationGuide[]>;
    igNameList: _angular_core.Signal<string[]>;
    igVersionList: _angular_core.Signal<string[]>;
    selectedIgName: string;
    selectedIgVersion: string;
    igVersionDropdownList: string[];
    selectedIG: ImplementationGuide;
    serverTimoutDetected: boolean;
    SERVER_TIMEOUT_INTERVAL: number;
    igSelectionFg: FormGroup<{}>;
    constructor(fhirValidatorService: FhirValidatorService);
    ngOnInit(): void;
    getIgList(): void;
    formatFhirResource(): void;
    lineNumbers(): void;
    getLineNumbers(): string[];
    onFormatInput(): void;
    clearUI(): void;
    onClear(): void;
    onFileSelected(event: any): void;
    validateFhirResource(fhirResource: any, resourceFormat: string): void;
    onPasteFhirResource(event: ClipboardEvent): void;
    getLineNumbersBySeverity(apiResponse: ApiResponse | null, severity: string): number[];
    scrollToElement(location: string): void;
    getLineNumberFromLocation(locationStr: string): number;
    onLocationSelected(response: any): void;
    private executeAPIValidation;
    toggle(): void;
    onFilterResults(): void;
    getFilterPredicate(): (row: any, filters: string) => boolean;
    onCancelValidation(): void;
    checkExpandCollapseAllStatus(): void;
    isFilterEnabled(severity: string): boolean;
    getCount(level: any): number;
    onCloseServerErrorMessage(): void;
    private setValidatorResponse;
    clearValidationErrors(): void;
    getLineItemClass(item: string, i: number): "" | "error-mark" | "warning-mark" | "info-mark" | "note-mark";
    exportValidationResults(): void;
    setIgVersionControl(selectedIgName: string, igList: ImplementationGuide[]): void;
    setSelectedIg(selectedIgName: string, selectedIgVersion: string): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NgxFhirValidatorComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NgxFhirValidatorComponent, "lib-ngx-fhir-validator", never, { "validatorTitle": { "alias": "validatorTitle"; "required": false; "isSignal": true; }; "validationResultsExpanded": { "alias": "validationResultsExpanded"; "required": false; "isSignal": true; }; "resultDetailsExpandBtnShown": { "alias": "resultDetailsExpandBtnShown"; "required": false; "isSignal": true; }; "formatResourceBtnShown": { "alias": "formatResourceBtnShown"; "required": false; "isSignal": true; }; "clearValidatorBtnShown": { "alias": "clearValidatorBtnShown"; "required": false; "isSignal": true; }; "submitBtnShown": { "alias": "submitBtnShown"; "required": false; "isSignal": true; }; "exportResultsButtonShown": { "alias": "exportResultsButtonShown"; "required": false; "isSignal": true; }; "submitBtnTitle": { "alias": "submitBtnTitle"; "required": false; "isSignal": true; }; "validationInputFormat": { "alias": "validationInputFormat"; "required": false; "isSignal": true; }; "maxFileSize": { "alias": "maxFileSize"; "required": false; "isSignal": true; }; "submitBtnAlignment": { "alias": "submitBtnAlignment"; "required": false; "isSignal": true; }; "cancelValidationBtnShown": { "alias": "cancelValidationBtnShown"; "required": false; "isSignal": true; }; "buttonTxtColor": { "alias": "buttonTxtColor"; "required": false; "isSignal": true; }; "buttonBackgroundColor": { "alias": "buttonBackgroundColor"; "required": false; "isSignal": true; }; "exportValidationResultsBtnName": { "alias": "exportValidationResultsBtnName"; "required": false; "isSignal": true; }; "ig": { "alias": "ig"; "required": false; "isSignal": true; }; }, { "onValidation": "onValidation"; "onApiError": "onApiError"; "onResourceContentChanged": "onResourceContentChanged"; "onExportValidationResults": "onExportValidationResults"; }, never, never, false, never>;
}

declare class NgxFhirValidatorModule {
    static forRoot(serverBaseUrl: string): ModuleWithProviders<NgxFhirValidatorModule>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NgxFhirValidatorModule, never>;
    static ɵmod: _angular_core.ɵɵNgModuleDeclaration<NgxFhirValidatorModule, [typeof NgxFhirValidatorComponent], [typeof i2.CommonModule, typeof i3.BrowserModule, typeof i4.BrowserAnimationsModule, typeof i5.MatFormFieldModule, typeof i6.MatInputModule, typeof i7.MatButtonModule, typeof i8.ReactiveFormsModule, typeof i9.MatIconModule, typeof i10.MatSidenavModule, typeof i11.MatToolbarModule, typeof i12.MatTableModule, typeof i13.MatPaginatorModule, typeof i14.MatProgressSpinnerModule, typeof i15.MatSortModule, typeof i16.MatRadioModule, typeof i8.FormsModule, typeof i17.MatCardModule, typeof i18.MatSnackBarModule, typeof i19.MatSelectModule, typeof i20.MatButtonToggleModule, typeof i21.MatChipsModule, typeof i22.MatCheckboxModule, typeof i23.MatTooltipModule, typeof i24.MatDividerModule], [typeof NgxFhirValidatorComponent]>;
    static ɵinj: _angular_core.ɵɵInjectorDeclaration<NgxFhirValidatorModule>;
}

export { NgxFhirValidatorComponent, NgxFhirValidatorModule };
export type { ApiResponse, ImplementationGuide, ResponseItem, SubmitButtonAlignment, ValidationResults, ValidatorInput };
