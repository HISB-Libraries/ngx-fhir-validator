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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: FhirValidatorService, deps: [{ token: i1.HttpClient }, { token: i2.MatSnackBar }, { token: i3.EnvironmentHandlerService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: FhirValidatorService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: FhirValidatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }, { type: i2.MatSnackBar }, { type: i3.EnvironmentHandlerService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmhpci12YWxpZGF0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1maGlyLXZhbGlkYXRvci9zcmMvbGliL3NlcnZpY2VzL2ZoaXItdmFsaWRhdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFTLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQWEsV0FBVyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDN0QsT0FBTyxFQUFDLEdBQUcsRUFBYSxNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFPckMsTUFBTSxPQUFPLG9CQUFvQjtJQUUvQixZQUNVLElBQWdCLEVBQ2hCLFNBQXNCLEVBQ3RCLGtCQUE2QztRQUY3QyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGNBQVMsR0FBVCxTQUFTLENBQWE7UUFDdEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUEyQjtRQUNyRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQ3RFLENBQUM7SUFBQSxDQUFDO0lBRUYsZ0JBQWdCLENBQUMsYUFBcUIsZUFBZTtRQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFO1lBQ25DLGtCQUFrQixFQUFFLFFBQVE7WUFDNUIsZ0JBQWdCLEVBQUUsS0FBSztZQUN2QixVQUFVLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDM0IsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsa0JBQWtCLENBQUMsVUFBa0I7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtZQUNuQyxrQkFBa0IsRUFBRSxRQUFRO1lBQzVCLGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsVUFBVSxFQUFFLENB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QU0sRUFBRSwwQkFBMEI7d0JBQ2xDLGNBQWMsRUFBRSxJQUFJO3FCQUNyQjtpQkFDRjthQUNGLENBQUE7WUFFRCxPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUU7aUJBQ3hCLEdBQUcsQ0FBQyxjQUFjLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztTQUNqRDthQUNJLElBQUksY0FBYyxLQUFLLEtBQUssRUFBRTtZQUVqQyxXQUFXO2dCQUNUOzs7a0NBRzBCLEVBQUU7Ozs7Ozs7Ozs7Ozs7Z0JBYXBCLFlBQVk7OztvQkFHUixDQUFDO1lBQ2YsT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFO2lCQUN4QixHQUFHLENBQUMsY0FBYyxFQUFFLHNCQUFzQixDQUFDLENBQUM7U0FDaEQ7UUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxFQUFFLFdBQVcsRUFBRSxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRSxDQUNoSCxNQUNELENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQzs4R0EvS1Usb0JBQW9CO2tIQUFwQixvQkFBb0IsY0FGbkIsTUFBTTs7MkZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VmFsaWRhdG9yQ29uc3RhbnRzfSBmcm9tIFwiLi4vcHJvdmlkZXJzL3ZhbGlkYXRvci1jb25zdGFudHNcIjtcbmltcG9ydCB7SHR0cENsaWVudCwgSHR0cEhlYWRlcnN9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHttYXAsIE9ic2VydmFibGV9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge01hdFNuYWNrQmFyfSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyXCI7XG5pbXBvcnQge0Vudmlyb25tZW50SGFuZGxlclNlcnZpY2V9IGZyb20gXCIuLi9lbnZpcm9ubWVudC1oYW5kbGVyLnNlcnZpY2VcIjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRmhpclZhbGlkYXRvclNlcnZpY2Uge1xuICBwcml2YXRlIHJlYWRvbmx5IHNlcnZlckJhc2VVcmw6IHN0cmluZztcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgX3NuYWNrQmFyOiBNYXRTbmFja0JhcixcbiAgICBwcml2YXRlIGVudmlyb25tZW50SGFuZGxlcjogRW52aXJvbm1lbnRIYW5kbGVyU2VydmljZSkge1xuICAgIHRoaXMuc2VydmVyQmFzZVVybCA9IHRoaXMuZW52aXJvbm1lbnRIYW5kbGVyLmdldEZoaXJTZXJ2ZXJCYXNlVVJMKCk7XG4gIH07XG5cbiAgc2hvd0Vycm9yTWVzc2FnZShtZXNzYWdlU3RyOiBzdHJpbmcgPSAnU2VydmVyIEVycm9yLicpe1xuICAgIHRoaXMuX3NuYWNrQmFyLm9wZW4obWVzc2FnZVN0ciwgJ3gnICx7XG4gICAgICBob3Jpem9udGFsUG9zaXRpb246ICdjZW50ZXInLFxuICAgICAgdmVydGljYWxQb3NpdGlvbjogJ3RvcCcsXG4gICAgICBwYW5lbENsYXNzOiBbJ2Vycm9yLWNvbG9yJ10sXG4gICAgICBkdXJhdGlvbjogNTAwMFxuICAgIH0pO1xuICB9XG5cbiAgc2hvd1N1Y2Nlc3NNZXNzYWdlKG1lc3NhZ2VTdHI6IHN0cmluZyl7XG4gICAgdGhpcy5fc25hY2tCYXIub3BlbihtZXNzYWdlU3RyLCAneCcgLHtcbiAgICAgIGhvcml6b250YWxQb3NpdGlvbjogJ2NlbnRlcicsXG4gICAgICB2ZXJ0aWNhbFBvc2l0aW9uOiAndG9wJyxcbiAgICAgIHBhbmVsQ2xhc3M6IFsnbWF0LXRvb2xiYXInLCAnbWF0LXByaW1hcnknXSxcbiAgICAgIGR1cmF0aW9uOiAzMDAwXG4gICAgfSk7XG4gIH1cblxuICBjbG9zZU5vdGlmaWNhdGlvbigpe1xuICAgIHRoaXMuX3NuYWNrQmFyLmRpc21pc3MoKTtcbiAgfVxuXG4gIGdldFVpVmFsaWRhdGlvbk1lc3NhZ2VzKGZoaXJSZXNvdXJjZTogYW55LCByZXNvdXJjZUZvcm1hdDogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgIGlmKCFmaGlyUmVzb3VyY2UgfHwgKCEhZmhpclJlc291cmNlICYmIE9iamVjdC5rZXlzKGZoaXJSZXNvdXJjZSkubGVuZ3RoID09PSAwKSkge1xuICAgICAgcmV0dXJuIFwiUGxlYXNlIGVudGVyIGEgRkhJUiByZXNvdXJjZSBmb3IgdmFsaWRhdGlvbi5cIjtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVzb3VyY2VGb3JtYXQgPT09ICdqc29uJyl7XG4gICAgICBpZighdGhpcy5pc0pzb24oZmhpclJlc291cmNlKSl7XG4gICAgICAgIC8vIENvdWxkIG5vdCBwYXJzZSB0aGUgcmVzb3VyY2UgYXQgYWxsLiBJdCBpcyBub3QgYSB2YWxpZCBKU09OIGFzIGZhciBhcyB0aGUganMgcGFyc2VyIGlzIGNvbmNlcm5lZC5cbiAgICAgICAgcmV0dXJuIFwiSW52YWxpZCBqc29uIGZvcm1hdCBkZXRlY3RlZC5cIjtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYoIUpTT04ucGFyc2UoZmhpclJlc291cmNlKS5yZXNvdXJjZVR5cGUpe1xuICAgICAgICByZXR1cm4gXCJNaXNzaW5nIHJlcXVpcmVkIHJlc291cmNlVHlwZSBwcm9wZXJ0eS5cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAocmVzb3VyY2VGb3JtYXQgPT09ICd4bWwnKSB7XG4gICAgICBpZighdGhpcy5pc1htbFN0cmluZyhmaGlyUmVzb3VyY2UpKXtcbiAgICAgICAgLy8gQ291bGQgbm90IHBhcnNlIHRoZSByZXNvdXJjZSBhdCBhbGwuIEl0IGlzIG5vdCBhIHZhbGlkIFhNTCBhcyBmYXIgYXMgdGhlIGpzIHBhcnNlciBpcyBjb25jZXJuZWQuXG4gICAgICAgIHJldHVybiBcIkludmFsaWQgeG1sIGZvcm1hdCBkZXRlY3RlZC5cIjtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBUT0RPIHdlIG1heSBuZWVkIHRvIHRvIHNvbWUgZXJyb3IgaGFuZGxpbmcgaGVyZVxuICAgICAgICBsZXQgZmhpclJlc291cmNlWE1MOiBhbnkgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKGZoaXJSZXNvdXJjZSwgJ3RleHQveG1sJyk7XG4gICAgICAgIGNvbnN0IHJlc291cmNlVHlwZSA9IGZoaXJSZXNvdXJjZVhNTC5jaGlsZE5vZGVzWzBdLm5vZGVOYW1lO1xuICAgICAgICBjb25zdCB4bWxuc0F0dHJpYnV0ZSA9IGZoaXJSZXNvdXJjZVhNTC5xdWVyeVNlbGVjdG9yKHJlc291cmNlVHlwZSkuZ2V0QXR0cmlidXRlKCd4bWxucycpO1xuXG4gICAgICAgIC8vIGFsbCBGSElSIHJlc291cmNlcyBzaG91bGQgaGF2ZSB4bWxucz1cImh0dHA6Ly9obDcub3JnL2ZoaXJcIlxuICAgICAgICBpZigheG1sbnNBdHRyaWJ1dGUgfHwgeG1sbnNBdHRyaWJ1dGUgIT0gJ2h0dHA6Ly9obDcub3JnL2ZoaXInKXtcbiAgICAgICAgICByZXR1cm4gXCJJbnZhbGlkIG9yIG1pc3NpbmcgeG1sbnMgYXR0cmlidXRlLlwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGRpZCBub3QgZmluZCBhbnkgb2J2aW91cyBlcnJvcnMsIHNvIHJldHVybmluZyBub3RoaW5nXG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgaXNKc29uKHN0cjogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKHR5cGVvZiBzdHIgIT0gJ3N0cmluZycpXG4gICAgICBzdHIgPSBKU09OLnN0cmluZ2lmeShzdHIpO1xuICAgIHRyeSB7XG4gICAgICBKU09OLnBhcnNlKHN0ci50cmltKCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc1htbFN0cmluZyhzdHI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICBjb25zdCB0aGVEb20gPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKHN0cj8udHJpbSgpLCAnYXBwbGljYXRpb24veG1sJyk7XG4gICAgICByZXR1cm4gISh0aGVEb20uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3BhcnNlcmVycm9yJykubGVuZ3RoID4gMCk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgYmVhdXRpZnlKU09OKHN0cjogc3RyaW5nKTogc3RyaW5ne1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShKU09OLnBhcnNlKHN0ciksIG51bGwsIDIpO1xuICB9XG5cbiAgLy8gSSBib3Jyb3dlZCBzb21lIHJlZ2V4IGNvZGVcbiAgYmVhdXRpZnlYTUwoc3RyOiBzdHJpbmcpOiBzdHJpbmd7XG4gICAgbGV0IGZvcm1hdHRlZCA9ICcnLCBpbmRlbnQ9ICcnO1xuICAgIGNvbnN0IHRhYj0nICAnO1xuICAgIHN0ci5zcGxpdCgvPlxccyo8LykuZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XG4gICAgICBpZiAobm9kZS5tYXRjaCggL15cXC9cXHcvICkpIHtcbiAgICAgICAgaW5kZW50ID0gaW5kZW50LnN1YnN0cmluZyh0YWIubGVuZ3RoKTtcbiAgICAgIH1cbiAgICAgIGZvcm1hdHRlZCArPSBpbmRlbnQgKyAnPCcgKyBub2RlICsgJz5cXHJcXG4nO1xuICAgICAgaWYgKG5vZGUubWF0Y2goIC9ePD9cXHdbXj5dKlteXFwvXSQvICkpe1xuICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmb3JtYXR0ZWQuc3Vic3RyaW5nKDEsIGZvcm1hdHRlZC5sZW5ndGgtMyk7XG4gIH1cblxuICB2YWxpZGF0ZUZoaXJSZXNvdXJjZShmaGlyUmVzb3VyY2U6IGFueSwgcmVzb3VyY2VGb3JtYXQ6IHN0cmluZywgaWc6IHN0cmluZyk6ICBPYnNlcnZhYmxlPGFueT4ge1xuXG4gICAgbGV0IGhlYWRlcnM6IGFueXwgbnVsbD0gbnVsbDtcbiAgICBsZXQgcmVxdWVzdERhdGE6IGFueXwgbnVsbCA9IG51bGw7XG5cbiAgICAvLyBSZXF1ZXN0cyBhcmUgZm9ybWVkIGluIG9yZGVyIHRvIGJlIGNvbnN1bWVkIGJ5IHRoZSBBUEkuXG4gICAgLy8gTm90ZSB0aGF0IHJlcXVlc3REYXRhIGlzIG5vdGhpbmcgYnV0IGEgd3JhcHBlciB0byB0aGUgcmVxdWVzdCBhbmQgc2hvdWxkIG5ldmVyIGNoYW5nZS5cbiAgICBpZiAocmVzb3VyY2VGb3JtYXQgPT09ICdqc29uJykge1xuICAgICAgcmVxdWVzdERhdGEgPSB7XG4gICAgICAgIFwicmVzb3VyY2VUeXBlXCI6IFwiUGFyYW1ldGVyc1wiLFxuICAgICAgICBcInBhcmFtZXRlclwiOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgXCJuYW1lXCI6IFwiaWdcIixcbiAgICAgICAgICAgIFwidmFsdWVTdHJpbmdcIjogaWdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBcInJlc291cmNlXCIsXG4gICAgICAgICAgICBcInJlc291cmNlXCI6IGZoaXJSZXNvdXJjZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBcImluY2x1ZGVGb3JtYXR0ZWRSZXNvdXJjZVwiLFxuICAgICAgICAgICAgXCJ2YWx1ZUJvb2xlYW5cIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgXCJuYW1lXCI6IFwiZm9ybWF0XCIsXG4gICAgICAgICAgICBcInZhbHVlU3RyaW5nXCI6IFwiYXBwbGljYXRpb24vZmhpcitqc29uXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBcImluY2x1ZGVGb3JtYXR0ZWRSZXNvdXJjZVwiLFxuICAgICAgICAgICAgXCJ2YWx1ZUJvb2xlYW5cIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgIF1cbiAgICAgIH1cblxuICAgICAgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXG4gICAgICAgIC5zZXQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9maGlyK2pzb24nKTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVzb3VyY2VGb3JtYXQgPT09ICd4bWwnKSB7XG5cbiAgICAgIHJlcXVlc3REYXRhID1cbiAgICAgICAgYDxQYXJhbWV0ZXJzIHhtbG5zPVwiaHR0cDovL2hsNy5vcmcvZmhpclwiPlxuICAgICAgICAgIDxwYXJhbWV0ZXI+XG4gICAgICAgICAgICA8bmFtZSB2YWx1ZT1cImlnXCIvPlxuICAgICAgICAgICAgPHZhbHVlU3RyaW5nIHZhbHVlPVwiJHtpZ31cIi8+XG4gICAgICAgICAgPC9wYXJhbWV0ZXI+XG4gICAgICAgICAgPHBhcmFtZXRlcj5cbiAgICAgICAgICAgIDxuYW1lIHZhbHVlPVwiZm9ybWF0XCIvPlxuICAgICAgICAgICAgPHZhbHVlU3RyaW5nIHZhbHVlPVwiYXBwbGljYXRpb24vZmhpcit4bWxcIi8+XG4gICAgICAgICAgPC9wYXJhbWV0ZXI+XG4gICAgICAgICAgPHBhcmFtZXRlcj5cbiAgICAgICAgICAgIDxuYW1lIHZhbHVlPVwiaW5jbHVkZUZvcm1hdHRlZFJlc291cmNlXCIvPlxuICAgICAgICAgICAgPHZhbHVlQm9vbGVhbiB2YWx1ZT1cInRydWVcIi8+XG4gICAgICAgICAgPC9wYXJhbWV0ZXI+XG4gICAgICAgICAgPHBhcmFtZXRlcj5cbiAgICAgICAgICAgIDxuYW1lIHZhbHVlPVwicmVzb3VyY2VcIiAvPlxuICAgICAgICAgICAgPHJlc291cmNlPlxuICAgICAgICAgICAgICAke2ZoaXJSZXNvdXJjZX1cbiAgICAgICAgICAgIDwvcmVzb3VyY2U+XG4gICAgICAgICAgPC9wYXJhbWV0ZXI+XG4gICAgICA8L1BhcmFtZXRlcnM+YDtcbiAgICAgIGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKVxuICAgICAgICAuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vZmhpcit4bWwnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5zZXJ2ZXJCYXNlVXJsICsgXCIkdmFsaWRhdGVcIiwgcmVxdWVzdERhdGEsIHtoZWFkZXJzOiBoZWFkZXJzfSkucGlwZShtYXAoKHJlc3VsdDogYW55KSA9PiAoXG4gICAgICByZXN1bHQgYXMgT2JqZWN0XG4gICAgKSkpO1xuICB9XG59XG4iXX0=