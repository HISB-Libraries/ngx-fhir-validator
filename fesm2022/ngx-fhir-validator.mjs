import * as i0 from '@angular/core';
import { Injectable, Inject, EventEmitter, ElementRef, Component, Input, Output, ViewChild, NgModule } from '@angular/core';
import * as i5 from '@angular/forms';
import { FormGroup, UntypedFormControl, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import * as i7 from '@angular/material/table';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as i1 from '@angular/common/http';
import { HttpHeaders, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { map } from 'rxjs';
import * as i2 from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import * as i2$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i4 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i6 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i8 from '@angular/material/progress-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as i9 from '@angular/material/radio';
import { MatRadioModule } from '@angular/material/radio';
import * as i10 from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import * as i11 from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import * as i12 from '@angular/material/core';
import * as i13 from '@angular/material/button-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import * as i14 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as i15 from '@angular/material/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { BrowserModule } from '@angular/platform-browser';
import { MatDividerModule } from '@angular/material/divider';

//TODO: how are these sorted?
// The profiles can be found here https://build.fhir.org/ig/HL7/fhir-mdi-ig/toc.html
class ValidatorConstants {
    constructor() {
        this.PROFILE_LIST = [
            { name: "Bundle - Document MDI to EDRS", url: "http://hl7.org/fhir/us/mdi/StructureDefinition/Bundle-document-mdi-to-edrs" },
            { name: "Composition - MDI to EDRS", url: "http://hl7.org/fhir/us/mdi/StructureDefinition/Composition-mdi-to-edrs" },
            { name: "List - Cause of Death Pathway", url: "http://hl7.org/fhir/us/mdi/StructureDefinition/List-cause-of-death-pathway" },
            { name: "Observation - Cause of Death Condition", url: "http://hl7.org/fhir/us/mdi/StructureDefinition/List-cause-of-death-pathway" },
            { name: "Observation - Condition Contributing to Death", url: "http://hl7.org/fhir/us/mdi/StructureDefinition/Observation-condition-contributing-to-death" },
            { name: "Observation - Death Date", url: "http://hl7.org/fhir/us/mdi/StructureDefinition/Observation-death-date" },
            { name: "Observation - Death Injury/Event Occurred at Work", url: "http://hl7.org/fhir/us/mdi/StructureDefinition/Observation-death-injury-at-work" },
            { name: "Observation - How Death Injury Occurred", url: "http://hl7.org/fhir/us/mdi/StructureDefinition/Observation-how-death-injury-occurred" },
            { name: "Observation - Manner of Death", url: "http://hl7.org/fhir/us/mdi/StructureDefinition/Observation-manner-of-death" },
            { name: "Observation - Decedent Pregnancy", url: "http://hl7.org/fhir/us/mdi/StructureDefinition/Observation-decedent-pregnancy" },
            { name: "Observation - Tobacco Use Contributed to Death", url: "http://hl7.org/fhir/us/mdi/StructureDefinition/Observation-tobacco-use-contributed-to-death" },
            { name: "Bundle - Message Toxicology to MDI", url: "http://hl7.org/fhir/us/mdi/StructureDefinition/Bundle-message-tox-to-mdi" },
            { name: "MessageHeader - Toxicology to MDI", url: "http://hl7.org/fhir/us/mdi/S∆tructureDefinition/MessageHeader-toxicology-to-mdi" },
            { name: "DiagnosticReport - Toxicology Lab Result to MDI", url: "http://hl7.org/fhir/us/mdi/StructureDefinition/DiagnosticReport-toxicology-to-mdi" },
            { name: "Specimen - Toxicology Lab", url: "http://hl7.org/fhir/us/mdi/StructureDefinition/Specimen-toxicology-lab" },
            { name: "Observation - Toxicology Lab Result", url: "http://hl7.org/fhir/us/mdi/StructureDefinition/Observation-toxicology-lab-result" },
            { name: "Resource Profile: US Core Practitioner Profile", url: "http://hl7.org/fhir/us/core/STU4/StructureDefinition-us-core-practitioner.html#root" },
            { name: "Resource Profile: US Core Patient Profile", url: "https://hl7.org/fhir/us/core/STU4/StructureDefinition-us-core-patient.html#root" },
        ];
    }
    // Validator API link
    static { this.PROD_URI = "https://heat.icl.gtri.org/fhir-validator-service/fhir"; }
    static { this.DISPLAYED_COLUMNS = ['toggle', 'icon', 'severity', 'fhirPath', 'location']; }
    static { this.SEVERITY_LEVELS = ['error', 'warning', 'information', 'note']; }
    static { this.FONT_WIDTH = 7.54; }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.4", ngImport: i0, type: ValidatorConstants, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.4", ngImport: i0, type: ValidatorConstants }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.4", ngImport: i0, type: ValidatorConstants, decorators: [{
            type: Injectable
        }] });

class EnvironmentHandlerService {
    constructor(serverBaseUrl) {
        this.serverBaseUrl = serverBaseUrl;
    }
    getFhirServerBaseURL() {
        let serverBaseUrl = this.serverBaseUrl;
        if (!this.serverBaseUrl.endsWith("/")) {
            serverBaseUrl = serverBaseUrl.concat("/");
        }
        return serverBaseUrl;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.4", ngImport: i0, type: EnvironmentHandlerService, deps: [{ token: 'serverBaseUrl' }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.4", ngImport: i0, type: EnvironmentHandlerService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.4", ngImport: i0, type: EnvironmentHandlerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: ['serverBaseUrl']
                }] }] });

