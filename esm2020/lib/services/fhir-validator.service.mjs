import { Injectable } from '@angular/core';
import { ValidatorConstants } from "../providers/validator-constants";
import { HttpHeaders } from "@angular/common/http";
import { map } from "rxjs";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@angular/material/snack-bar";
export class FhirValidatorService {
    constructor(http, _snackBar) {
        this.http = http;
        this._snackBar = _snackBar;
        this.prodUri = ValidatorConstants.PROD_URI;
    }
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
        return this.http.post(this.prodUri + "/$validate", requestData, { headers: headers }).pipe(map((result) => result));
    }
}
FhirValidatorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.2", ngImport: i0, type: FhirValidatorService, deps: [{ token: i1.HttpClient }, { token: i2.MatSnackBar }], target: i0.ɵɵFactoryTarget.Injectable });
FhirValidatorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.2", ngImport: i0, type: FhirValidatorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.2", ngImport: i0, type: FhirValidatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.MatSnackBar }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmhpci12YWxpZGF0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1maGlyLXZhbGlkYXRvci9zcmMvbGliL3NlcnZpY2VzL2ZoaXItdmFsaWRhdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQWEsV0FBVyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDN0QsT0FBTyxFQUFDLEdBQUcsRUFBYSxNQUFNLE1BQU0sQ0FBQzs7OztBQU1yQyxNQUFNLE9BQU8sb0JBQW9CO0lBRy9CLFlBQW9CLElBQWdCLEVBQVUsU0FBc0I7UUFBaEQsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQWE7UUFGNUQsWUFBTyxHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQztJQUUwQixDQUFDO0lBRXpFLGdCQUFnQixDQUFDLGFBQXFCLGVBQWU7UUFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtZQUNuQyxrQkFBa0IsRUFBRSxRQUFRO1lBQzVCLGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsVUFBVSxFQUFFLENBQUMsYUFBYSxDQUFDO1lBQzNCLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGtCQUFrQixDQUFDLFVBQWtCO1FBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUU7WUFDbkMsa0JBQWtCLEVBQUUsUUFBUTtZQUM1QixnQkFBZ0IsRUFBRSxLQUFLO1lBQ3ZCLFVBQVUsRUFBRSxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUM7WUFDMUMsUUFBUSxFQUFF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QUssRUFBRTtZQUVuQyxXQUFXO2dCQUNUOzs7Ozs7Ozs7Z0JBU1EsWUFBWTs7O29CQUdSLENBQUM7WUFDZixPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUU7aUJBQ3hCLEdBQUcsQ0FBQyxjQUFjLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztTQUNoRDtRQUVELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLEVBQUUsV0FBVyxFQUFFLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFLENBQzNHLE1BQ0QsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDOztpSEEzSlUsb0JBQW9CO3FIQUFwQixvQkFBb0IsY0FGbkIsTUFBTTsyRkFFUCxvQkFBb0I7a0JBSGhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtWYWxpZGF0b3JDb25zdGFudHN9IGZyb20gXCIuLi9wcm92aWRlcnMvdmFsaWRhdG9yLWNvbnN0YW50c1wiO1xuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwSGVhZGVyc30gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQge21hcCwgT2JzZXJ2YWJsZX0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7TWF0U25hY2tCYXJ9IGZyb20gXCJAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXJcIjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRmhpclZhbGlkYXRvclNlcnZpY2Uge1xuICBwcml2YXRlIHByb2RVcmkgPSBWYWxpZGF0b3JDb25zdGFudHMuUFJPRF9VUkk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIF9zbmFja0JhcjogTWF0U25hY2tCYXIpIHsgfVxuXG4gIHNob3dFcnJvck1lc3NhZ2UobWVzc2FnZVN0cjogc3RyaW5nID0gJ1NlcnZlciBFcnJvci4nKXtcbiAgICB0aGlzLl9zbmFja0Jhci5vcGVuKG1lc3NhZ2VTdHIsICd4JyAse1xuICAgICAgaG9yaXpvbnRhbFBvc2l0aW9uOiAnY2VudGVyJyxcbiAgICAgIHZlcnRpY2FsUG9zaXRpb246ICd0b3AnLFxuICAgICAgcGFuZWxDbGFzczogWydlcnJvci1jb2xvciddLFxuICAgICAgZHVyYXRpb246IDUwMDBcbiAgICB9KTtcbiAgfVxuXG4gIHNob3dTdWNjZXNzTWVzc2FnZShtZXNzYWdlU3RyOiBzdHJpbmcpe1xuICAgIHRoaXMuX3NuYWNrQmFyLm9wZW4obWVzc2FnZVN0ciwgJ3gnICx7XG4gICAgICBob3Jpem9udGFsUG9zaXRpb246ICdjZW50ZXInLFxuICAgICAgdmVydGljYWxQb3NpdGlvbjogJ3RvcCcsXG4gICAgICBwYW5lbENsYXNzOiBbJ21hdC10b29sYmFyJywgJ21hdC1wcmltYXJ5J10sXG4gICAgICBkdXJhdGlvbjogMzAwMFxuICAgIH0pO1xuICB9XG5cbiAgY2xvc2VOb3RpZmljYXRpb24oKXtcbiAgICB0aGlzLl9zbmFja0Jhci5kaXNtaXNzKCk7XG4gIH1cblxuICBnZXRVaVZhbGlkYXRpb25NZXNzYWdlcyhmaGlyUmVzb3VyY2U6IGFueSwgcmVzb3VyY2VGb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgICBpZighZmhpclJlc291cmNlIHx8ICghIWZoaXJSZXNvdXJjZSAmJiBPYmplY3Qua2V5cyhmaGlyUmVzb3VyY2UpLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgIHJldHVybiBcIlBsZWFzZSBlbnRlciBhIEZISVIgcmVzb3VyY2UgZm9yIHZhbGlkYXRpb24uXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlc291cmNlRm9ybWF0ID09PSAnanNvbicpe1xuICAgICAgaWYoIXRoaXMuaXNKc29uKGZoaXJSZXNvdXJjZSkpe1xuICAgICAgICAvLyBDb3VsZCBub3QgcGFyc2UgdGhlIHJlc291cmNlIGF0IGFsbC4gSXQgaXMgbm90IGEgdmFsaWQgSlNPTiBhcyBmYXIgYXMgdGhlIGpzIHBhcnNlciBpcyBjb25jZXJuZWQuXG4gICAgICAgIHJldHVybiBcIkludmFsaWQganNvbiBmb3JtYXQgZGV0ZWN0ZWQuXCI7XG4gICAgICB9XG4gICAgICBlbHNlIGlmKCFKU09OLnBhcnNlKGZoaXJSZXNvdXJjZSkucmVzb3VyY2VUeXBlKXtcbiAgICAgICAgcmV0dXJuIFwiTWlzc2luZyByZXF1aXJlZCByZXNvdXJjZVR5cGUgcHJvcGVydHkuXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlc291cmNlRm9ybWF0ID09PSAneG1sJykge1xuICAgICAgaWYoIXRoaXMuaXNYbWxTdHJpbmcoZmhpclJlc291cmNlKSl7XG4gICAgICAgIC8vIENvdWxkIG5vdCBwYXJzZSB0aGUgcmVzb3VyY2UgYXQgYWxsLiBJdCBpcyBub3QgYSB2YWxpZCBYTUwgYXMgZmFyIGFzIHRoZSBqcyBwYXJzZXIgaXMgY29uY2VybmVkLlxuICAgICAgICByZXR1cm4gXCJJbnZhbGlkIHhtbCBmb3JtYXQgZGV0ZWN0ZWQuXCI7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gVE9ETyB3ZSBtYXkgbmVlZCB0byB0byBzb21lIGVycm9yIGhhbmRsaW5nIGhlcmVcbiAgICAgICAgbGV0IGZoaXJSZXNvdXJjZVhNTDogYW55ID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhmaGlyUmVzb3VyY2UsICd0ZXh0L3htbCcpO1xuICAgICAgICBjb25zdCByZXNvdXJjZVR5cGUgPSBmaGlyUmVzb3VyY2VYTUwuY2hpbGROb2Rlc1swXS5ub2RlTmFtZTtcbiAgICAgICAgY29uc3QgeG1sbnNBdHRyaWJ1dGUgPSBmaGlyUmVzb3VyY2VYTUwucXVlcnlTZWxlY3RvcihyZXNvdXJjZVR5cGUpLmdldEF0dHJpYnV0ZSgneG1sbnMnKTtcblxuICAgICAgICAvLyBhbGwgRkhJUiByZXNvdXJjZXMgc2hvdWxkIGhhdmUgeG1sbnM9XCJodHRwOi8vaGw3Lm9yZy9maGlyXCJcbiAgICAgICAgaWYoIXhtbG5zQXR0cmlidXRlIHx8IHhtbG5zQXR0cmlidXRlICE9ICdodHRwOi8vaGw3Lm9yZy9maGlyJyl7XG4gICAgICAgICAgcmV0dXJuIFwiSW52YWxpZCBvciBtaXNzaW5nIHhtbG5zIGF0dHJpYnV0ZS5cIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBkaWQgbm90IGZpbmQgYW55IG9idmlvdXMgZXJyb3JzLCBzbyByZXR1cm5pbmcgbm90aGluZ1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGlzSnNvbihzdHI6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmICh0eXBlb2Ygc3RyICE9ICdzdHJpbmcnKVxuICAgICAgc3RyID0gSlNPTi5zdHJpbmdpZnkoc3RyKTtcbiAgICB0cnkge1xuICAgICAgSlNPTi5wYXJzZShzdHIudHJpbSgpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNYbWxTdHJpbmcoc3RyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgY29uc3QgdGhlRG9tID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhzdHI/LnRyaW0oKSwgJ2FwcGxpY2F0aW9uL3htbCcpO1xuICAgICAgcmV0dXJuICEodGhlRG9tLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwYXJzZXJlcnJvcicpLmxlbmd0aCA+IDApO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGJlYXV0aWZ5SlNPTihzdHI6IHN0cmluZyk6IHN0cmluZ3tcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoSlNPTi5wYXJzZShzdHIpLCBudWxsLCAyKTtcbiAgfVxuXG4gIC8vIEkgYm9ycm93ZWQgc29tZSByZWdleCBjb2RlXG4gIGJlYXV0aWZ5WE1MKHN0cjogc3RyaW5nKTogc3RyaW5ne1xuICAgIGxldCBmb3JtYXR0ZWQgPSAnJywgaW5kZW50PSAnJztcbiAgICBjb25zdCB0YWI9JyAgJztcbiAgICBzdHIuc3BsaXQoLz5cXHMqPC8pLmZvckVhY2goZnVuY3Rpb24obm9kZSkge1xuICAgICAgaWYgKG5vZGUubWF0Y2goIC9eXFwvXFx3LyApKSB7XG4gICAgICAgIGluZGVudCA9IGluZGVudC5zdWJzdHJpbmcodGFiLmxlbmd0aCk7XG4gICAgICB9XG4gICAgICBmb3JtYXR0ZWQgKz0gaW5kZW50ICsgJzwnICsgbm9kZSArICc+XFxyXFxuJztcbiAgICAgIGlmIChub2RlLm1hdGNoKCAvXjw/XFx3W14+XSpbXlxcL10kLyApKXtcbiAgICAgICAgaW5kZW50ICs9IHRhYjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZm9ybWF0dGVkLnN1YnN0cmluZygxLCBmb3JtYXR0ZWQubGVuZ3RoLTMpO1xuICB9XG5cbiAgdmFsaWRhdGVGaGlyUmVzb3VyY2UoZmhpclJlc291cmNlOiBhbnksIHJlc291cmNlRm9ybWF0OiBzdHJpbmcpOiAgT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgIGxldCBoZWFkZXJzOiBhbnl8IG51bGw9IG51bGw7XG4gICAgbGV0IHJlcXVlc3REYXRhOiBhbnl8IG51bGwgPSBudWxsO1xuXG4gICAgLy8gUmVxdWVzdHMgYXJlIGZvcm1lZCBpbiBvcmRlciB0byBiZSBjb25zdW1lZCBieSB0aGUgQVBJLlxuICAgIC8vIE5vdGUgdGhhdCByZXF1ZXN0RGF0YSBpcyBub3RoaW5nIGJ1dCBhIHdyYXBwZXIgdG8gdGhlIHJlcXVlc3QgYW5kIHNob3VsZCBuZXZlciBjaGFuZ2UuXG4gICAgaWYgKHJlc291cmNlRm9ybWF0ID09PSAnanNvbicpIHtcbiAgICAgIHJlcXVlc3REYXRhID0ge1xuICAgICAgICBcInJlc291cmNlVHlwZVwiOiBcIlBhcmFtZXRlcnNcIixcbiAgICAgICAgXCJwYXJhbWV0ZXJcIjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBcImlnXCIsXG4gICAgICAgICAgICBcInZhbHVlU3RyaW5nXCI6IFwiaGw3LmZoaXIudXMubWRpI2N1cnJlbnRcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgXCJuYW1lXCI6IFwicmVzb3VyY2VcIixcbiAgICAgICAgICAgIFwicmVzb3VyY2VcIjogZmhpclJlc291cmNlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgXCJuYW1lXCI6IFwiaW5jbHVkZUZvcm1hdHRlZFJlc291cmNlXCIsXG4gICAgICAgICAgICBcInZhbHVlQm9vbGVhblwiOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9XG5cbiAgICAgIGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKVxuICAgICAgICAuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vZmhpcitqc29uJyk7XG4gICAgfSBlbHNlIGlmIChyZXNvdXJjZUZvcm1hdCA9PT0gJ3htbCcpIHtcblxuICAgICAgcmVxdWVzdERhdGEgPVxuICAgICAgICBgPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiVVRGLThcIj8+XG4gICAgICA8UGFyYW1ldGVycyB4bWxucz1cImh0dHA6Ly9obDcub3JnL2ZoaXJcIj5cbiAgICAgICAgPHBhcmFtZXRlcj5cbiAgICAgICAgICA8bmFtZSB2YWx1ZT1cImlnXCIgLz5cbiAgICAgICAgICA8dmFsdWVTdHJpbmcgdmFsdWU9XCJobDcuZmhpci51cy5tZGkjY3VycmVudFwiIC8+XG4gICAgICAgIDwvcGFyYW1ldGVyPlxuICAgICAgICA8cGFyYW1ldGVyPlxuICAgICAgICAgIDxuYW1lIHZhbHVlPVwicmVzb3VyY2VcIiAvPlxuICAgICAgICAgICAgPHJlc291cmNlPlxuICAgICAgICAgICAgICAke2ZoaXJSZXNvdXJjZX1cbiAgICAgICAgICAgIDwvcmVzb3VyY2U+XG4gICAgICAgICAgPC9wYXJhbWV0ZXI+XG4gICAgICA8L1BhcmFtZXRlcnM+YDtcbiAgICAgIGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKVxuICAgICAgICAuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vZmhpcit4bWwnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5wcm9kVXJpICsgXCIvJHZhbGlkYXRlXCIsIHJlcXVlc3REYXRhLCB7aGVhZGVyczogaGVhZGVyc30pLnBpcGUobWFwKChyZXN1bHQ6IGFueSkgPT4gKFxuICAgICAgcmVzdWx0IGFzIE9iamVjdFxuICAgICkpKTtcbiAgfVxufVxuIl19