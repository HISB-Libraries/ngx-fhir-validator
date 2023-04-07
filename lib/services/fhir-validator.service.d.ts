import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import * as i0 from "@angular/core";
export declare class FhirValidatorService {
    private http;
    private _snackBar;
    private prodUri;
    constructor(http: HttpClient, _snackBar: MatSnackBar);
    showErrorMessage(messageStr?: string): void;
    showSuccessMessage(messageStr: string): void;
    closeNotification(): void;
    getUiValidationMessages(fhirResource: any, resourceFormat: string): string;
    isJson(str: any): boolean;
    isXmlString(str: string): boolean;
    beautifyJSON(str: string): string;
    beautifyXML(str: string): string;
    validateFhirResource(fhirResource: any, resourceFormat: string): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FhirValidatorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FhirValidatorService>;
}
