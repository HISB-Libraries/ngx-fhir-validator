import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import { map } from "rxjs";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@angular/material/snack-bar";
import * as i3 from "../environment-handler.service";
export class FhirValidatorService {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FhirValidatorService, deps: [{ token: i1.HttpClient }, { token: i2.MatSnackBar }, { token: i3.EnvironmentHandlerService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FhirValidatorService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FhirValidatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }, { type: i2.MatSnackBar }, { type: i3.EnvironmentHandlerService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmhpci12YWxpZGF0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1maGlyLXZhbGlkYXRvci9zcmMvbGliL3NlcnZpY2VzL2ZoaXItdmFsaWRhdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0QsT0FBTyxFQUFDLEdBQUcsRUFBYSxNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFRckMsTUFBTSxPQUFPLG9CQUFvQjtJQUUvQixZQUNVLElBQWdCLEVBQ2hCLFNBQXNCLEVBQ3RCLGtCQUE2QztRQUY3QyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGNBQVMsR0FBVCxTQUFTLENBQWE7UUFDdEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUEyQjtRQUNyRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQ3RFLENBQUM7SUFBQSxDQUFDO0lBRUYsZ0JBQWdCLENBQUMsYUFBcUIsZUFBZTtRQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFO1lBQ25DLGtCQUFrQixFQUFFLFFBQVE7WUFDNUIsZ0JBQWdCLEVBQUUsS0FBSztZQUN2QixVQUFVLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDM0IsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsa0JBQWtCLENBQUMsVUFBa0I7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtZQUNuQyxrQkFBa0IsRUFBRSxRQUFRO1lBQzVCLGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsVUFBVSxFQUFFLENB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WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7bWFwLCBPYnNlcnZhYmxlfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtNYXRTbmFja0Jhcn0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhclwiO1xuaW1wb3J0IHtFbnZpcm9ubWVudEhhbmRsZXJTZXJ2aWNlfSBmcm9tIFwiLi4vZW52aXJvbm1lbnQtaGFuZGxlci5zZXJ2aWNlXCI7XG5pbXBvcnQge0ltcGxlbWVudGF0aW9uR3VpZGV9IGZyb20gXCIuLi9tb2RhbC9pbXBsZW1lbnRhdGlvbi1ndWlkZVwiO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBGaGlyVmFsaWRhdG9yU2VydmljZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgc2VydmVyQmFzZVVybDogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBfc25hY2tCYXI6IE1hdFNuYWNrQmFyLFxuICAgIHByaXZhdGUgZW52aXJvbm1lbnRIYW5kbGVyOiBFbnZpcm9ubWVudEhhbmRsZXJTZXJ2aWNlKSB7XG4gICAgdGhpcy5zZXJ2ZXJCYXNlVXJsID0gdGhpcy5lbnZpcm9ubWVudEhhbmRsZXIuZ2V0RmhpclNlcnZlckJhc2VVUkwoKTtcbiAgfTtcblxuICBzaG93RXJyb3JNZXNzYWdlKG1lc3NhZ2VTdHI6IHN0cmluZyA9ICdTZXJ2ZXIgRXJyb3IuJyl7XG4gICAgdGhpcy5fc25hY2tCYXIub3BlbihtZXNzYWdlU3RyLCAneCcgLHtcbiAgICAgIGhvcml6b250YWxQb3NpdGlvbjogJ2NlbnRlcicsXG4gICAgICB2ZXJ0aWNhbFBvc2l0aW9uOiAndG9wJyxcbiAgICAgIHBhbmVsQ2xhc3M6IFsnZXJyb3ItY29sb3InXSxcbiAgICAgIGR1cmF0aW9uOiA1MDAwXG4gICAgfSk7XG4gIH1cblxuICBzaG93U3VjY2Vzc01lc3NhZ2UobWVzc2FnZVN0cjogc3RyaW5nKXtcbiAgICB0aGlzLl9zbmFja0Jhci5vcGVuKG1lc3NhZ2VTdHIsICd4JyAse1xuICAgICAgaG9yaXpvbnRhbFBvc2l0aW9uOiAnY2VudGVyJyxcbiAgICAgIHZlcnRpY2FsUG9zaXRpb246ICd0b3AnLFxuICAgICAgcGFuZWxDbGFzczogWydtYXQtdG9vbGJhcicsICdtYXQtcHJpbWFyeSddLFxuICAgICAgZHVyYXRpb246IDMwMDBcbiAgICB9KTtcbiAgfVxuXG4gIGNsb3NlTm90aWZpY2F0aW9uKCl7XG4gICAgdGhpcy5fc25hY2tCYXIuZGlzbWlzcygpO1xuICB9XG5cbiAgZ2V0VWlWYWxpZGF0aW9uTWVzc2FnZXMoZmhpclJlc291cmNlOiBhbnksIHJlc291cmNlRm9ybWF0OiBzdHJpbmcsIHNlbGVjdGVkSWc6IEltcGxlbWVudGF0aW9uR3VpZGUpOiBzdHJpbmcge1xuXG4gICAgaWYoIWZoaXJSZXNvdXJjZSB8fCAoISFmaGlyUmVzb3VyY2UgJiYgT2JqZWN0LmtleXMoZmhpclJlc291cmNlKS5sZW5ndGggPT09IDApKSB7XG4gICAgICByZXR1cm4gXCJQbGVhc2UgZW50ZXIgYSBGSElSIHJlc291cmNlIGZvciB2YWxpZGF0aW9uLlwiO1xuICAgIH1cbiAgICBlbHNlIGlmKCFzZWxlY3RlZElnKXtcbiAgICAgIHJldHVybiBcIlBsZWFzZSBzZWxlY3QgYW4gSW1wbGVtZW50YXRpb24gR3VpZGVcIjtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVzb3VyY2VGb3JtYXQgPT09ICdqc29uJyl7XG4gICAgICBpZighdGhpcy5pc0pzb24oZmhpclJlc291cmNlKSl7XG4gICAgICAgIC8vIENvdWxkIG5vdCBwYXJzZSB0aGUgcmVzb3VyY2UgYXQgYWxsLiBJdCBpcyBub3QgYSB2YWxpZCBKU09OIGFzIGZhciBhcyB0aGUganMgcGFyc2VyIGlzIGNvbmNlcm5lZC5cbiAgICAgICAgcmV0dXJuIFwiSW52YWxpZCBqc29uIGZvcm1hdCBkZXRlY3RlZC5cIjtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYoIUpTT04ucGFyc2UoZmhpclJlc291cmNlKS5yZXNvdXJjZVR5cGUpe1xuICAgICAgICByZXR1cm4gXCJNaXNzaW5nIHJlcXVpcmVkIHJlc291cmNlVHlwZSBwcm9wZXJ0eS5cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAocmVzb3VyY2VGb3JtYXQgPT09ICd4bWwnKSB7XG4gICAgICBpZighdGhpcy5pc1htbFN0cmluZyhmaGlyUmVzb3VyY2UpKXtcbiAgICAgICAgLy8gQ291bGQgbm90IHBhcnNlIHRoZSByZXNvdXJjZSBhdCBhbGwuIEl0IGlzIG5vdCBhIHZhbGlkIFhNTCBhcyBmYXIgYXMgdGhlIGpzIHBhcnNlciBpcyBjb25jZXJuZWQuXG4gICAgICAgIHJldHVybiBcIkludmFsaWQgeG1sIGZvcm1hdCBkZXRlY3RlZC5cIjtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBUT0RPIHdlIG1heSBuZWVkIHRvIHRvIHNvbWUgZXJyb3IgaGFuZGxpbmcgaGVyZVxuICAgICAgICBsZXQgZmhpclJlc291cmNlWE1MOiBhbnkgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKGZoaXJSZXNvdXJjZSwgJ3RleHQveG1sJyk7XG4gICAgICAgIGNvbnN0IHJlc291cmNlVHlwZSA9IGZoaXJSZXNvdXJjZVhNTC5jaGlsZE5vZGVzWzBdLm5vZGVOYW1lO1xuICAgICAgICBjb25zdCB4bWxuc0F0dHJpYnV0ZSA9IGZoaXJSZXNvdXJjZVhNTC5xdWVyeVNlbGVjdG9yKHJlc291cmNlVHlwZSkuZ2V0QXR0cmlidXRlKCd4bWxucycpO1xuXG4gICAgICAgIC8vIGFsbCBGSElSIHJlc291cmNlcyBzaG91bGQgaGF2ZSB4bWxucz1cImh0dHA6Ly9obDcub3JnL2ZoaXJcIlxuICAgICAgICBpZigheG1sbnNBdHRyaWJ1dGUgfHwgeG1sbnNBdHRyaWJ1dGUgIT0gJ2h0dHA6Ly9obDcub3JnL2ZoaXInKXtcbiAgICAgICAgICByZXR1cm4gXCJJbnZhbGlkIG9yIG1pc3NpbmcgeG1sbnMgYXR0cmlidXRlLlwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGRpZCBub3QgZmluZCBhbnkgb2J2aW91cyBlcnJvcnMsIHNvIHJldHVybmluZyBub3RoaW5nXG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgaXNKc29uKHN0cjogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKHR5cGVvZiBzdHIgIT0gJ3N0cmluZycpXG4gICAgICBzdHIgPSBKU09OLnN0cmluZ2lmeShzdHIpO1xuICAgIHRyeSB7XG4gICAgICBKU09OLnBhcnNlKHN0ci50cmltKCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc1htbFN0cmluZyhzdHI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICBjb25zdCB0aGVEb20gPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKHN0cj8udHJpbSgpLCAnYXBwbGljYXRpb24veG1sJyk7XG4gICAgICByZXR1cm4gISh0aGVEb20uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3BhcnNlcmVycm9yJykubGVuZ3RoID4gMCk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgYmVhdXRpZnlKU09OKHN0cjogc3RyaW5nKTogc3RyaW5ne1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShKU09OLnBhcnNlKHN0ciksIG51bGwsIDIpO1xuICB9XG5cbiAgLy8gSSBib3Jyb3dlZCBzb21lIHJlZ2V4IGNvZGVcbiAgYmVhdXRpZnlYTUwoc3RyOiBzdHJpbmcpOiBzdHJpbmd7XG4gICAgbGV0IGZvcm1hdHRlZCA9ICcnLCBpbmRlbnQ9ICcnO1xuICAgIGNvbnN0IHRhYj0nICAnO1xuICAgIHN0ci5zcGxpdCgvPlxccyo8LykuZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XG4gICAgICBpZiAobm9kZS5tYXRjaCggL15cXC9cXHcvICkpIHtcbiAgICAgICAgaW5kZW50ID0gaW5kZW50LnN1YnN0cmluZyh0YWIubGVuZ3RoKTtcbiAgICAgIH1cbiAgICAgIGZvcm1hdHRlZCArPSBpbmRlbnQgKyAnPCcgKyBub2RlICsgJz5cXHJcXG4nO1xuICAgICAgaWYgKG5vZGUubWF0Y2goIC9ePD9cXHdbXj5dKlteXFwvXSQvICkpe1xuICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmb3JtYXR0ZWQuc3Vic3RyaW5nKDEsIGZvcm1hdHRlZC5sZW5ndGgtMyk7XG4gIH1cblxuICB2YWxpZGF0ZUZoaXJSZXNvdXJjZShmaGlyUmVzb3VyY2U6IGFueSwgcmVzb3VyY2VGb3JtYXQ6IHN0cmluZywgaWc6IHN0cmluZyk6ICBPYnNlcnZhYmxlPGFueT4ge1xuXG4gICAgbGV0IGhlYWRlcnM6IGFueXwgbnVsbD0gbnVsbDtcbiAgICBsZXQgcmVxdWVzdERhdGE6IGFueXwgbnVsbCA9IG51bGw7XG5cbiAgICAvLyBSZXF1ZXN0cyBhcmUgZm9ybWVkIGluIG9yZGVyIHRvIGJlIGNvbnN1bWVkIGJ5IHRoZSBBUEkuXG4gICAgLy8gTm90ZSB0aGF0IHJlcXVlc3REYXRhIGlzIG5vdGhpbmcgYnV0IGEgd3JhcHBlciB0byB0aGUgcmVxdWVzdCBhbmQgc2hvdWxkIG5ldmVyIGNoYW5nZS5cbiAgICBpZiAocmVzb3VyY2VGb3JtYXQgPT09ICdqc29uJykge1xuICAgICAgcmVxdWVzdERhdGEgPSB7XG4gICAgICAgIFwicmVzb3VyY2VUeXBlXCI6IFwiUGFyYW1ldGVyc1wiLFxuICAgICAgICBcInBhcmFtZXRlclwiOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgXCJuYW1lXCI6IFwiaWdcIixcbiAgICAgICAgICAgIFwidmFsdWVTdHJpbmdcIjogaWdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBcInJlc291cmNlXCIsXG4gICAgICAgICAgICBcInJlc291cmNlXCI6IGZoaXJSZXNvdXJjZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBcImluY2x1ZGVGb3JtYXR0ZWRSZXNvdXJjZVwiLFxuICAgICAgICAgICAgXCJ2YWx1ZUJvb2xlYW5cIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgXCJuYW1lXCI6IFwiZm9ybWF0XCIsXG4gICAgICAgICAgICBcInZhbHVlU3RyaW5nXCI6IFwiYXBwbGljYXRpb24vZmhpcitqc29uXCJcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cblxuICAgICAgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXG4gICAgICAgIC5zZXQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9maGlyK2pzb24nKTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVzb3VyY2VGb3JtYXQgPT09ICd4bWwnKSB7XG5cbiAgICAgIHJlcXVlc3REYXRhID1cbiAgICAgICAgYDxQYXJhbWV0ZXJzIHhtbG5zPVwiaHR0cDovL2hsNy5vcmcvZmhpclwiPlxuICAgICAgICAgIDxwYXJhbWV0ZXI+XG4gICAgICAgICAgICA8bmFtZSB2YWx1ZT1cImlnXCIvPlxuICAgICAgICAgICAgPHZhbHVlU3RyaW5nIHZhbHVlPVwiJHtpZ31cIi8+XG4gICAgICAgICAgPC9wYXJhbWV0ZXI+XG4gICAgICAgICAgPHBhcmFtZXRlcj5cbiAgICAgICAgICAgIDxuYW1lIHZhbHVlPVwiZm9ybWF0XCIvPlxuICAgICAgICAgICAgPHZhbHVlU3RyaW5nIHZhbHVlPVwiYXBwbGljYXRpb24vZmhpcit4bWxcIi8+XG4gICAgICAgICAgPC9wYXJhbWV0ZXI+XG4gICAgICAgICAgPHBhcmFtZXRlcj5cbiAgICAgICAgICAgIDxuYW1lIHZhbHVlPVwiaW5jbHVkZUZvcm1hdHRlZFJlc291cmNlXCIvPlxuICAgICAgICAgICAgPHZhbHVlQm9vbGVhbiB2YWx1ZT1cInRydWVcIi8+XG4gICAgICAgICAgPC9wYXJhbWV0ZXI+XG4gICAgICAgICAgPHBhcmFtZXRlcj5cbiAgICAgICAgICAgIDxuYW1lIHZhbHVlPVwicmVzb3VyY2VcIiAvPlxuICAgICAgICAgICAgPHJlc291cmNlPlxuICAgICAgICAgICAgICAke2ZoaXJSZXNvdXJjZX1cbiAgICAgICAgICAgIDwvcmVzb3VyY2U+XG4gICAgICAgICAgPC9wYXJhbWV0ZXI+XG4gICAgICA8L1BhcmFtZXRlcnM+YDtcbiAgICAgIGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKVxuICAgICAgICAuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vZmhpcit4bWwnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5zZXJ2ZXJCYXNlVXJsICsgXCIkdmFsaWRhdGVcIiwgcmVxdWVzdERhdGEsIHtoZWFkZXJzOiBoZWFkZXJzfSkucGlwZShtYXAoKHJlc3VsdDogYW55KSA9PiAoXG4gICAgICByZXN1bHQgYXMgT2JqZWN0XG4gICAgKSkpO1xuICB9XG5cbiAgZ2V0SWdMaXN0KCl7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5zZXJ2ZXJCYXNlVXJsICsgXCIkcGFja2FnZXNcIilcbiAgfVxufVxuIl19