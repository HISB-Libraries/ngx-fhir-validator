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
    getUiValidationMessages(fhirResource, resourceFormat) {
        if (!fhirResource || (!!fhirResource && Object.keys(fhirResource).length === 0)) {
            return "Please enter a FHIR resource for validation.";
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
    validateFhirResource(fhirResource, resourceFormat) {
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
                        "valueString": "hl7.fhir.us.mdi#current"
                    },
                    {
                        "name": "resource",
                        "resource": fhirResource,
                    },
                    {
                        "name": "includeFormattedResource",
                        "valueBoolean": true
                    }
                ]
            };
            headers = new HttpHeaders()
                .set('Content-Type', 'application/fhir+json');
        }
        else if (resourceFormat === 'xml') {
            requestData =
                `<?xml version="1.0" encoding="UTF-8"?>
      <Parameters xmlns="http://hl7.org/fhir">
        <parameter>
          <name value="ig" />
          <valueString value="hl7.fhir.us.mdi#current" />
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
}
FhirValidatorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.2", ngImport: i0, type: FhirValidatorService, deps: [{ token: i1.HttpClient }, { token: i2.MatSnackBar }, { token: i3.EnvironmentHandlerService }], target: i0.ɵɵFactoryTarget.Injectable });
FhirValidatorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.2", ngImport: i0, type: FhirValidatorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.2", ngImport: i0, type: FhirValidatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.MatSnackBar }, { type: i3.EnvironmentHandlerService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmhpci12YWxpZGF0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1maGlyLXZhbGlkYXRvci9zcmMvbGliL3NlcnZpY2VzL2ZoaXItdmFsaWRhdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFTLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQWEsV0FBVyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDN0QsT0FBTyxFQUFDLEdBQUcsRUFBYSxNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFPckMsTUFBTSxPQUFPLG9CQUFvQjtJQUUvQixZQUNVLElBQWdCLEVBQ2hCLFNBQXNCLEVBQ3RCLGtCQUE2QztRQUY3QyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGNBQVMsR0FBVCxTQUFTLENBQWE7UUFDdEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUEyQjtRQUNyRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQ3RFLENBQUM7SUFBQSxDQUFDO0lBRUYsZ0JBQWdCLENBQUMsYUFBcUIsZUFBZTtRQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFO1lBQ25DLGtCQUFrQixFQUFFLFFBQVE7WUFDNUIsZ0JBQWdCLEVBQUUsS0FBSztZQUN2QixVQUFVLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDM0IsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsa0JBQWtCLENBQUMsVUFBa0I7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtZQUNuQyxrQkFBa0IsRUFBRSxRQUFRO1lBQzVCLGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsVUFBVSxFQUFFLENB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Q0FBQyxDQUFDO1NBQ2pEO2FBQU0sSUFBSSxjQUFjLEtBQUssS0FBSyxFQUFFO1lBRW5DLFdBQVc7Z0JBQ1Q7Ozs7Ozs7OztnQkFTUSxZQUFZOzs7b0JBR1IsQ0FBQztZQUNmLE9BQU8sR0FBRyxJQUFJLFdBQVcsRUFBRTtpQkFDeEIsR0FBRyxDQUFDLGNBQWMsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsRUFBRSxXQUFXLEVBQUUsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBVyxFQUFFLEVBQUUsQ0FDaEgsTUFDRCxDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7O2lIQS9KVSxvQkFBb0I7cUhBQXBCLG9CQUFvQixjQUZuQixNQUFNOzJGQUVQLG9CQUFvQjtrQkFIaEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1ZhbGlkYXRvckNvbnN0YW50c30gZnJvbSBcIi4uL3Byb3ZpZGVycy92YWxpZGF0b3ItY29uc3RhbnRzXCI7XG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBIZWFkZXJzfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7bWFwLCBPYnNlcnZhYmxlfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtNYXRTbmFja0Jhcn0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhclwiO1xuaW1wb3J0IHtFbnZpcm9ubWVudEhhbmRsZXJTZXJ2aWNlfSBmcm9tIFwiLi4vZW52aXJvbm1lbnQtaGFuZGxlci5zZXJ2aWNlXCI7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEZoaXJWYWxpZGF0b3JTZXJ2aWNlIHtcbiAgcHJpdmF0ZSByZWFkb25seSBzZXJ2ZXJCYXNlVXJsOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIF9zbmFja0JhcjogTWF0U25hY2tCYXIsXG4gICAgcHJpdmF0ZSBlbnZpcm9ubWVudEhhbmRsZXI6IEVudmlyb25tZW50SGFuZGxlclNlcnZpY2UpIHtcbiAgICB0aGlzLnNlcnZlckJhc2VVcmwgPSB0aGlzLmVudmlyb25tZW50SGFuZGxlci5nZXRGaGlyU2VydmVyQmFzZVVSTCgpO1xuICB9O1xuXG4gIHNob3dFcnJvck1lc3NhZ2UobWVzc2FnZVN0cjogc3RyaW5nID0gJ1NlcnZlciBFcnJvci4nKXtcbiAgICB0aGlzLl9zbmFja0Jhci5vcGVuKG1lc3NhZ2VTdHIsICd4JyAse1xuICAgICAgaG9yaXpvbnRhbFBvc2l0aW9uOiAnY2VudGVyJyxcbiAgICAgIHZlcnRpY2FsUG9zaXRpb246ICd0b3AnLFxuICAgICAgcGFuZWxDbGFzczogWydlcnJvci1jb2xvciddLFxuICAgICAgZHVyYXRpb246IDUwMDBcbiAgICB9KTtcbiAgfVxuXG4gIHNob3dTdWNjZXNzTWVzc2FnZShtZXNzYWdlU3RyOiBzdHJpbmcpe1xuICAgIHRoaXMuX3NuYWNrQmFyLm9wZW4obWVzc2FnZVN0ciwgJ3gnICx7XG4gICAgICBob3Jpem9udGFsUG9zaXRpb246ICdjZW50ZXInLFxuICAgICAgdmVydGljYWxQb3NpdGlvbjogJ3RvcCcsXG4gICAgICBwYW5lbENsYXNzOiBbJ21hdC10b29sYmFyJywgJ21hdC1wcmltYXJ5J10sXG4gICAgICBkdXJhdGlvbjogMzAwMFxuICAgIH0pO1xuICB9XG5cbiAgY2xvc2VOb3RpZmljYXRpb24oKXtcbiAgICB0aGlzLl9zbmFja0Jhci5kaXNtaXNzKCk7XG4gIH1cblxuICBnZXRVaVZhbGlkYXRpb25NZXNzYWdlcyhmaGlyUmVzb3VyY2U6IGFueSwgcmVzb3VyY2VGb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgICBpZighZmhpclJlc291cmNlIHx8ICghIWZoaXJSZXNvdXJjZSAmJiBPYmplY3Qua2V5cyhmaGlyUmVzb3VyY2UpLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgIHJldHVybiBcIlBsZWFzZSBlbnRlciBhIEZISVIgcmVzb3VyY2UgZm9yIHZhbGlkYXRpb24uXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlc291cmNlRm9ybWF0ID09PSAnanNvbicpe1xuICAgICAgaWYoIXRoaXMuaXNKc29uKGZoaXJSZXNvdXJjZSkpe1xuICAgICAgICAvLyBDb3VsZCBub3QgcGFyc2UgdGhlIHJlc291cmNlIGF0IGFsbC4gSXQgaXMgbm90IGEgdmFsaWQgSlNPTiBhcyBmYXIgYXMgdGhlIGpzIHBhcnNlciBpcyBjb25jZXJuZWQuXG4gICAgICAgIHJldHVybiBcIkludmFsaWQganNvbiBmb3JtYXQgZGV0ZWN0ZWQuXCI7XG4gICAgICB9XG4gICAgICBlbHNlIGlmKCFKU09OLnBhcnNlKGZoaXJSZXNvdXJjZSkucmVzb3VyY2VUeXBlKXtcbiAgICAgICAgcmV0dXJuIFwiTWlzc2luZyByZXF1aXJlZCByZXNvdXJjZVR5cGUgcHJvcGVydHkuXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlc291cmNlRm9ybWF0ID09PSAneG1sJykge1xuICAgICAgaWYoIXRoaXMuaXNYbWxTdHJpbmcoZmhpclJlc291cmNlKSl7XG4gICAgICAgIC8vIENvdWxkIG5vdCBwYXJzZSB0aGUgcmVzb3VyY2UgYXQgYWxsLiBJdCBpcyBub3QgYSB2YWxpZCBYTUwgYXMgZmFyIGFzIHRoZSBqcyBwYXJzZXIgaXMgY29uY2VybmVkLlxuICAgICAgICByZXR1cm4gXCJJbnZhbGlkIHhtbCBmb3JtYXQgZGV0ZWN0ZWQuXCI7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gVE9ETyB3ZSBtYXkgbmVlZCB0byB0byBzb21lIGVycm9yIGhhbmRsaW5nIGhlcmVcbiAgICAgICAgbGV0IGZoaXJSZXNvdXJjZVhNTDogYW55ID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhmaGlyUmVzb3VyY2UsICd0ZXh0L3htbCcpO1xuICAgICAgICBjb25zdCByZXNvdXJjZVR5cGUgPSBmaGlyUmVzb3VyY2VYTUwuY2hpbGROb2Rlc1swXS5ub2RlTmFtZTtcbiAgICAgICAgY29uc3QgeG1sbnNBdHRyaWJ1dGUgPSBmaGlyUmVzb3VyY2VYTUwucXVlcnlTZWxlY3RvcihyZXNvdXJjZVR5cGUpLmdldEF0dHJpYnV0ZSgneG1sbnMnKTtcblxuICAgICAgICAvLyBhbGwgRkhJUiByZXNvdXJjZXMgc2hvdWxkIGhhdmUgeG1sbnM9XCJodHRwOi8vaGw3Lm9yZy9maGlyXCJcbiAgICAgICAgaWYoIXhtbG5zQXR0cmlidXRlIHx8IHhtbG5zQXR0cmlidXRlICE9ICdodHRwOi8vaGw3Lm9yZy9maGlyJyl7XG4gICAgICAgICAgcmV0dXJuIFwiSW52YWxpZCBvciBtaXNzaW5nIHhtbG5zIGF0dHJpYnV0ZS5cIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBkaWQgbm90IGZpbmQgYW55IG9idmlvdXMgZXJyb3JzLCBzbyByZXR1cm5pbmcgbm90aGluZ1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGlzSnNvbihzdHI6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmICh0eXBlb2Ygc3RyICE9ICdzdHJpbmcnKVxuICAgICAgc3RyID0gSlNPTi5zdHJpbmdpZnkoc3RyKTtcbiAgICB0cnkge1xuICAgICAgSlNPTi5wYXJzZShzdHIudHJpbSgpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNYbWxTdHJpbmcoc3RyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgY29uc3QgdGhlRG9tID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhzdHI/LnRyaW0oKSwgJ2FwcGxpY2F0aW9uL3htbCcpO1xuICAgICAgcmV0dXJuICEodGhlRG9tLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwYXJzZXJlcnJvcicpLmxlbmd0aCA+IDApO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGJlYXV0aWZ5SlNPTihzdHI6IHN0cmluZyk6IHN0cmluZ3tcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoSlNPTi5wYXJzZShzdHIpLCBudWxsLCAyKTtcbiAgfVxuXG4gIC8vIEkgYm9ycm93ZWQgc29tZSByZWdleCBjb2RlXG4gIGJlYXV0aWZ5WE1MKHN0cjogc3RyaW5nKTogc3RyaW5ne1xuICAgIGxldCBmb3JtYXR0ZWQgPSAnJywgaW5kZW50PSAnJztcbiAgICBjb25zdCB0YWI9JyAgJztcbiAgICBzdHIuc3BsaXQoLz5cXHMqPC8pLmZvckVhY2goZnVuY3Rpb24obm9kZSkge1xuICAgICAgaWYgKG5vZGUubWF0Y2goIC9eXFwvXFx3LyApKSB7XG4gICAgICAgIGluZGVudCA9IGluZGVudC5zdWJzdHJpbmcodGFiLmxlbmd0aCk7XG4gICAgICB9XG4gICAgICBmb3JtYXR0ZWQgKz0gaW5kZW50ICsgJzwnICsgbm9kZSArICc+XFxyXFxuJztcbiAgICAgIGlmIChub2RlLm1hdGNoKCAvXjw/XFx3W14+XSpbXlxcL10kLyApKXtcbiAgICAgICAgaW5kZW50ICs9IHRhYjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZm9ybWF0dGVkLnN1YnN0cmluZygxLCBmb3JtYXR0ZWQubGVuZ3RoLTMpO1xuICB9XG5cbiAgdmFsaWRhdGVGaGlyUmVzb3VyY2UoZmhpclJlc291cmNlOiBhbnksIHJlc291cmNlRm9ybWF0OiBzdHJpbmcpOiAgT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgIGxldCBoZWFkZXJzOiBhbnl8IG51bGw9IG51bGw7XG4gICAgbGV0IHJlcXVlc3REYXRhOiBhbnl8IG51bGwgPSBudWxsO1xuXG4gICAgLy8gUmVxdWVzdHMgYXJlIGZvcm1lZCBpbiBvcmRlciB0byBiZSBjb25zdW1lZCBieSB0aGUgQVBJLlxuICAgIC8vIE5vdGUgdGhhdCByZXF1ZXN0RGF0YSBpcyBub3RoaW5nIGJ1dCBhIHdyYXBwZXIgdG8gdGhlIHJlcXVlc3QgYW5kIHNob3VsZCBuZXZlciBjaGFuZ2UuXG4gICAgaWYgKHJlc291cmNlRm9ybWF0ID09PSAnanNvbicpIHtcbiAgICAgIHJlcXVlc3REYXRhID0ge1xuICAgICAgICBcInJlc291cmNlVHlwZVwiOiBcIlBhcmFtZXRlcnNcIixcbiAgICAgICAgXCJwYXJhbWV0ZXJcIjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBcImlnXCIsXG4gICAgICAgICAgICBcInZhbHVlU3RyaW5nXCI6IFwiaGw3LmZoaXIudXMubWRpI2N1cnJlbnRcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgXCJuYW1lXCI6IFwicmVzb3VyY2VcIixcbiAgICAgICAgICAgIFwicmVzb3VyY2VcIjogZmhpclJlc291cmNlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgXCJuYW1lXCI6IFwiaW5jbHVkZUZvcm1hdHRlZFJlc291cmNlXCIsXG4gICAgICAgICAgICBcInZhbHVlQm9vbGVhblwiOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9XG5cbiAgICAgIGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKVxuICAgICAgICAuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vZmhpcitqc29uJyk7XG4gICAgfSBlbHNlIGlmIChyZXNvdXJjZUZvcm1hdCA9PT0gJ3htbCcpIHtcblxuICAgICAgcmVxdWVzdERhdGEgPVxuICAgICAgICBgPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiVVRGLThcIj8+XG4gICAgICA8UGFyYW1ldGVycyB4bWxucz1cImh0dHA6Ly9obDcub3JnL2ZoaXJcIj5cbiAgICAgICAgPHBhcmFtZXRlcj5cbiAgICAgICAgICA8bmFtZSB2YWx1ZT1cImlnXCIgLz5cbiAgICAgICAgICA8dmFsdWVTdHJpbmcgdmFsdWU9XCJobDcuZmhpci51cy5tZGkjY3VycmVudFwiIC8+XG4gICAgICAgIDwvcGFyYW1ldGVyPlxuICAgICAgICA8cGFyYW1ldGVyPlxuICAgICAgICAgIDxuYW1lIHZhbHVlPVwicmVzb3VyY2VcIiAvPlxuICAgICAgICAgICAgPHJlc291cmNlPlxuICAgICAgICAgICAgICAke2ZoaXJSZXNvdXJjZX1cbiAgICAgICAgICAgIDwvcmVzb3VyY2U+XG4gICAgICAgICAgPC9wYXJhbWV0ZXI+XG4gICAgICA8L1BhcmFtZXRlcnM+YDtcbiAgICAgIGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKVxuICAgICAgICAuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vZmhpcit4bWwnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5zZXJ2ZXJCYXNlVXJsICsgXCIkdmFsaWRhdGVcIiwgcmVxdWVzdERhdGEsIHtoZWFkZXJzOiBoZWFkZXJzfSkucGlwZShtYXAoKHJlc3VsdDogYW55KSA9PiAoXG4gICAgICByZXN1bHQgYXMgT2JqZWN0XG4gICAgKSkpO1xuICB9XG59XG4iXX0=