class FhirValidatorService {
    constructor(http, _snackBar, environmentHandler) {
        this.http = http;
        this._snackBar = _snackBar;
        this.environmentHandler = environmentHandler;
        this.serverBaseUrl = this.environmentHandler.getFhirServerBaseURL();
    }
    ;
    showErrorMessage(messageStr = 'Server Error.') {
        this._snackBar.open(messageStr, 'x', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-color'],
            duration: 5000
        });
    }
    showSuccessMessage(messageStr) {
        this._snackBar.open(messageStr, 'x', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['mat-toolbar', 'mat-primary'],
            duration: 3000
        });
    }
    closeNotification() {
        this._snackBar.dismiss();
    }
    getUiValidationMessages(fhirResource, resourceFormat, selectedIg) {
        if (!fhirResource || (!!fhirResource && Object.keys(fhirResource).length === 0)) {
            return "Please enter a FHIR resource for validation.";
        }
        else if (!selectedIg) {
            return "Please select an Implementation Guide";
        }
        else if (resourceFormat === 'json') {
            if (!this.isJson(fhirResource)) {
                // Could not parse the resource at all. It is not a valid JSON as far as the js parser is concerned.
                return "Invalid json format detected.";
            }
            else if (!JSON.parse(fhirResource).resourceType) {
                return "Missing required resourceType property.";
            }
        }
        else if (resourceFormat === 'xml') {
            if (!this.isXmlString(fhirResource)) {
                // Could not parse the resource at all. It is not a valid XML as far as the js parser is concerned.
                return "Invalid xml format detected.";
            }
            else {
                // TODO we may need to to some error handling here
                let fhirResourceXML = new DOMParser().parseFromString(fhirResource, 'text/xml');
                const resourceType = fhirResourceXML.childNodes[0].nodeName;
                const xmlnsAttribute = fhirResourceXML.querySelector(resourceType).getAttribute('xmlns');
                // all FHIR resources should have xmlns="http://hl7.org/fhir"
                if (!xmlnsAttribute || xmlnsAttribute != 'http://hl7.org/fhir') {
                    return "Invalid or missing xmlns attribute.";
                }
            }
        }
        // did not find any obvious errors, so returning nothing
        return '';
    }
    isJson(str) {
        if (typeof str != 'string')
            str = JSON.stringify(str);
        try {
            JSON.parse(str.trim());
        }
        catch (e) {
            return false;
        }
        return true;
    }
    isXmlString(str) {
        try {
            const parser = new DOMParser();
            const theDom = parser.parseFromString(str?.trim(), 'application/xml');
            return !(theDom.getElementsByTagName('parsererror').length > 0);
        }
        catch (e) {
            return false;
        }
    }
    beautifyJSON(str) {
        return JSON.stringify(JSON.parse(str), null, 2);
    }
    // I borrowed some regex code
    beautifyXML(str) {
        let formatted = '', indent = '';
        const tab = '  ';
        str.split(/>\s*</).forEach(function (node) {
            if (node.match(/^\/\w/)) {
                indent = indent.substring(tab.length);
            }
            formatted += indent + '<' + node + '>\r\n';
            if (node.match(/^<?\w[^>]*[^\/]$/)) {
                indent += tab;
            }
        });
        return formatted.substring(1, formatted.length - 3);
    }
    validateFhirResource(fhirResource, resourceFormat, ig) {
        let headers = null;
        let requestData = null;
        // Requests are formed in order to be consumed by the API.
        // Note that requestData is nothing but a wrapper to the request and should never change.
        if (resourceFormat === 'json') {
            requestData = {
                "resourceType": "Parameters",
                "parameter": [
                    {
                        "name": "ig",
                        "valueString": ig
                    },
                    {
                        "name": "resource",
                        "resource": fhirResource,
                    },
                    {
                        "name": "includeFormattedResource",
                        "valueBoolean": true
                    },
                    {
                        "name": "format",
                        "valueString": "application/fhir+json"
                    }
                ]
            };
            headers = new HttpHeaders()
                .set('Content-Type', 'application/fhir+json');
        }
        else if (resourceFormat === 'xml') {
            requestData =
                `<Parameters xmlns="http://hl7.org/fhir">
          <parameter>
            <name value="ig"/>
            <valueString value="${ig}"/>
          </parameter>
          <parameter>
            <name value="format"/>
            <valueString value="application/fhir+xml"/>
          </parameter>
          <parameter>
            <name value="includeFormattedResource"/>
            <valueBoolean value="true"/>
          </parameter>
          <parameter>
            <name value="resource" />
            <resource>
              ${fhirResource}
            </resource>
          </parameter>
      </Parameters>`;
            headers = new HttpHeaders()
                .set('Content-Type', 'application/fhir+xml');
        }
        return this.http.post(this.serverBaseUrl + "$validate", requestData, { headers: headers }).pipe(map((result) => result));
    }
    getIgList() {
        return this.http.get(this.serverBaseUrl + "$packages");
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.4", ngImport: i0, type: FhirValidatorService, deps: [{ token: i1.HttpClient }, { token: i2.MatSnackBar }, { token: EnvironmentHandlerService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.4", ngImport: i0, type: FhirValidatorService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.4", ngImport: i0, type: FhirValidatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }, { type: i2.MatSnackBar }, { type: EnvironmentHandlerService }] });

class NgxFhirValidatorComponent {
    constructor(fhirValidatorService) {
        this.fhirValidatorService = fhirValidatorService;
        this.validatorTitle = '';
        this.validationResultsExpanded = false; // Validation results details initial state
        this.resultDetailsExpandBtnShown = true; // Show/hide Expand Validation Results btn
        this.formatResourceBtnShown = false; // Show/hide Format Resource btn
        this.clearValidatorBtnShown = true; // Show/hide Clear Validator btn
        this.submitBtnShown = true; // Show/hide Submit btn
        this.exportResultsButtonShown = true;
        this.submitBtnTitle = 'Submit'; //The submit button title. "Submit" is generic name and other apps may want to change it
        this.validationInputFormat = { format: 'json', accepts: '.json' };
        this.maxFileSize = 250000; // Max allowed file size is 250KB
        this.submitBtnAlignment = 'right'; // The default location for the Submit btn
        this.cancelValidationBtnShown = true;
        this.buttonTxtColor = 'white';
        this.buttonBackgroundColor = '#4858B8';
        this.exportValidationResultsBtnName = 'Export Results (.zip)';
        this.onValidation = new EventEmitter();
        this.onApiError = new EventEmitter();
        this.onResourceContentChanged = new EventEmitter();
        this.onExportValidationResults = new EventEmitter();
        this.fhirResource = ''; // The Resource.
        this.resourceFormat = 'json'; // The resource format could be JSON or XML, with JSON being the default format.
        this.fileName = ''; // Name of the file uploaded by the user. We need this to render the filename in the UI.
        this.validationErrorStr = ''; // We use this value to store preliminary error messages or a generic error message.
        this.hasResponseData = false; // Indicates if the response generated any messages. If true, we render the report
        this.parsedFhirResource = ''; // We store value of the validator result in order to present it to the user.
        this.isLoading = false;
        this.allExpanded = true; // Used to render collapsed/expanded all icon as well as calculate if all results are expanded/collapsed
        this.severityLevels = ValidatorConstants.SEVERITY_LEVELS;
        this.validationFinished = false;
        this.isValidResource = false; // We use this to render the success message
        this.serverErrorDetected = false; // Tracks if the server has responded with an error (404, 500). Used to render the error in UI.
        this.serverErrorList = []; // Store the data from the OperationOutcome resource
        this.serverErrorStatus = ''; // We store the error response status here (i.e. 404, 500)
        this.lines = 1;
        this.width = 0;
        this.igList = [];
        this.igNameList = [];
        this.igVersionList = [];
        //TODO remove this code when the API returns a timeout error
        this.serverTimoutDetected = false;
        this.SERVER_TIMEOUT_INTERVAL = 240000; //four minutes
        this.igSelectionFg = new FormGroup({});
        this.displayedColumns = ValidatorConstants.DISPLAYED_COLUMNS;
        this.severityLevelsFormControl = new UntypedFormControl(this.severityLevels);
        this.dataSource = new MatTableDataSource();
        this.apiResponse = null;
    }
    ngOnInit() {
        if (this.ig) {
            this.selectedIG = this.ig;
        }
        else {
            this.getIgList();
        }
    }
    getIgList() {
        this.fhirValidatorService.getIgList().subscribe({
            next: (value) => {
                this.igList = value;
                this.igNameList = value.map(el => el.name);
                this.igNameList = [...new Set(this.igNameList)];
                this.igVersionList = value.map(el => el.version);
                this.igSelectionFg.addControl('selectedIgName', new FormControl('', Validators.required));
                this.igSelectionFg.addControl('selectedIgVersion', new FormControl('', Validators.required));
                this.igSelectionFg.controls['selectedIgName'].valueChanges.subscribe({
                    next: value => {
                        this.setIgVersionControl(value, this.igList);
                    }
                });
            },
            error: err => console.error(err)
        });
    }
    formatFhirResource() {
        if (this.fhirResource) {
            if (this.resourceFormat === 'json' && this.fhirValidatorService.isJson(this.fhirResource)) {
                this.fhirResource = this.fhirValidatorService.beautifyJSON(this.fhirResource);
            }
            else if (this.resourceFormat === 'xml' && this.fhirValidatorService.isXmlString(this.fhirResource)) {
                this.fhirResource = this.fhirValidatorService.beautifyXML(this.fhirResource);
            }
        }
        this.lineNumbers();
    }
    lineNumbers() {
        const linedStrings = this.fhirResource.split(/[\n\r]/g);
        this.lines = linedStrings.length;
        this.width = this.inputRef.nativeElement.offsetWidth;
        const charInLines = this.width / ValidatorConstants.FONT_WIDTH;
        for (const line of linedStrings) {
            if (line.length > charInLines) {
                this.lines = this.lines + (line.length / charInLines);
            }
        }
    }
    getLineNumbers() {
        return Array.from({ length: this.lines }, (_, i) => (i + 1).toString());
    }
    // It is important the format is working with "best effort"
    // That is it may or may not format the text properly and require extensive testing to validate its operation.
    onFormatInput() {
        this.formatFhirResource();
        this.fhirValidatorService.showSuccessMessage("Formatting Attempted.");
    }
    clearUI() {
        this.fhirResource = '';
        this.fileName = '';
        this.clearValidationErrors();
        this.onResourceContentChanged.emit(this.fhirResource);
    }
    onClear() {
        this.clearUI();
    }
    onFileSelected(event) {
        const file = event.target.files[0];
        if (file) {
            if (file.size > this.maxFileSize) {
                console.error("File too big");
                this.fhirValidatorService.showErrorMessage("This file exceeds " + this.maxFileSize / 1000 + "kb and cannot be processed");
            }
            else {
                // auto toggle the file type radio buttons
                if (file.type === "text/xml") {
                    this.resourceFormat = 'xml';
                }
                else if (file.type === "application/json") {
                    this.resourceFormat = 'json';
                }
                // set the filename in the UI
                this.fileName = file.name;
                const reader = new FileReader();
                reader.readAsText(file, "UTF-8");
                reader.onload = () => {
                    this.fhirResource = reader.result;
                    this.onResourceContentChanged.emit(this.fhirResource);
                    this.formatFhirResource();
                };
                reader.onerror = () => {
                    this.fhirValidatorService.showErrorMessage("Unable to open the file.");
                };
            }
        }
        else {
            this.fhirValidatorService.showErrorMessage("Unable to open the file.");
        }
    }
    validateFhirResource(fhirResource, resourceFormat) {
        // Set the stage for the validation. Reset variables to default values.
        if (!fhirResource) {
            fhirResource = this.fhirResource;
        }
        if (!resourceFormat) {
            resourceFormat = this.resourceFormat;
        }
        this.igSelectionFg.markAllAsTouched();
        this.igSelectionFg.updateValueAndValidity();
        if (this.igList?.length > 1 && this.igSelectionFg.valid) {
            this.setSelectedIg(this.igSelectionFg.controls['selectedIgName'].value, this.igSelectionFg.controls['selectedIgVersion'].value);
        }
        this.isValidResource = true;
        this.hasResponseData = false;
        this.serverErrorList = [];
        this.serverErrorStatus = '';
        this.serverErrorDetected = false;
        this.serverTimoutDetected = false;
        this.severityLevelsFormControl.patchValue(this.severityLevels);
        this.validationErrorStr = this.fhirValidatorService.getUiValidationMessages(fhirResource, resourceFormat, this.selectedIG);
        if (this.validationErrorStr) {
            //see if we can find any obvious issues with the resource here
            this.isValidResource = false;
            this.validationFinished = true;
            this.onValidation.emit({ hasBasicErrors: true, isValid: false, resource: fhirResource });
        }
        else {
            // The UI validation passed successfully, and we execute the backend validation.
            this.executeAPIValidation(fhirResource, resourceFormat, this.selectedIG?.canonicalUrl);
        }
    }
    onPasteFhirResource(event) {
        this.fileName = '';
        if (!this.fhirResource) {
            this.clearUI();
        }
        let text = event.clipboardData?.getData('text') ?? '';
        if (this.fhirValidatorService.isJson(text)) {
            this.resourceFormat = 'json';
        }
        else if (this.fhirValidatorService.isXmlString(text)) {
            this.resourceFormat = 'xml';
        }
    }
    getLineNumbersBySeverity(apiResponse, severity) {
        if (!apiResponse || apiResponse.issue?.length === 0) {
            return [];
        }
        return apiResponse.issue
            .filter(element => element.severity == severity)
            .filter(element => element.location)
            .map(element => this.getLineNumberFromLocation(element.location[0]) - 1);
    }
    ;
    scrollToElement(location) {
        const element = document.querySelector(location);
        if (element)
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    getLineNumberFromLocation(locationStr) {
        // Get the location from response
        return (locationStr?.length > 0) ? parseInt(locationStr.split(",")[0].replace(/^\D+/g, '')) : 0;
    }
    // When the user selects a location from the errors and warning results, we want to scroll the page to that location.
    onLocationSelected(response) {
        let locationId = ('#mark' + this.getLineNumberFromLocation(response.location[0])).toLowerCase();
        this.scrollToElement(locationId);
    }
    // Sends fhir resource to be validated, renders response
    executeAPIValidation(fhirResource, resourceFormat, ig) {
        // Reset values to default state prior to validation.
        this.isLoading = true;
        this.parsedFhirResource = '';
        this.validationFinished = false;
        this.apiResponse = null;
        if (this.resourceFormat === "json") {
            fhirResource = JSON.parse(fhirResource);
        }
        else if (this.resourceFormat === "xml") {
            let fhirResourceXML = new DOMParser().parseFromString(fhirResource, 'text/xml');
            fhirResource = fhirResourceXML.documentElement.outerHTML;
        }
        this.fhirValidatorService.validateFhirResource(fhirResource, resourceFormat, ig)
            .subscribe({
            next: (response) => {
                this.validationFinished = true;
                let issue = response.issue;
                if (issue.length === 1 && issue[0].severity === "Information" && issue[0]?.message.toLowerCase() === "ALL OK".toLowerCase()) {
                    this.isValidResource = true;
                    this.onValidation.emit({ isValid: true, resource: fhirResource });
                }
                else {
                    this.isValidResource = false;
                    this.validationErrorStr = "Please see the validation errors below.";
                    this.setValidatorResponse(response, fhirResource);
                }
                // Some strings produced by the validator are long and miss spaces. This could break the UI validation report.
                // Therefore, we insert a space after each coma found in the validation response text.
                issue.forEach((element) => {
                    element.diagnostics = element.diagnostics.replace(/,(?=[^\s])/g, ", ");
                });
                // sort by line numbers
                issue = issue.sort((a, b) => {
                    return this.getLineNumberFromLocation(a.location?.[0]) - this.getLineNumberFromLocation(b.location?.[0]);
                });
                // mat each item of the response to an object and make sure that the results are in expanded state in the
                // UI validation report.
                this.dataSource.data = issue.map((element) => {
                    let result = Object.assign({}, element);
                    result.expanded = true;
                    return result;
                });
                this.dataSource.filterPredicate = this.getFilterPredicate();
                this.apiResponse = response;
                this.apiResponse.formattedResource = response?.extension?.[0]?.valueString;
            },
            error: (err) => {
                this.isLoading = false;
                this.serverErrorDetected = true;
                this.serverErrorStatus = err.status;
                if (err?.error?.issue) {
                    this.serverErrorList = err.error.issue;
                }
                this.onApiError.emit(err);
                console.error(err);
            },
            complete: () => {
                this.isLoading = false;
            }
        });
        //TODO make sure to remove this function when the server side timeout is implemented.
        setTimeout(() => {
            if (this.isLoading) {
                this.isLoading = false;
                this.serverTimoutDetected = true;
            }
        }, this.SERVER_TIMEOUT_INTERVAL);
    }
    toggle() {
        this.allExpanded = !this.allExpanded;
        this.dataSource.data.forEach((item) => item.expanded = this.allExpanded);
    }
    onFilterResults() {
        this.dataSource.filter = this.severityLevelsFormControl.value.join(',');
    }
    getFilterPredicate() {
        return function (row, filters) {
            let matchFilter = false;
            const filterArray = filters.split(',');
            filterArray.forEach((filter) => {
                if (row.severity.toLowerCase().indexOf(filter.toLowerCase()) != -1) {
                    matchFilter = true;
                }
            });
            return matchFilter;
        };
    }
    onCancelValidation() {
        this.isLoading = false;
    }
    checkExpandCollapseAllStatus() {
        /*
        * When all elements are collapsed we want to change the expansion icon to render "expand all"
        * When all elements are expanded we want to change the expansion icon to "collapse all"
        * This will save extra unnecessary click for the user
        */
        const expandedElementsCount = this.dataSource.data.filter(element => element['expanded']).length;
        if (expandedElementsCount === this.dataSource.data.length) {
            this.allExpanded = true;
        }
        else if (expandedElementsCount === 0) {
            this.allExpanded = false;
        }
    }
    isFilterEnabled(severity) {
        return !!this.dataSource.data.find((element) => element.severity.toLowerCase() === severity.toLowerCase());
    }
    getCount(level) {
        return this.dataSource.data
            .filter((element) => element.severity.toLowerCase() === level.toLowerCase())
            .length;
    }
    onCloseServerErrorMessage() {
        this.serverErrorDetected = false;
        this.serverErrorList = [];
        this.serverErrorStatus = '';
    }
    setValidatorResponse(apiResponse, resource) {
        const errorsCount = apiResponse.issue.filter((element) => element.severity == 'error')?.length ?? 0;
        const warningsCount = apiResponse.issue.filter((element) => element.severity == 'warning')?.length ?? 0;
        const infoCount = apiResponse.issue.filter((element) => element.severity == 'information')?.length ?? 0;
        const notesCount = apiResponse.issue.filter((element) => element.severity == 'note')?.length ?? 0;
        let validationResult = {};
        validationResult.errorsCount = errorsCount;
        validationResult.warningsCount = warningsCount;
        validationResult.notesCount = notesCount;
        validationResult.infoCount = infoCount;
        validationResult.isValid = errorsCount <= 0;
        validationResult.resource = resource;
        this.onValidation.emit(validationResult);
    }
    clearValidationErrors() {
        this.validationErrorStr = '';
        this.isValidResource = false;
        this.parsedFhirResource = '';
        this.hasResponseData = false;
        this.validationFinished = false;
        this.isLoading = false;
        this.serverErrorDetected = false;
        this.serverErrorList = [];
        this.serverErrorStatus = '';
        this.serverTimoutDetected = false;
        this.apiResponse = null;
    }
    getLineItemClass(item, i) {
        if (this.getLineNumbersBySeverity(this.apiResponse, 'error').indexOf(i) != -1) {
            this.hasResponseData = true;
            return "error-mark";
        }
        else if (this.getLineNumbersBySeverity(this.apiResponse, 'warning').indexOf(i) != -1) {
            this.hasResponseData = true;
            return "warning-mark";
        }
        else if (this.getLineNumbersBySeverity(this.apiResponse, 'information').indexOf(i) != -1) {
            this.hasResponseData = true;
            return "info-mark";
        }
        else if (this.getLineNumbersBySeverity(this.apiResponse, 'note').indexOf(i) != -1) {
            this.hasResponseData = true;
            return "note-mark";
        }
        else
            return '';
    }
    exportValidationResults() {
        // Add the formatted resource form the validator response to a json file
        // This way the line numbers from the validator report will match the json file numbers
        const jsonResource = this?.apiResponse?.formattedResource || '';
        // Create a pdf report
        const resultsData = this.dataSource.data
            .map(element => { return { severity: element.severity, diagnostics: element.diagnostics, location: element.location, fhirPath: element?.expression?.[0] }; })
            .filter(item => this.severityLevelsFormControl.value.indexOf(item.severity) != -1);
        this.onExportValidationResults.emit({ jsonResource: jsonResource, resultsData: resultsData });
    }
    setIgVersionControl(selectedIgName, igList) {
        this.igVersionDropdownList = igList.filter(el => el.name == selectedIgName).map(el => el.version);
        let igVersion = null;
        if (this.igVersionDropdownList?.length == 1) {
            igVersion = this.igVersionDropdownList[0];
        }
        this.igSelectionFg.controls['selectedIgVersion'].patchValue(igVersion);
    }
    setSelectedIg(selectedIgName, selectedIgVersion) {
        this.selectedIG = this.igList.find(el => el.name == selectedIgName && el.version == selectedIgVersion);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.4", ngImport: i0, type: NgxFhirValidatorComponent, deps: [{ token: FhirValidatorService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.0.4", type: NgxFhirValidatorComponent, isStandalone: false, selector: "lib-ngx-fhir-validator", inputs: { validatorTitle: "validatorTitle", validationResultsExpanded: "validationResultsExpanded", resultDetailsExpandBtnShown: "resultDetailsExpandBtnShown", formatResourceBtnShown: "formatResourceBtnShown", clearValidatorBtnShown: "clearValidatorBtnShown", submitBtnShown: "submitBtnShown", exportResultsButtonShown: "exportResultsButtonShown", submitBtnTitle: "submitBtnTitle", validationInputFormat: "validationInputFormat", maxFileSize: "maxFileSize", submitBtnAlignment: "submitBtnAlignment", cancelValidationBtnShown: "cancelValidationBtnShown", buttonTxtColor: "buttonTxtColor", buttonBackgroundColor: "buttonBackgroundColor", exportValidationResultsBtnName: "exportValidationResultsBtnName", ig: "ig" }, outputs: { onValidation: "onValidation", onApiError: "onApiError", onResourceContentChanged: "onResourceContentChanged", onExportValidationResults: "onExportValidationResults" }, viewQueries: [{ propertyName: "inputRef", first: true, predicate: ["validatorInput"], descendants: true, read: ElementRef }], ngImport: i0, template: "@if (isLoading) {\n  <div class=\"spinner-container\">\n    <mat-spinner></mat-spinner>\n  </div>\n}\n\n@if (validatorTitle) {\n  <mat-card-header  id=\"validator-title\">\n    <mat-card-title>{{ validatorTitle }}</mat-card-title>\n  </mat-card-header>\n}\n\n\n<!-- The section below renders error messages returned by the validator.-->\n@if (serverErrorDetected) {\n  <div class=server-error-message-container>\n    <button mat-button class=\"close-button\" color=\"accent\" aria-label=\"Close\" disableRipple\n      (click)=\"onCloseServerErrorMessage()\">\n      <mat-icon>close</mat-icon>\n    </button>\n    <div class=\"server-error-status\"><h2>Server Error Response Status: {{ serverErrorStatus }}</h2></div>\n    @for (serverError of serverErrorList; track serverError) {\n      <div class=\"server-error-message-text\"\n      [innerText]=\"serverError.diagnostics\"></div>\n    }\n  </div>\n}\n\n<!-- TODO remove this code when the API code is updated to return 408 on request timeout -->\n@if (serverTimoutDetected) {\n  <div class=server-error-message-container>\n    <button mat-button class=\"close-button\" color=\"accent\" aria-label=\"Close\" disableRipple\n      (click)=\"serverTimoutDetected = false\">\n      <mat-icon>close</mat-icon>\n    </button>\n    <div class=\"server-error-status\"><h2>Server Timeout Error.</h2></div>\n  </div>\n}\n\n<!--Actions available above the FHIR validator input textarea-->\n<div class=\"row-button-wrapper\">\n\n  <!--Select JSON/XML radio group-->\n  @if (validationInputFormat.format == 'xml and json') {\n    <mat-radio-group [(ngModel)]=\"resourceFormat\" [disabled]=isLoading >\n      <mat-radio-button\n        value=\"json\"\n        [checked]=\"resourceFormat =='json'\"\n        (select)=\"resourceFormat = 'json'\">\n        JSON\n      </mat-radio-button>\n      <mat-radio-button\n        value=\"xml\"\n        [checked]=\"resourceFormat =='xml'\"\n        (select)=\"resourceFormat = 'xml'\">\n        XML\n      </mat-radio-button>\n    </mat-radio-group>\n  }\n\n  @if(igList?.length > 1){\n    <form [formGroup]=\"igSelectionFg\">\n    <mat-form-field appearance=\"outline\" class=\"margin-left-md margin-top-md margin-right-md\">\n      <mat-label>Select IG Name</mat-label>\n      <mat-select formControlName=\"selectedIgName\">\n        @for (igName of igNameList; track igName) {\n          <mat-option [value]=\"igName\">\n            {{ igName }}\n          </mat-option>\n        }\n      </mat-select>\n      @if (igSelectionFg.controls?.['selectedIgName']?.errors?.required) {\n        <mat-error>Select IG Name</mat-error>\n      }\n    </mat-form-field>\n\n    <mat-form-field appearance=\"outline\" class=\"margin-left-md margin-top-md margin-right-md\">\n      <mat-label>Select IG Version</mat-label>\n      <mat-select [disabled]=\"!selectedIgName\" formControlName=\"selectedIgVersion\">\n        @for (igVersion of igVersionDropdownList; track igVersion) {\n          <mat-option [value]=\"igVersion\">\n            {{igVersion}}\n          </mat-option>\n        }\n      </mat-select>\n      @if (igSelectionFg.controls?.['selectedIgVersion']?.errors?.required) {\n        <mat-error>Select IG Version</mat-error>\n      }\n    </mat-form-field>\n    </form>\n  }\n\n  @if (validationInputFormat?.format == 'xml and json') {\n    <span class=\"content-spacer\"></span>\n  }\n\n  <!--File upload widget-->\n  <input type=\"file\" class=\"file-input\" (click)=\"fileUpload.value=null\"\n    [accept]=\"validationInputFormat?.accepts?.toString()\"\n    (change)=\"onFileSelected($event)\" #fileUpload>\n\n  @if (validationInputFormat.format == 'xml and json') {\n    <span class=\"filename\">{{fileName}}</span>\n  }\n\n  <button mat-raised-button [style.background-color]=\"buttonBackgroundColor\" [style.color]=\"buttonTxtColor\"\n    class=\"upload-btn\"\n    (click)=\"clearUI(); fileUpload.click();\" [disabled]=isLoading>\n    <mat-icon>upload</mat-icon>\n    Upload\n  </button>\n\n  @if (!(validationInputFormat.format == 'xml and json')) {\n    <span class=\"filename\">{{fileName}}</span>\n  }\n</div>\n\n<!-- FHIR validator text editor-->\n<div class=\"textarea-wrapper\">\n  <div class=\"line-numbers\" #numbers>\n    @for (i of getLineNumbers(); track i) {\n      <div class=\"numbers\">{{i}}</div>\n    }\n  </div>\n  <textarea\n    #validatorInput\n    rows=\"30\"\n    [(ngModel)]=\"fhirResource\"\n    (ngModelChange)=\"onResourceContentChanged.emit(fhirResource)\"\n    [ngStyle]=\"{'border-color': (!!validationErrorStr && validationErrorStr != 'Please select an Implementation Guide') ? 'red': null }\"\n    (paste)=\"onPasteFhirResource($event)\"\n    [disabled]=\"isLoading\"\n    (input)=\"lineNumbers()\"\n    (scroll)=\"numbers.scrollTop = validatorInput.scrollTop\"\n    >\n  </textarea>\n</div>\n\n<!--Actions available below the FHIR validator input textarea-->\n@if (formatResourceBtnShown || clearValidatorBtnShown || submitBtnShown || validationErrorStr) {\n  <div class=\"row-button-wrapper\">\n    @if (submitBtnShown && (submitBtnAlignment=='left') && !isLoading) {\n      <span>\n        <button mat-raised-button [style.background-color]=\"buttonBackgroundColor\" [style.color]=\"buttonTxtColor\" class=\"button\"\n          (click)=\"validateFhirResource(fhirResource, resourceFormat)\">\n          <mat-icon>send</mat-icon>\n          Submit\n        </button>\n      </span>\n    }\n    @if (formatResourceBtnShown && !isLoading) {\n      <button [ngClass]=\"{'left-margin-spacer': submitBtnAlignment=='left'}\" mat-raised-button\n        [style.background-color]=\"buttonBackgroundColor\" [style.color]=\"buttonTxtColor\"\n        (click)=\"onFormatInput();\"\n        [disabled]=\"!fhirResource\">\n        <mat-icon>code</mat-icon>\n        Format Input\n      </button>\n    }\n    <span class=\"content-spacer\"></span>\n    @if (validationFinished) {\n      <span id=\"error-response\">\n        @if (!!validationErrorStr && !isValidResource) {\n          <span class=\"danger-color\">{{validationErrorStr}}</span>\n        }\n        @if (isValidResource) {\n          <span class=\"success-color\"> This is a valid FHIR resource.</span>\n        }\n      </span>\n    }\n    <span class=\"content-spacer\"></span>\n    @if (clearValidatorBtnShown && !isLoading) {\n      <button\n        mat-raised-button color=\"success\" class=\"button\"\n        (click)=\"onClear()\">\n        <mat-icon>clear</mat-icon>\n        Clear Validator\n      </button>\n    }\n    @if (submitBtnShown && (submitBtnAlignment =='right') && !isLoading) {\n      <span class=\"left-margin-spacer\">\n        <button mat-raised-button color=\"accent\" class=\"button\"\n          (click)=\"validateFhirResource(fhirResource, resourceFormat)\">\n          <mat-icon>send</mat-icon>\n          {{ submitBtnTitle}}\n        </button>\n      </span>\n    }\n  </div>\n}\n\n@if (isLoading && cancelValidationBtnShown) {\n  <div class=\"row-button-wrapper padding-top-md\">\n    <span class=\"content-spacer\"></span>\n    <button mat-raised-button color=\"warn\" (click)=\"onCancelValidation()\">\n      <mat-icon>cancel</mat-icon>\n      Cancel Validation\n    </button>\n  </div>\n}\n\n<!-- Actions available after validator has processed data-->\n\n@if (apiResponse?.issue && !isLoading) {\n  <div>\n    <div class=\"padding-top-md\">\n      <div (click)=\"onFilterResults()\">\n        <mat-button-toggle-group name=\"severity level filter\" [formControl]=\"severityLevelsFormControl\"\n          aria-label=\"severity level filter\" multiple class=\"full-width\">\n          @for (level of severityLevels; track level) {\n            <mat-button-toggle\n              id=\"format-toggle-buttons\"\n              [value]=\"level\"\n              [disabled]=\"!isFilterEnabled(level)\">\n              <!-- In order to synchronise the state of the button with the state of the checkbox, we simply show or hide\n              selected or deselected checkbox.-->\n              @if (severityLevelsFormControl?.value.indexOf(level) != -1) {\n                <mat-checkbox\n                  color=\"primary\"\n                  [checked]=true\n                  [disabled]=\"!isFilterEnabled(level)\"\n                  [disableRipple]=\"true\"\n                  >\n                </mat-checkbox>\n              }\n              @if (severityLevelsFormControl?.value.indexOf(level) === -1) {\n                <mat-checkbox\n                  color=\"primary\"\n                  [checked]=false\n                  [disabled]=\"!isFilterEnabled(level)\"\n                  [disableRipple]=\"true\"\n                  >\n                </mat-checkbox>\n              }\n              {{level | titlecase }} ({{getCount(level)}})\n            </mat-button-toggle>\n          }\n        </mat-button-toggle-group>\n      </div>\n      @if (validationResultsExpanded) {\n        <div class=\"padding-top-md box\">\n          @if (!resultDetailsExpandBtnShown) {\n            <button mat-raised-button color=primary (click)=\"resultDetailsExpandBtnShown = true\">\n              <mat-icon>expand_more</mat-icon> Expand Validation Results\n            </button>\n          }\n          @if (resultDetailsExpandBtnShown) {\n            <button mat-raised-button color=primary (click)=\"resultDetailsExpandBtnShown = false\">\n              <mat-icon>expand_less</mat-icon> Collapse Validation Results\n            </button>\n          }\n          <span class=\"content-spacer\"></span>\n          @if (exportResultsButtonShown) {\n            <button mat-raised-button (click)=\"exportValidationResults()\" color=\"accent\"\n              [disabled]=\"!(dataSource?.data?.length>0)\">\n              <mat-icon>folder_zip</mat-icon>\n              {{exportValidationResultsBtnName}}\n            </button>\n          }\n        </div>\n      }\n      @if (severityLevelsFormControl?.value?.length === 0) {\n        <div>\n          Please select severity level to see the result.\n        </div>\n      }\n      @if ((!validationResultsExpanded) && exportResultsButtonShown) {\n        <div class=\"padding-top-md box margin-bottom-md\">\n          <button mat-raised-button (click)=\"exportValidationResults()\" color=\"accent\"\n            [disabled]=\"!(dataSource?.data?.length>0)\" class=\"margin-left-md\">\n            <mat-icon>folder_zip</mat-icon>\n            {{exportValidationResultsBtnName}}\n          </button>\n        </div>\n      }\n      @if (severityLevelsFormControl?.value?.length > 0 && resultDetailsExpandBtnShown) {\n        <table\n          mat-table [dataSource]=\"dataSource\" multiTemplateDataRows\n          >\n          <!-- First column contains expand/collapse widget. The user can chose to expand/collapse all rows,\n          as well as expand/collapse individual rows. Note that the expand/collapse all can be toggled automatically\n          based the state of the individual expand/collapse rows. For example if all rows are expanded and \"expand all\"\n          is rendered, we automatically hide it end render \"collapse all\" -->\n          <ng-container matColumnDef=\"toggle\">\n            <th mat-header-cell *matHeaderCellDef (click)=\"toggle()\">\n              @if (!allExpanded) {\n                <mat-icon class=\"pointer\" matTooltip=\"Expand All\" aria-label=\"expand all\">\n                  expand_more\n                </mat-icon>\n              }\n              @if (allExpanded) {\n                <mat-icon class=\"pointer\" matTooltip=\"Collapse All\" aria-label=\"collapse all\">\n                  expand_less\n                </mat-icon>\n              }\n            </th>\n            <td mat-cell *matCellDef=\"let validationResultItem\" class=\"pointer\"\n              (click)=\"validationResultItem.expanded = !validationResultItem.expanded; checkExpandCollapseAllStatus()\">\n              @if (!validationResultItem.expanded) {\n                <mat-icon aria-label=\"expand\">\n                  expand_more\n                </mat-icon>\n              }\n              @if (validationResultItem.expanded) {\n                <mat-icon aria-label=\"collapse\">\n                  expand_less\n                </mat-icon>\n              }\n            </td>\n          </ng-container>\n          <!-- Severity level icons -->\n          <ng-container matColumnDef=\"icon\">\n            <th mat-header-cell *matHeaderCellDef></th>\n            <td mat-cell *matCellDef=\"let validationResultItem\">\n              @if (validationResultItem.severity === 'Error') {\n                <mat-icon\n                  class=\"danger-color\">error\n                </mat-icon>\n              }\n              @if (validationResultItem.severity === 'Warning') {\n                <mat-icon\n                  class=\"warning-color\">warning\n                </mat-icon>\n              }\n              @if (validationResultItem.severity === 'Information') {\n                <mat-icon\n                  class=\"success-color\">info\n                </mat-icon>\n              }\n              @if (validationResultItem.severity === 'Note') {\n                <mat-icon\n                  class=\"md-primary-color\">edit_note\n                </mat-icon>\n              }\n            </td>\n          </ng-container>\n          <!-- Severity level string -->\n          <ng-container matColumnDef=\"severity\">\n            <th mat-header-cell *matHeaderCellDef>Severity</th>\n            <td mat-cell *matCellDef=\"let validationResultItem\">\n              {{validationResultItem.severity}}\n            </td>\n          </ng-container>\n          <!-- Severity level string -->\n          <ng-container matColumnDef=\"fhirPath\">\n            <th mat-header-cell *matHeaderCellDef>FHIR path</th>\n            <td mat-cell *matCellDef=\"let validationResultItem\">\n              {{validationResultItem?.expression?.[0]}}\n            </td>\n          </ng-container>\n          <!-- The location as returned by the server. Note that the resource returned by the  response could be\n          formatted differently then the request resource. What this means is the the line numbers in the response\n          resource many not match those in the request.-->\n          <ng-container matColumnDef=\"location\">\n            <th mat-header-cell *matHeaderCellDef id=\"location-column-header\"> Location</th>\n            <td mat-cell *matCellDef=\"let validationResultItem\" (click)=\"onLocationSelected(validationResultItem)\">\n              <span class=\"location-data\"> {{validationResultItem.location}}</span>\n            </td>\n          </ng-container>\n          <!-- Expanded Content Column - The detail row is made up of this one column that spans across all columns -->\n          <ng-container matColumnDef=\"expandedDetail\">\n            <td mat-cell *matCellDef=\"let validationResultItem\" [attr.colspan]=\"displayedColumns?.length\">\n              <div class=\"validation-result-detail\"\n                [@detailExpand]=\"validationResultItem.expanded ? 'expanded' : 'collapsed'\">\n                <div class=\"validation-result-text-value\">\n                  {{validationResultItem.diagnostics}}\n                </div>\n              </div>\n            </td>\n          </ng-container>\n          <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n          <tr mat-row *matRowDef=\"let validationResultItem; columns: displayedColumns;\"\n            class=\"table-row\"\n            [class.expanded-row]=\"validationResultItem.expanded\">\n            <tr mat-row *matRowDef=\"let row; columns: ['expandedDetail']\" class=\"text-value-row\"></tr>\n          </table>\n        }\n      </div>\n      <!-- Resource as returned from the validator. Note that the resource returned from the validator may be\n      formatted differently then the resource we sent to the validator. -->\n      @if (resultDetailsExpandBtnShown && apiResponse?.formattedResource) {\n        <div class=\"padding-top-md\">\n          <div class=\"line-numbers-response\" #numbers>\n            @for (item of apiResponse?.formattedResource?.split('\\n'); track item; let i = $index) {\n              <div class=\"numbers-response\">{{i + 1}}</div>\n            }\n          </div>\n          <div class=\"validator-response\">\n            @for (item of apiResponse?.formattedResource?.split('\\n'); track item; let i = $index) {\n              <span>\n                <pre [ngClass]=\"getLineItemClass(item, i)\" class=\"line-item\" [id]=\"'mark'+ (i+1)\">{{item}}</pre>\n              </span>\n            }\n          </div>\n        </div>\n      }\n    </div>\n  }\n", styles: [".margin-sm{margin:8px}.margin-md{margin:16px}.margin-lg{margin:24px}.padding-xs{padding:4px}.padding-sm{padding:8px}.padding-md{padding:16px}.padding-lg{padding:24px}.margin-bottom-xs{margin-bottom:4px}.margin-bottom-sm{margin-bottom:8px}.margin-bottom-md{margin-bottom:16px}.margin-top-xs{margin-top:4px}.margin-top-sm{margin-top:8px}.margin-top-md{margin-top:16px}.margin-left-md{margin-left:16px}.margin-right-md{margin-right:16px}.padding-top-md{padding-top:16px}.padding-bottom-md{padding-bottom:16px}.padding-left-md{padding-left:16px}.padding-right-md{padding-right:16px}.border-radius-xs{border-radius:4px}textarea{display:inline-block;border-color:#ccc;font-size:13px;line-height:16px;width:95%;padding-left:36px;height:50vh;white-space:nowrap;resize:none}.textarea-wrapper{margin-top:10px}.line-numbers{display:inline-block;position:absolute;text-align:-webkit-center;font-family:monospace;width:36px;line-height:16px;padding-top:3px;height:50.2vh;overflow:hidden;background:#0000001a;border-radius:3px}.box{display:flex}.line-numbers-response{display:inline-block;position:absolute;text-align:-webkit-center;font-family:monospace;width:36px;line-height:16px;overflow:hidden;background:#e8e8e8;border-radius:3px}.numbers{font-size:13px}.validator-response{font-size:13px;line-height:16px;margin-left:36px;width:96%;font-family:monospace;background-color:#f8f8f8;overflow-x:scroll}.mat-radio-button{margin-right:16px;margin-bottom:10px}.file-input{display:none}.close-icon{float:right;color:#5f6368}#spaced-content{display:flex;flex-flow:row wrap}pre{white-space:pre-wrap}td.mat-cell{font-size:13px;font-family:monospace}.location-data{cursor:pointer;color:#3f51b5}.spinner-container{position:absolute;height:100px;width:100px;top:40%;left:50%;margin-left:-50px;margin-top:-50px}td,th{white-space:normal;word-wrap:break-word}#location-column-header{min-width:200px}#severity-column-header{min-width:300px}.left-margin-spacer{margin-left:16px}#error-response{font-size:large;font-weight:700}#validator-title{padding-left:0}table{width:100%}tr.text-value-row{height:0}.validation-result-row td{border-bottom-width:0}.validation-result-detail{overflow:hidden;display:flex}.validation-result-text-value{padding:16px}.expanded-row{background-color:#fafaff}.table-row{font-weight:700}.mat-button-toggle-checked{color:#303f9f;background-color:#e8eaf6;border:1px solid #7986cb}.row-button-wrapper{display:flex;align-items:center}mat-button-toggle{font-weight:700}.mat-button-toggle-disabled{background-color:#f5f5f5;color:#252525;border:1px solid whitesmoke}.mat-column-toggle,.mat-column-icon{width:5%!important}.mat-column-severity{width:10%!important}.mat-column-fhirPath{width:70%!important}.mat-column-location{width:10%!important}.close-button{float:right;right:-8px}.server-error-message-container{border-style:solid;border-width:1px;margin-top:16px;margin-bottom:16px;border-color:#d32f2f}.server-error-status{color:#d32f2f;margin-left:1em;margin-top:1em}.server-error-message-text{margin-left:16px;margin-bottom:16px;font-family:monospace}.filename{font-family:monospace;margin:0 16px}#format-toggle-buttons{width:25%}.content-spacer{flex:1 1 auto}.full-width{width:100%}.warning-mark{background-color:#fff2cc}.error-mark{background-color:#fcc}.info-mark{background-color:#dcedc8}.note-mark{background-color:#e3f2fd}.success-color{color:#28a745}.danger-color{color:#dc3549}.warning-color{color:#ffc107}.line-item{margin:0;white-space:pre}.right-aligned{display:flex;flex-direction:column;align-items:flex-end}\n"], dependencies: [{ kind: "directive", type: i2$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2$1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i3.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i3.MatLabel, selector: "mat-label" }, { kind: "directive", type: i3.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "component", type: i4.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "directive", type: i5.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i5.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i5.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i5.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i6.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i7.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { kind: "directive", type: i7.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { kind: "directive", type: i7.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { kind: "directive", type: i7.MatColumnDef, selector: "[matColumnDef]", inputs: ["matColumnDef"] }, { kind: "directive", type: i7.MatCellDef, selector: "[matCellDef]" }, { kind: "directive", type: i7.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }, { kind: "directive", type: i7.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { kind: "directive", type: i7.MatCell, selector: "mat-cell, td[mat-cell]" }, { kind: "component", type: i7.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { kind: "component", type: i7.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }, { kind: "component", type: i8.MatProgressSpinner, selector: "mat-progress-spinner, mat-spinner", inputs: ["color", "mode", "value", "diameter", "strokeWidth"], exportAs: ["matProgressSpinner"] }, { kind: "directive", type: i9.MatRadioGroup, selector: "mat-radio-group", inputs: ["color", "name", "labelPosition", "value", "selected", "disabled", "required", "disabledInteractive"], outputs: ["change"], exportAs: ["matRadioGroup"] }, { kind: "component", type: i9.MatRadioButton, selector: "mat-radio-button", inputs: ["id", "name", "aria-label", "aria-labelledby", "aria-describedby", "disableRipple", "tabIndex", "checked", "value", "labelPosition", "disabled", "required", "color", "disabledInteractive"], outputs: ["change"], exportAs: ["matRadioButton"] }, { kind: "directive", type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i10.MatCardHeader, selector: "mat-card-header" }, { kind: "directive", type: i10.MatCardTitle, selector: "mat-card-title, [mat-card-title], [matCardTitle]" }, { kind: "component", type: i11.MatSelect, selector: "mat-select", inputs: ["aria-describedby", "panelClass", "disabled", "disableRipple", "tabIndex", "hideSingleSelectionIndicator", "placeholder", "required", "multiple", "disableOptionCentering", "compareWith", "value", "aria-label", "aria-labelledby", "errorStateMatcher", "typeaheadDebounceInterval", "sortComparator", "id", "panelWidth", "canSelectNullableOptions"], outputs: ["openedChange", "opened", "closed", "selectionChange", "valueChange"], exportAs: ["matSelect"] }, { kind: "component", type: i12.MatOption, selector: "mat-option", inputs: ["value", "id", "disabled"], outputs: ["onSelectionChange"], exportAs: ["matOption"] }, { kind: "directive", type: i13.MatButtonToggleGroup, selector: "mat-button-toggle-group", inputs: ["appearance", "name", "vertical", "value", "multiple", "disabled", "disabledInteractive", "hideSingleSelectionIndicator", "hideMultipleSelectionIndicator"], outputs: ["valueChange", "change"], exportAs: ["matButtonToggleGroup"] }, { kind: "component", type: i13.MatButtonToggle, selector: "mat-button-toggle", inputs: ["aria-label", "aria-labelledby", "id", "name", "value", "tabIndex", "disableRipple", "appearance", "checked", "disabled", "disabledInteractive"], outputs: ["change"], exportAs: ["matButtonToggle"] }, { kind: "component", type: i14.MatCheckbox, selector: "mat-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "aria-expanded", "aria-controls", "aria-owns", "id", "required", "labelPosition", "name", "value", "disableRipple", "tabIndex", "color", "disabledInteractive", "checked", "disabled", "indeterminate"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }, { kind: "directive", type: i15.MatTooltip, selector: "[matTooltip]", inputs: ["matTooltipPosition", "matTooltipPositionAtOrigin", "matTooltipDisabled", "matTooltipShowDelay", "matTooltipHideDelay", "matTooltipTouchGestures", "matTooltip", "matTooltipClass"], exportAs: ["matTooltip"] }, { kind: "pipe", type: i2$1.TitleCasePipe, name: "titlecase" }], animations: [
            trigger('detailExpand', [
                state('collapsed', style({ height: '0px', minHeight: '0' })),
                state('expanded', style({ height: '*' })),
                transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            ]),
        ] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.4", ngImport: i0, type: NgxFhirValidatorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-ngx-fhir-validator', animations: [
                        trigger('detailExpand', [
                            state('collapsed', style({ height: '0px', minHeight: '0' })),
                            state('expanded', style({ height: '*' })),
                            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                        ]),
                    ], standalone: false, template: "@if (isLoading) {\n  <div class=\"spinner-container\">\n    <mat-spinner></mat-spinner>\n  </div>\n}\n\n@if (validatorTitle) {\n  <mat-card-header  id=\"validator-title\">\n    <mat-card-title>{{ validatorTitle }}</mat-card-title>\n  </mat-card-header>\n}\n\n\n<!-- The section below renders error messages returned by the validator.-->\n@if (serverErrorDetected) {\n  <div class=server-error-message-container>\n    <button mat-button class=\"close-button\" color=\"accent\" aria-label=\"Close\" disableRipple\n      (click)=\"onCloseServerErrorMessage()\">\n      <mat-icon>close</mat-icon>\n    </button>\n    <div class=\"server-error-status\"><h2>Server Error Response Status: {{ serverErrorStatus }}</h2></div>\n    @for (serverError of serverErrorList; track serverError) {\n      <div class=\"server-error-message-text\"\n      [innerText]=\"serverError.diagnostics\"></div>\n    }\n  </div>\n}\n\n<!-- TODO remove this code when the API code is updated to return 408 on request timeout -->\n@if (serverTimoutDetected) {\n  <div class=server-error-message-container>\n    <button mat-button class=\"close-button\" color=\"accent\" aria-label=\"Close\" disableRipple\n      (click)=\"serverTimoutDetected = false\">\n      <mat-icon>close</mat-icon>\n    </button>\n    <div class=\"server-error-status\"><h2>Server Timeout Error.</h2></div>\n  </div>\n}\n\n<!--Actions available above the FHIR validator input textarea-->\n<div class=\"row-button-wrapper\">\n\n  <!--Select JSON/XML radio group-->\n  @if (validationInputFormat.format == 'xml and json') {\n    <mat-radio-group [(ngModel)]=\"resourceFormat\" [disabled]=isLoading >\n      <mat-radio-button\n        value=\"json\"\n        [checked]=\"resourceFormat =='json'\"\n        (select)=\"resourceFormat = 'json'\">\n        JSON\n      </mat-radio-button>\n      <mat-radio-button\n        value=\"xml\"\n        [checked]=\"resourceFormat =='xml'\"\n        (select)=\"resourceFormat = 'xml'\">\n        XML\n      </mat-radio-button>\n    </mat-radio-group>\n  }\n\n  @if(igList?.length > 1){\n    <form [formGroup]=\"igSelectionFg\">\n    <mat-form-field appearance=\"outline\" class=\"margin-left-md margin-top-md margin-right-md\">\n      <mat-label>Select IG Name</mat-label>\n      <mat-select formControlName=\"selectedIgName\">\n        @for (igName of igNameList; track igName) {\n          <mat-option [value]=\"igName\">\n            {{ igName }}\n          </mat-option>\n        }\n      </mat-select>\n      @if (igSelectionFg.controls?.['selectedIgName']?.errors?.required) {\n        <mat-error>Select IG Name</mat-error>\n      }\n    </mat-form-field>\n\n    <mat-form-field appearance=\"outline\" class=\"margin-left-md margin-top-md margin-right-md\">\n      <mat-label>Select IG Version</mat-label>\n      <mat-select [disabled]=\"!selectedIgName\" formControlName=\"selectedIgVersion\">\n        @for (igVersion of igVersionDropdownList; track igVersion) {\n          <mat-option [value]=\"igVersion\">\n            {{igVersion}}\n          </mat-option>\n        }\n      </mat-select>\n      @if (igSelectionFg.controls?.['selectedIgVersion']?.errors?.required) {\n        <mat-error>Select IG Version</mat-error>\n      }\n    </mat-form-field>\n    </form>\n  }\n\n  @if (validationInputFormat?.format == 'xml and json') {\n    <span class=\"content-spacer\"></span>\n  }\n\n  <!--File upload widget-->\n  <input type=\"file\" class=\"file-input\" (click)=\"fileUpload.value=null\"\n    [accept]=\"validationInputFormat?.accepts?.toString()\"\n    (change)=\"onFileSelected($event)\" #fileUpload>\n\n  @if (validationInputFormat.format == 'xml and json') {\n    <span class=\"filename\">{{fileName}}</span>\n  }\n\n  <button mat-raised-button [style.background-color]=\"buttonBackgroundColor\" [style.color]=\"buttonTxtColor\"\n    class=\"upload-btn\"\n    (click)=\"clearUI(); fileUpload.click();\" [disabled]=isLoading>\n    <mat-icon>upload</mat-icon>\n    Upload\n  </button>\n\n  @if (!(validationInputFormat.format == 'xml and json')) {\n    <span class=\"filename\">{{fileName}}</span>\n  }\n</div>\n\n<!-- FHIR validator text editor-->\n<div class=\"textarea-wrapper\">\n  <div class=\"line-numbers\" #numbers>\n    @for (i of getLineNumbers(); track i) {\n      <div class=\"numbers\">{{i}}</div>\n    }\n  </div>\n  <textarea\n    #validatorInput\n    rows=\"30\"\n    [(ngModel)]=\"fhirResource\"\n    (ngModelChange)=\"onResourceContentChanged.emit(fhirResource)\"\n    [ngStyle]=\"{'border-color': (!!validationErrorStr && validationErrorStr != 'Please select an Implementation Guide') ? 'red': null }\"\n    (paste)=\"onPasteFhirResource($event)\"\n    [disabled]=\"isLoading\"\n    (input)=\"lineNumbers()\"\n    (scroll)=\"numbers.scrollTop = validatorInput.scrollTop\"\n    >\n  </textarea>\n</div>\n\n<!--Actions available below the FHIR validator input textarea-->\n@if (formatResourceBtnShown || clearValidatorBtnShown || submitBtnShown || validationErrorStr) {\n  <div class=\"row-button-wrapper\">\n    @if (submitBtnShown && (submitBtnAlignment=='left') && !isLoading) {\n      <span>\n        <button mat-raised-button [style.background-color]=\"buttonBackgroundColor\" [style.color]=\"buttonTxtColor\" class=\"button\"\n          (click)=\"validateFhirResource(fhirResource, resourceFormat)\">\n          <mat-icon>send</mat-icon>\n          Submit\n        </button>\n      </span>\n    }\n    @if (formatResourceBtnShown && !isLoading) {\n      <button [ngClass]=\"{'left-margin-spacer': submitBtnAlignment=='left'}\" mat-raised-button\n        [style.background-color]=\"buttonBackgroundColor\" [style.color]=\"buttonTxtColor\"\n        (click)=\"onFormatInput();\"\n        [disabled]=\"!fhirResource\">\n        <mat-icon>code</mat-icon>\n        Format Input\n      </button>\n    }\n    <span class=\"content-spacer\"></span>\n    @if (validationFinished) {\n      <span id=\"error-response\">\n        @if (!!validationErrorStr && !isValidResource) {\n          <span class=\"danger-color\">{{validationErrorStr}}</span>\n        }\n        @if (isValidResource) {\n          <span class=\"success-color\"> This is a valid FHIR resource.</span>\n        }\n      </span>\n    }\n    <span class=\"content-spacer\"></span>\n    @if (clearValidatorBtnShown && !isLoading) {\n      <button\n        mat-raised-button color=\"success\" class=\"button\"\n        (click)=\"onClear()\">\n        <mat-icon>clear</mat-icon>\n        Clear Validator\n      </button>\n    }\n    @if (submitBtnShown && (submitBtnAlignment =='right') && !isLoading) {\n      <span class=\"left-margin-spacer\">\n        <button mat-raised-button color=\"accent\" class=\"button\"\n          (click)=\"validateFhirResource(fhirResource, resourceFormat)\">\n          <mat-icon>send</mat-icon>\n          {{ submitBtnTitle}}\n        </button>\n      </span>\n    }\n  </div>\n}\n\n@if (isLoading && cancelValidationBtnShown) {\n  <div class=\"row-button-wrapper padding-top-md\">\n    <span class=\"content-spacer\"></span>\n    <button mat-raised-button color=\"warn\" (click)=\"onCancelValidation()\">\n      <mat-icon>cancel</mat-icon>\n      Cancel Validation\n    </button>\n  </div>\n}\n\n<!-- Actions available after validator has processed data-->\n\n@if (apiResponse?.issue && !isLoading) {\n  <div>\n    <div class=\"padding-top-md\">\n      <div (click)=\"onFilterResults()\">\n        <mat-button-toggle-group name=\"severity level filter\" [formControl]=\"severityLevelsFormControl\"\n          aria-label=\"severity level filter\" multiple class=\"full-width\">\n          @for (level of severityLevels; track level) {\n            <mat-button-toggle\n              id=\"format-toggle-buttons\"\n              [value]=\"level\"\n              [disabled]=\"!isFilterEnabled(level)\">\n              <!-- In order to synchronise the state of the button with the state of the checkbox, we simply show or hide\n              selected or deselected checkbox.-->\n              @if (severityLevelsFormControl?.value.indexOf(level) != -1) {\n                <mat-checkbox\n                  color=\"primary\"\n                  [checked]=true\n                  [disabled]=\"!isFilterEnabled(level)\"\n                  [disableRipple]=\"true\"\n                  >\n                </mat-checkbox>\n              }\n              @if (severityLevelsFormControl?.value.indexOf(level) === -1) {\n                <mat-checkbox\n                  color=\"primary\"\n                  [checked]=false\n                  [disabled]=\"!isFilterEnabled(level)\"\n                  [disableRipple]=\"true\"\n                  >\n                </mat-checkbox>\n              }\n              {{level | titlecase }} ({{getCount(level)}})\n            </mat-button-toggle>\n          }\n        </mat-button-toggle-group>\n      </div>\n      @if (validationResultsExpanded) {\n        <div class=\"padding-top-md box\">\n          @if (!resultDetailsExpandBtnShown) {\n            <button mat-raised-button color=primary (click)=\"resultDetailsExpandBtnShown = true\">\n              <mat-icon>expand_more</mat-icon> Expand Validation Results\n            </button>\n          }\n          @if (resultDetailsExpandBtnShown) {\n            <button mat-raised-button color=primary (click)=\"resultDetailsExpandBtnShown = false\">\n              <mat-icon>expand_less</mat-icon> Collapse Validation Results\n            </button>\n          }\n          <span class=\"content-spacer\"></span>\n          @if (exportResultsButtonShown) {\n            <button mat-raised-button (click)=\"exportValidationResults()\" color=\"accent\"\n              [disabled]=\"!(dataSource?.data?.length>0)\">\n              <mat-icon>folder_zip</mat-icon>\n              {{exportValidationResultsBtnName}}\n            </button>\n          }\n        </div>\n      }\n      @if (severityLevelsFormControl?.value?.length === 0) {\n        <div>\n          Please select severity level to see the result.\n        </div>\n      }\n      @if ((!validationResultsExpanded) && exportResultsButtonShown) {\n        <div class=\"padding-top-md box margin-bottom-md\">\n          <button mat-raised-button (click)=\"exportValidationResults()\" color=\"accent\"\n            [disabled]=\"!(dataSource?.data?.length>0)\" class=\"margin-left-md\">\n            <mat-icon>folder_zip</mat-icon>\n            {{exportValidationResultsBtnName}}\n          </button>\n        </div>\n      }\n      @if (severityLevelsFormControl?.value?.length > 0 && resultDetailsExpandBtnShown) {\n        <table\n          mat-table [dataSource]=\"dataSource\" multiTemplateDataRows\n          >\n          <!-- First column contains expand/collapse widget. The user can chose to expand/collapse all rows,\n          as well as expand/collapse individual rows. Note that the expand/collapse all can be toggled automatically\n          based the state of the individual expand/collapse rows. For example if all rows are expanded and \"expand all\"\n          is rendered, we automatically hide it end render \"collapse all\" -->\n          <ng-container matColumnDef=\"toggle\">\n            <th mat-header-cell *matHeaderCellDef (click)=\"toggle()\">\n              @if (!allExpanded) {\n                <mat-icon class=\"pointer\" matTooltip=\"Expand All\" aria-label=\"expand all\">\n                  expand_more\n                </mat-icon>\n              }\n              @if (allExpanded) {\n                <mat-icon class=\"pointer\" matTooltip=\"Collapse All\" aria-label=\"collapse all\">\n                  expand_less\n                </mat-icon>\n              }\n            </th>\n            <td mat-cell *matCellDef=\"let validationResultItem\" class=\"pointer\"\n              (click)=\"validationResultItem.expanded = !validationResultItem.expanded; checkExpandCollapseAllStatus()\">\n              @if (!validationResultItem.expanded) {\n                <mat-icon aria-label=\"expand\">\n                  expand_more\n                </mat-icon>\n              }\n              @if (validationResultItem.expanded) {\n                <mat-icon aria-label=\"collapse\">\n                  expand_less\n                </mat-icon>\n              }\n            </td>\n          </ng-container>\n          <!-- Severity level icons -->\n          <ng-container matColumnDef=\"icon\">\n            <th mat-header-cell *matHeaderCellDef></th>\n            <td mat-cell *matCellDef=\"let validationResultItem\">\n              @if (validationResultItem.severity === 'Error') {\n                <mat-icon\n                  class=\"danger-color\">error\n                </mat-icon>\n              }\n              @if (validationResultItem.severity === 'Warning') {\n                <mat-icon\n                  class=\"warning-color\">warning\n                </mat-icon>\n              }\n              @if (validationResultItem.severity === 'Information') {\n                <mat-icon\n                  class=\"success-color\">info\n                </mat-icon>\n              }\n              @if (validationResultItem.severity === 'Note') {\n                <mat-icon\n                  class=\"md-primary-color\">edit_note\n                </mat-icon>\n              }\n            </td>\n          </ng-container>\n          <!-- Severity level string -->\n          <ng-container matColumnDef=\"severity\">\n            <th mat-header-cell *matHeaderCellDef>Severity</th>\n            <td mat-cell *matCellDef=\"let validationResultItem\">\n              {{validationResultItem.severity}}\n            </td>\n          </ng-container>\n          <!-- Severity level string -->\n          <ng-container matColumnDef=\"fhirPath\">\n            <th mat-header-cell *matHeaderCellDef>FHIR path</th>\n            <td mat-cell *matCellDef=\"let validationResultItem\">\n              {{validationResultItem?.expression?.[0]}}\n            </td>\n          </ng-container>\n          <!-- The location as returned by the server. Note that the resource returned by the  response could be\n          formatted differently then the request resource. What this means is the the line numbers in the response\n          resource many not match those in the request.-->\n          <ng-container matColumnDef=\"location\">\n            <th mat-header-cell *matHeaderCellDef id=\"location-column-header\"> Location</th>\n            <td mat-cell *matCellDef=\"let validationResultItem\" (click)=\"onLocationSelected(validationResultItem)\">\n              <span class=\"location-data\"> {{validationResultItem.location}}</span>\n            </td>\n          </ng-container>\n          <!-- Expanded Content Column - The detail row is made up of this one column that spans across all columns -->\n          <ng-container matColumnDef=\"expandedDetail\">\n            <td mat-cell *matCellDef=\"let validationResultItem\" [attr.colspan]=\"displayedColumns?.length\">\n              <div class=\"validation-result-detail\"\n                [@detailExpand]=\"validationResultItem.expanded ? 'expanded' : 'collapsed'\">\n                <div class=\"validation-result-text-value\">\n                  {{validationResultItem.diagnostics}}\n                </div>\n              </div>\n            </td>\n          </ng-container>\n          <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n          <tr mat-row *matRowDef=\"let validationResultItem; columns: displayedColumns;\"\n            class=\"table-row\"\n            [class.expanded-row]=\"validationResultItem.expanded\">\n            <tr mat-row *matRowDef=\"let row; columns: ['expandedDetail']\" class=\"text-value-row\"></tr>\n          </table>\n        }\n      </div>\n      <!-- Resource as returned from the validator. Note that the resource returned from the validator may be\n      formatted differently then the resource we sent to the validator. -->\n      @if (resultDetailsExpandBtnShown && apiResponse?.formattedResource) {\n        <div class=\"padding-top-md\">\n          <div class=\"line-numbers-response\" #numbers>\n            @for (item of apiResponse?.formattedResource?.split('\\n'); track item; let i = $index) {\n              <div class=\"numbers-response\">{{i + 1}}</div>\n            }\n          </div>\n          <div class=\"validator-response\">\n            @for (item of apiResponse?.formattedResource?.split('\\n'); track item; let i = $index) {\n              <span>\n                <pre [ngClass]=\"getLineItemClass(item, i)\" class=\"line-item\" [id]=\"'mark'+ (i+1)\">{{item}}</pre>\n              </span>\n            }\n          </div>\n        </div>\n      }\n    </div>\n  }\n", styles: [".margin-sm{margin:8px}.margin-md{margin:16px}.margin-lg{margin:24px}.padding-xs{padding:4px}.padding-sm{padding:8px}.padding-md{padding:16px}.padding-lg{padding:24px}.margin-bottom-xs{margin-bottom:4px}.margin-bottom-sm{margin-bottom:8px}.margin-bottom-md{margin-bottom:16px}.margin-top-xs{margin-top:4px}.margin-top-sm{margin-top:8px}.margin-top-md{margin-top:16px}.margin-left-md{margin-left:16px}.margin-right-md{margin-right:16px}.padding-top-md{padding-top:16px}.padding-bottom-md{padding-bottom:16px}.padding-left-md{padding-left:16px}.padding-right-md{padding-right:16px}.border-radius-xs{border-radius:4px}textarea{display:inline-block;border-color:#ccc;font-size:13px;line-height:16px;width:95%;padding-left:36px;height:50vh;white-space:nowrap;resize:none}.textarea-wrapper{margin-top:10px}.line-numbers{display:inline-block;position:absolute;text-align:-webkit-center;font-family:monospace;width:36px;line-height:16px;padding-top:3px;height:50.2vh;overflow:hidden;background:#0000001a;border-radius:3px}.box{display:flex}.line-numbers-response{display:inline-block;position:absolute;text-align:-webkit-center;font-family:monospace;width:36px;line-height:16px;overflow:hidden;background:#e8e8e8;border-radius:3px}.numbers{font-size:13px}.validator-response{font-size:13px;line-height:16px;margin-left:36px;width:96%;font-family:monospace;background-color:#f8f8f8;overflow-x:scroll}.mat-radio-button{margin-right:16px;margin-bottom:10px}.file-input{display:none}.close-icon{float:right;color:#5f6368}#spaced-content{display:flex;flex-flow:row wrap}pre{white-space:pre-wrap}td.mat-cell{font-size:13px;font-family:monospace}.location-data{cursor:pointer;color:#3f51b5}.spinner-container{position:absolute;height:100px;width:100px;top:40%;left:50%;margin-left:-50px;margin-top:-50px}td,th{white-space:normal;word-wrap:break-word}#location-column-header{min-width:200px}#severity-column-header{min-width:300px}.left-margin-spacer{margin-left:16px}#error-response{font-size:large;font-weight:700}#validator-title{padding-left:0}table{width:100%}tr.text-value-row{height:0}.validation-result-row td{border-bottom-width:0}.validation-result-detail{overflow:hidden;display:flex}.validation-result-text-value{padding:16px}.expanded-row{background-color:#fafaff}.table-row{font-weight:700}.mat-button-toggle-checked{color:#303f9f;background-color:#e8eaf6;border:1px solid #7986cb}.row-button-wrapper{display:flex;align-items:center}mat-button-toggle{font-weight:700}.mat-button-toggle-disabled{background-color:#f5f5f5;color:#252525;border:1px solid whitesmoke}.mat-column-toggle,.mat-column-icon{width:5%!important}.mat-column-severity{width:10%!important}.mat-column-fhirPath{width:70%!important}.mat-column-location{width:10%!important}.close-button{float:right;right:-8px}.server-error-message-container{border-style:solid;border-width:1px;margin-top:16px;margin-bottom:16px;border-color:#d32f2f}.server-error-status{color:#d32f2f;margin-left:1em;margin-top:1em}.server-error-message-text{margin-left:16px;margin-bottom:16px;font-family:monospace}.filename{font-family:monospace;margin:0 16px}#format-toggle-buttons{width:25%}.content-spacer{flex:1 1 auto}.full-width{width:100%}.warning-mark{background-color:#fff2cc}.error-mark{background-color:#fcc}.info-mark{background-color:#dcedc8}.note-mark{background-color:#e3f2fd}.success-color{color:#28a745}.danger-color{color:#dc3549}.warning-color{color:#ffc107}.line-item{margin:0;white-space:pre}.right-aligned{display:flex;flex-direction:column;align-items:flex-end}\n"] }]
        }], ctorParameters: () => [{ type: FhirValidatorService }], propDecorators: { validatorTitle: [{
                type: Input
            }], validationResultsExpanded: [{
                type: Input
            }], resultDetailsExpandBtnShown: [{
                type: Input
            }], formatResourceBtnShown: [{
                type: Input
            }], clearValidatorBtnShown: [{
                type: Input
            }], submitBtnShown: [{
                type: Input
            }], exportResultsButtonShown: [{
                type: Input
            }], submitBtnTitle: [{
                type: Input
            }], validationInputFormat: [{
                type: Input
            }], maxFileSize: [{
                type: Input
            }], submitBtnAlignment: [{
                type: Input
            }], cancelValidationBtnShown: [{
                type: Input
            }], buttonTxtColor: [{
                type: Input
            }], buttonBackgroundColor: [{
                type: Input
            }], exportValidationResultsBtnName: [{
                type: Input
            }], onValidation: [{
                type: Output
            }], onApiError: [{
                type: Output
            }], onResourceContentChanged: [{
                type: Output
            }], onExportValidationResults: [{
                type: Output
            }], ig: [{
                type: Input
            }], inputRef: [{
                type: ViewChild,
                args: ['validatorInput', { static: false, read: ElementRef }]
            }] } });

class NgxFhirValidatorModule {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.4", ngImport: i0, type: NgxFhirValidatorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.4", ngImport: i0, type: NgxFhirValidatorModule, declarations: [NgxFhirValidatorComponent], imports: [CommonModule,
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
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.4", ngImport: i0, type: NgxFhirValidatorModule, providers: [
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.4", ngImport: i0, type: NgxFhirValidatorModule, decorators: [{
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

/*
 * Public API Surface of ngx-fhir-validator
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxFhirValidatorComponent, NgxFhirValidatorModule };
//# sourceMappingURL=ngx-fhir-validator.mjs.map
