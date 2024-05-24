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
                    },
                    {
                        "name": "includeFormattedResource",
                        "valueBoolean": true
                    },
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FhirValidatorService, deps: [{ token: i1.HttpClient }, { token: i2.MatSnackBar }, { token: i3.EnvironmentHandlerService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FhirValidatorService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FhirValidatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }, { type: i2.MatSnackBar }, { type: i3.EnvironmentHandlerService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmhpci12YWxpZGF0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1maGlyLXZhbGlkYXRvci9zcmMvbGliL3NlcnZpY2VzL2ZoaXItdmFsaWRhdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFTLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0QsT0FBTyxFQUFDLEdBQUcsRUFBYSxNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFPckMsTUFBTSxPQUFPLG9CQUFvQjtJQUUvQixZQUNVLElBQWdCLEVBQ2hCLFNBQXNCLEVBQ3RCLGtCQUE2QztRQUY3QyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGNBQVMsR0FBVCxTQUFTLENBQWE7UUFDdEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUEyQjtRQUNyRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQ3RFLENBQUM7SUFBQSxDQUFDO0lBRUYsZ0JBQWdCLENBQUMsYUFBcUIsZUFBZTtRQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFO1lBQ25DLGtCQUFrQixFQUFFLFFBQVE7WUFDNUIsZ0JBQWdCLEVBQUUsS0FBSztZQUN2QixVQUFVLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDM0IsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsa0JBQWtCLENBQUMsVUFBa0I7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtZQUNuQyxrQkFBa0IsRUFBRSxRQUFRO1lBQzVCLGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsVUFBVSxFQUFFLENB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QUFFLFlBQVk7cUJBQ3pCO29CQUNEO3dCQUNFLE1BQU0sRUFBRSwwQkFBMEI7d0JBQ2xDLGNBQWMsRUFBRSxJQUFJO3FCQUNyQjtvQkFDRDt3QkFDRSxNQUFNLEVBQUUsUUFBUTt3QkFDaEIsYUFBYSxFQUFFLHVCQUF1QjtxQkFDdkM7b0JBQ0Q7d0JBQ0UsTUFBTSxFQUFFLDBCQUEwQjt3QkFDbEMsY0FBYyxFQUFFLElBQUk7cUJBQ3JCO2lCQUNGO2FBQ0YsQ0FBQTtZQUVELE9BQU8sR0FBRyxJQUFJLFdBQVcsRUFBRTtpQkFDeEIsR0FBRyxDQUFDLGNBQWMsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBQ2xELENBQUM7YUFDSSxJQUFJLGNBQWMsS0FBSyxLQUFLLEVBQUUsQ0FBQztZQUVsQyxXQUFXO2dCQUNUOzs7a0NBRzBCLEVBQUU7Ozs7Ozs7Ozs7Ozs7Z0JBYXBCLFlBQVk7OztvQkFHUixDQUFDO1lBQ2YsT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFO2lCQUN4QixHQUFHLENBQUMsY0FBYyxFQUFFLHNCQUFzQixDQUFDLENBQUM7UUFDakQsQ0FBQztRQUVELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLEVBQUUsV0FBVyxFQUFFLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFLENBQ2hILE1BQ0QsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDOzhHQS9LVSxvQkFBb0I7a0hBQXBCLG9CQUFvQixjQUZuQixNQUFNOzsyRkFFUCxvQkFBb0I7a0JBSGhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtWYWxpZGF0b3JDb25zdGFudHN9IGZyb20gXCIuLi9wcm92aWRlcnMvdmFsaWRhdG9yLWNvbnN0YW50c1wiO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7bWFwLCBPYnNlcnZhYmxlfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtNYXRTbmFja0Jhcn0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhclwiO1xuaW1wb3J0IHtFbnZpcm9ubWVudEhhbmRsZXJTZXJ2aWNlfSBmcm9tIFwiLi4vZW52aXJvbm1lbnQtaGFuZGxlci5zZXJ2aWNlXCI7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEZoaXJWYWxpZGF0b3JTZXJ2aWNlIHtcbiAgcHJpdmF0ZSByZWFkb25seSBzZXJ2ZXJCYXNlVXJsOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIF9zbmFja0JhcjogTWF0U25hY2tCYXIsXG4gICAgcHJpdmF0ZSBlbnZpcm9ubWVudEhhbmRsZXI6IEVudmlyb25tZW50SGFuZGxlclNlcnZpY2UpIHtcbiAgICB0aGlzLnNlcnZlckJhc2VVcmwgPSB0aGlzLmVudmlyb25tZW50SGFuZGxlci5nZXRGaGlyU2VydmVyQmFzZVVSTCgpO1xuICB9O1xuXG4gIHNob3dFcnJvck1lc3NhZ2UobWVzc2FnZVN0cjogc3RyaW5nID0gJ1NlcnZlciBFcnJvci4nKXtcbiAgICB0aGlzLl9zbmFja0Jhci5vcGVuKG1lc3NhZ2VTdHIsICd4JyAse1xuICAgICAgaG9yaXpvbnRhbFBvc2l0aW9uOiAnY2VudGVyJyxcbiAgICAgIHZlcnRpY2FsUG9zaXRpb246ICd0b3AnLFxuICAgICAgcGFuZWxDbGFzczogWydlcnJvci1jb2xvciddLFxuICAgICAgZHVyYXRpb246IDUwMDBcbiAgICB9KTtcbiAgfVxuXG4gIHNob3dTdWNjZXNzTWVzc2FnZShtZXNzYWdlU3RyOiBzdHJpbmcpe1xuICAgIHRoaXMuX3NuYWNrQmFyLm9wZW4obWVzc2FnZVN0ciwgJ3gnICx7XG4gICAgICBob3Jpem9udGFsUG9zaXRpb246ICdjZW50ZXInLFxuICAgICAgdmVydGljYWxQb3NpdGlvbjogJ3RvcCcsXG4gICAgICBwYW5lbENsYXNzOiBbJ21hdC10b29sYmFyJywgJ21hdC1wcmltYXJ5J10sXG4gICAgICBkdXJhdGlvbjogMzAwMFxuICAgIH0pO1xuICB9XG5cbiAgY2xvc2VOb3RpZmljYXRpb24oKXtcbiAgICB0aGlzLl9zbmFja0Jhci5kaXNtaXNzKCk7XG4gIH1cblxuICBnZXRVaVZhbGlkYXRpb25NZXNzYWdlcyhmaGlyUmVzb3VyY2U6IGFueSwgcmVzb3VyY2VGb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgICBpZighZmhpclJlc291cmNlIHx8ICghIWZoaXJSZXNvdXJjZSAmJiBPYmplY3Qua2V5cyhmaGlyUmVzb3VyY2UpLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgIHJldHVybiBcIlBsZWFzZSBlbnRlciBhIEZISVIgcmVzb3VyY2UgZm9yIHZhbGlkYXRpb24uXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlc291cmNlRm9ybWF0ID09PSAnanNvbicpe1xuICAgICAgaWYoIXRoaXMuaXNKc29uKGZoaXJSZXNvdXJjZSkpe1xuICAgICAgICAvLyBDb3VsZCBub3QgcGFyc2UgdGhlIHJlc291cmNlIGF0IGFsbC4gSXQgaXMgbm90IGEgdmFsaWQgSlNPTiBhcyBmYXIgYXMgdGhlIGpzIHBhcnNlciBpcyBjb25jZXJuZWQuXG4gICAgICAgIHJldHVybiBcIkludmFsaWQganNvbiBmb3JtYXQgZGV0ZWN0ZWQuXCI7XG4gICAgICB9XG4gICAgICBlbHNlIGlmKCFKU09OLnBhcnNlKGZoaXJSZXNvdXJjZSkucmVzb3VyY2VUeXBlKXtcbiAgICAgICAgcmV0dXJuIFwiTWlzc2luZyByZXF1aXJlZCByZXNvdXJjZVR5cGUgcHJvcGVydHkuXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlc291cmNlRm9ybWF0ID09PSAneG1sJykge1xuICAgICAgaWYoIXRoaXMuaXNYbWxTdHJpbmcoZmhpclJlc291cmNlKSl7XG4gICAgICAgIC8vIENvdWxkIG5vdCBwYXJzZSB0aGUgcmVzb3VyY2UgYXQgYWxsLiBJdCBpcyBub3QgYSB2YWxpZCBYTUwgYXMgZmFyIGFzIHRoZSBqcyBwYXJzZXIgaXMgY29uY2VybmVkLlxuICAgICAgICByZXR1cm4gXCJJbnZhbGlkIHhtbCBmb3JtYXQgZGV0ZWN0ZWQuXCI7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gVE9ETyB3ZSBtYXkgbmVlZCB0byB0byBzb21lIGVycm9yIGhhbmRsaW5nIGhlcmVcbiAgICAgICAgbGV0IGZoaXJSZXNvdXJjZVhNTDogYW55ID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhmaGlyUmVzb3VyY2UsICd0ZXh0L3htbCcpO1xuICAgICAgICBjb25zdCByZXNvdXJjZVR5cGUgPSBmaGlyUmVzb3VyY2VYTUwuY2hpbGROb2Rlc1swXS5ub2RlTmFtZTtcbiAgICAgICAgY29uc3QgeG1sbnNBdHRyaWJ1dGUgPSBmaGlyUmVzb3VyY2VYTUwucXVlcnlTZWxlY3RvcihyZXNvdXJjZVR5cGUpLmdldEF0dHJpYnV0ZSgneG1sbnMnKTtcblxuICAgICAgICAvLyBhbGwgRkhJUiByZXNvdXJjZXMgc2hvdWxkIGhhdmUgeG1sbnM9XCJodHRwOi8vaGw3Lm9yZy9maGlyXCJcbiAgICAgICAgaWYoIXhtbG5zQXR0cmlidXRlIHx8IHhtbG5zQXR0cmlidXRlICE9ICdodHRwOi8vaGw3Lm9yZy9maGlyJyl7XG4gICAgICAgICAgcmV0dXJuIFwiSW52YWxpZCBvciBtaXNzaW5nIHhtbG5zIGF0dHJpYnV0ZS5cIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBkaWQgbm90IGZpbmQgYW55IG9idmlvdXMgZXJyb3JzLCBzbyByZXR1cm5pbmcgbm90aGluZ1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGlzSnNvbihzdHI6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmICh0eXBlb2Ygc3RyICE9ICdzdHJpbmcnKVxuICAgICAgc3RyID0gSlNPTi5zdHJpbmdpZnkoc3RyKTtcbiAgICB0cnkge1xuICAgICAgSlNPTi5wYXJzZShzdHIudHJpbSgpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNYbWxTdHJpbmcoc3RyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgY29uc3QgdGhlRG9tID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhzdHI/LnRyaW0oKSwgJ2FwcGxpY2F0aW9uL3htbCcpO1xuICAgICAgcmV0dXJuICEodGhlRG9tLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwYXJzZXJlcnJvcicpLmxlbmd0aCA+IDApO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGJlYXV0aWZ5SlNPTihzdHI6IHN0cmluZyk6IHN0cmluZ3tcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoSlNPTi5wYXJzZShzdHIpLCBudWxsLCAyKTtcbiAgfVxuXG4gIC8vIEkgYm9ycm93ZWQgc29tZSByZWdleCBjb2RlXG4gIGJlYXV0aWZ5WE1MKHN0cjogc3RyaW5nKTogc3RyaW5ne1xuICAgIGxldCBmb3JtYXR0ZWQgPSAnJywgaW5kZW50PSAnJztcbiAgICBjb25zdCB0YWI9JyAgJztcbiAgICBzdHIuc3BsaXQoLz5cXHMqPC8pLmZvckVhY2goZnVuY3Rpb24obm9kZSkge1xuICAgICAgaWYgKG5vZGUubWF0Y2goIC9eXFwvXFx3LyApKSB7XG4gICAgICAgIGluZGVudCA9IGluZGVudC5zdWJzdHJpbmcodGFiLmxlbmd0aCk7XG4gICAgICB9XG4gICAgICBmb3JtYXR0ZWQgKz0gaW5kZW50ICsgJzwnICsgbm9kZSArICc+XFxyXFxuJztcbiAgICAgIGlmIChub2RlLm1hdGNoKCAvXjw/XFx3W14+XSpbXlxcL10kLyApKXtcbiAgICAgICAgaW5kZW50ICs9IHRhYjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZm9ybWF0dGVkLnN1YnN0cmluZygxLCBmb3JtYXR0ZWQubGVuZ3RoLTMpO1xuICB9XG5cbiAgdmFsaWRhdGVGaGlyUmVzb3VyY2UoZmhpclJlc291cmNlOiBhbnksIHJlc291cmNlRm9ybWF0OiBzdHJpbmcsIGlnOiBzdHJpbmcpOiAgT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgIGxldCBoZWFkZXJzOiBhbnl8IG51bGw9IG51bGw7XG4gICAgbGV0IHJlcXVlc3REYXRhOiBhbnl8IG51bGwgPSBudWxsO1xuXG4gICAgLy8gUmVxdWVzdHMgYXJlIGZvcm1lZCBpbiBvcmRlciB0byBiZSBjb25zdW1lZCBieSB0aGUgQVBJLlxuICAgIC8vIE5vdGUgdGhhdCByZXF1ZXN0RGF0YSBpcyBub3RoaW5nIGJ1dCBhIHdyYXBwZXIgdG8gdGhlIHJlcXVlc3QgYW5kIHNob3VsZCBuZXZlciBjaGFuZ2UuXG4gICAgaWYgKHJlc291cmNlRm9ybWF0ID09PSAnanNvbicpIHtcbiAgICAgIHJlcXVlc3REYXRhID0ge1xuICAgICAgICBcInJlc291cmNlVHlwZVwiOiBcIlBhcmFtZXRlcnNcIixcbiAgICAgICAgXCJwYXJhbWV0ZXJcIjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBcImlnXCIsXG4gICAgICAgICAgICBcInZhbHVlU3RyaW5nXCI6IGlnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBcIm5hbWVcIjogXCJyZXNvdXJjZVwiLFxuICAgICAgICAgICAgXCJyZXNvdXJjZVwiOiBmaGlyUmVzb3VyY2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBcIm5hbWVcIjogXCJpbmNsdWRlRm9ybWF0dGVkUmVzb3VyY2VcIixcbiAgICAgICAgICAgIFwidmFsdWVCb29sZWFuXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBcImZvcm1hdFwiLFxuICAgICAgICAgICAgXCJ2YWx1ZVN0cmluZ1wiOiBcImFwcGxpY2F0aW9uL2ZoaXIranNvblwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBcIm5hbWVcIjogXCJpbmNsdWRlRm9ybWF0dGVkUmVzb3VyY2VcIixcbiAgICAgICAgICAgIFwidmFsdWVCb29sZWFuXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICBdXG4gICAgICB9XG5cbiAgICAgIGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKVxuICAgICAgICAuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vZmhpcitqc29uJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlc291cmNlRm9ybWF0ID09PSAneG1sJykge1xuXG4gICAgICByZXF1ZXN0RGF0YSA9XG4gICAgICAgIGA8UGFyYW1ldGVycyB4bWxucz1cImh0dHA6Ly9obDcub3JnL2ZoaXJcIj5cbiAgICAgICAgICA8cGFyYW1ldGVyPlxuICAgICAgICAgICAgPG5hbWUgdmFsdWU9XCJpZ1wiLz5cbiAgICAgICAgICAgIDx2YWx1ZVN0cmluZyB2YWx1ZT1cIiR7aWd9XCIvPlxuICAgICAgICAgIDwvcGFyYW1ldGVyPlxuICAgICAgICAgIDxwYXJhbWV0ZXI+XG4gICAgICAgICAgICA8bmFtZSB2YWx1ZT1cImZvcm1hdFwiLz5cbiAgICAgICAgICAgIDx2YWx1ZVN0cmluZyB2YWx1ZT1cImFwcGxpY2F0aW9uL2ZoaXIreG1sXCIvPlxuICAgICAgICAgIDwvcGFyYW1ldGVyPlxuICAgICAgICAgIDxwYXJhbWV0ZXI+XG4gICAgICAgICAgICA8bmFtZSB2YWx1ZT1cImluY2x1ZGVGb3JtYXR0ZWRSZXNvdXJjZVwiLz5cbiAgICAgICAgICAgIDx2YWx1ZUJvb2xlYW4gdmFsdWU9XCJ0cnVlXCIvPlxuICAgICAgICAgIDwvcGFyYW1ldGVyPlxuICAgICAgICAgIDxwYXJhbWV0ZXI+XG4gICAgICAgICAgICA8bmFtZSB2YWx1ZT1cInJlc291cmNlXCIgLz5cbiAgICAgICAgICAgIDxyZXNvdXJjZT5cbiAgICAgICAgICAgICAgJHtmaGlyUmVzb3VyY2V9XG4gICAgICAgICAgICA8L3Jlc291cmNlPlxuICAgICAgICAgIDwvcGFyYW1ldGVyPlxuICAgICAgPC9QYXJhbWV0ZXJzPmA7XG4gICAgICBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKClcbiAgICAgICAgLnNldCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2ZoaXIreG1sJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuc2VydmVyQmFzZVVybCArIFwiJHZhbGlkYXRlXCIsIHJlcXVlc3REYXRhLCB7aGVhZGVyczogaGVhZGVyc30pLnBpcGUobWFwKChyZXN1bHQ6IGFueSkgPT4gKFxuICAgICAgcmVzdWx0IGFzIE9iamVjdFxuICAgICkpKTtcbiAgfVxufVxuIl19