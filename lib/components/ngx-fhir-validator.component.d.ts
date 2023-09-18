import { EventEmitter } from '@angular/core';
import { UntypedFormControl } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { FhirValidatorService } from "../services/fhir-validator.service";
import { ValidationResults } from "../modal/validation-results";
import { ApiResponse } from "../modal/api-response";
import { ValidatorInput } from "../modal/validator-input-format";
import 'jspdf-autotable';
import * as i0 from "@angular/core";
export type SubmitButtonAlignment = 'left' | 'right';
export declare class NgxFhirValidatorComponent {
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
    onValidation: EventEmitter<ValidationResults>;
    onApiError: EventEmitter<any>;
    onResourceContentChanged: EventEmitter<any>;
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
    serverTimoutDetected: boolean;
    SERVER_TIMEOUT_INTERVAL: number;
    constructor(fhirValidatorService: FhirValidatorService);
    formatFhirResource(): void;
    lineNumbers(): void;
    getLineNumbers(): string[];
    onFormatInput(): void;
    clearUI(): void;
    onClear(): void;
    onFileSelected(event: any): void;
    validateFhirResource(fhirResource?: any, resourceFormat?: string): void;
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
    generateAutoTablePDF(data: any): Blob;
    onExportToPdf(): void;
    /**
     * Helper function for formatting a date.
     * For more information see https://trymysolution.medium.com/javascript-date-as-in-yyyy-mm-dd-hh-mm-ss-format-or-mm-dd-yyyy-hh-mm-ss-a0c96e8fa888
     * @param date
     * @param dateDiveder
     */
    private toInYyyyMmDdHhMmSs;
    /**
     * Helper function for toInYyyyMmDdHhMmSs function
     * @param num
     * @private
     */
    private padTwoDigits;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxFhirValidatorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxFhirValidatorComponent, "lib-ngx-fhir-validator", never, { "validatorTitle": "validatorTitle"; "validationResultsExpanded": "validationResultsExpanded"; "resultDetailsExpandBtnShown": "resultDetailsExpandBtnShown"; "formatResourceBtnShown": "formatResourceBtnShown"; "clearValidatorBtnShown": "clearValidatorBtnShown"; "submitBtnShown": "submitBtnShown"; "exportResultsButtonShown": "exportResultsButtonShown"; "submitBtnTitle": "submitBtnTitle"; "validationInputFormat": "validationInputFormat"; "maxFileSize": "maxFileSize"; "submitBtnAlignment": "submitBtnAlignment"; "cancelValidationBtnShown": "cancelValidationBtnShown"; "buttonTxtColor": "buttonTxtColor"; "buttonBackgroundColor": "buttonBackgroundColor"; }, { "onValidation": "onValidation"; "onApiError": "onApiError"; "onResourceContentChanged": "onResourceContentChanged"; }, never, never, false, never>;
}
