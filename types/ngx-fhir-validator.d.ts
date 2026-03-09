import * as i0 from '@angular/core';
import { OnInit, EventEmitter, ModuleWithProviders } from '@angular/core';
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
    static ɵfac: i0.ɵɵFactoryDeclaration<EnvironmentHandlerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<EnvironmentHandlerService>;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<FhirValidatorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FhirValidatorService>;
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
    validatorTitle: string;
    validationResultsExpanded: boolean;
    resultDetailsExpandBtnShown: boolean;
    formatResourceBtnShown: boolean;
    clearValidatorBtnShown: boolean;
    submitBtnShown: boolean;
    exportResultsButtonShown: boolean;
    submitBtnTitle: string;
    validationInputFormat: ValidatorInput;
    maxFileSize: number;
    submitBtnAlignment: SubmitButtonAlignment;
    cancelValidationBtnShown: boolean;
    buttonTxtColor: string;
    buttonBackgroundColor: string;
    exportValidationResultsBtnName: string;
    onValidation: EventEmitter<ValidationResults>;
    onApiError: EventEmitter<any>;
    onResourceContentChanged: EventEmitter<any>;
    onExportValidationResults: EventEmitter<any>;
    ig: ImplementationGuide;
    inputRef: any;
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
    igList: ImplementationGuide[];
    igNameList: string[];
    igVersionList: string[];
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
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxFhirValidatorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxFhirValidatorComponent, "lib-ngx-fhir-validator", never, { "validatorTitle": { "alias": "validatorTitle"; "required": false; }; "validationResultsExpanded": { "alias": "validationResultsExpanded"; "required": false; }; "resultDetailsExpandBtnShown": { "alias": "resultDetailsExpandBtnShown"; "required": false; }; "formatResourceBtnShown": { "alias": "formatResourceBtnShown"; "required": false; }; "clearValidatorBtnShown": { "alias": "clearValidatorBtnShown"; "required": false; }; "submitBtnShown": { "alias": "submitBtnShown"; "required": false; }; "exportResultsButtonShown": { "alias": "exportResultsButtonShown"; "required": false; }; "submitBtnTitle": { "alias": "submitBtnTitle"; "required": false; }; "validationInputFormat": { "alias": "validationInputFormat"; "required": false; }; "maxFileSize": { "alias": "maxFileSize"; "required": false; }; "submitBtnAlignment": { "alias": "submitBtnAlignment"; "required": false; }; "cancelValidationBtnShown": { "alias": "cancelValidationBtnShown"; "required": false; }; "buttonTxtColor": { "alias": "buttonTxtColor"; "required": false; }; "buttonBackgroundColor": { "alias": "buttonBackgroundColor"; "required": false; }; "exportValidationResultsBtnName": { "alias": "exportValidationResultsBtnName"; "required": false; }; "ig": { "alias": "ig"; "required": false; }; }, { "onValidation": "onValidation"; "onApiError": "onApiError"; "onResourceContentChanged": "onResourceContentChanged"; "onExportValidationResults": "onExportValidationResults"; }, never, never, false, never>;
}

declare class NgxFhirValidatorModule {
    static forRoot(serverBaseUrl: string): ModuleWithProviders<NgxFhirValidatorModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxFhirValidatorModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgxFhirValidatorModule, [typeof NgxFhirValidatorComponent], [typeof i2.CommonModule, typeof i3.BrowserModule, typeof i4.BrowserAnimationsModule, typeof i5.MatFormFieldModule, typeof i6.MatInputModule, typeof i7.MatButtonModule, typeof i8.ReactiveFormsModule, typeof i9.MatIconModule, typeof i10.MatSidenavModule, typeof i11.MatToolbarModule, typeof i12.MatTableModule, typeof i13.MatPaginatorModule, typeof i14.MatProgressSpinnerModule, typeof i15.MatSortModule, typeof i16.MatRadioModule, typeof i8.FormsModule, typeof i17.MatCardModule, typeof i18.MatSnackBarModule, typeof i19.MatSelectModule, typeof i20.MatButtonToggleModule, typeof i21.MatChipsModule, typeof i22.MatCheckboxModule, typeof i23.MatTooltipModule, typeof i24.MatDividerModule], [typeof NgxFhirValidatorComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgxFhirValidatorModule>;
}

export { NgxFhirValidatorComponent, NgxFhirValidatorModule };
export type { ApiResponse, ImplementationGuide, ResponseItem, SubmitButtonAlignment, ValidationResults, ValidatorInput };
