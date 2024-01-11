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
            <valueString value="hl7.fhir.us.mdi#1.0.0"/>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmhpci12YWxpZGF0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1maGlyLXZhbGlkYXRvci9zcmMvbGliL3NlcnZpY2VzL2ZoaXItdmFsaWRhdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFTLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQWEsV0FBVyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDN0QsT0FBTyxFQUFDLEdBQUcsRUFBYSxNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFPckMsTUFBTSxPQUFPLG9CQUFvQjtJQUUvQixZQUNVLElBQWdCLEVBQ2hCLFNBQXNCLEVBQ3RCLGtCQUE2QztRQUY3QyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGNBQVMsR0FBVCxTQUFTLENBQWE7UUFDdEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUEyQjtRQUNyRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQ3RFLENBQUM7SUFBQSxDQUFDO0lBRUYsZ0JBQWdCLENBQUMsYUFBcUIsZUFBZTtRQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFO1lBQ25DLGtCQUFrQixFQUFFLFFBQVE7WUFDNUIsZ0JBQWdCLEVBQUUsS0FBSztZQUN2QixVQUFVLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDM0IsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsa0JBQWtCLENBQUMsVUFBa0I7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtZQUNuQyxrQkFBa0IsRUFBRSxRQUFRO1lBQzVCLGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsVUFBVSxFQUFFLENB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MEJBQTBCO3dCQUNsQyxjQUFjLEVBQUUsSUFBSTtxQkFDckI7aUJBQ0Y7YUFDRixDQUFBO1lBRUQsT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFO2lCQUN4QixHQUFHLENBQUMsY0FBYyxFQUFFLHVCQUF1QixDQUFDLENBQUM7U0FDakQ7YUFDSSxJQUFJLGNBQWMsS0FBSyxLQUFLLEVBQUU7WUFFakMsV0FBVztnQkFDVDs7Ozs7Ozs7Ozs7Ozs7OztnQkFnQlEsWUFBWTs7O29CQUdSLENBQUM7WUFDZixPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUU7aUJBQ3hCLEdBQUcsQ0FBQyxjQUFjLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztTQUNoRDtRQUVELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLEVBQUUsV0FBVyxFQUFFLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFLENBQ2hILE1BQ0QsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDOzhHQS9LVSxvQkFBb0I7a0hBQXBCLG9CQUFvQixjQUZuQixNQUFNOzsyRkFFUCxvQkFBb0I7a0JBSGhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtWYWxpZGF0b3JDb25zdGFudHN9IGZyb20gXCIuLi9wcm92aWRlcnMvdmFsaWRhdG9yLWNvbnN0YW50c1wiO1xuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwSGVhZGVyc30gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQge21hcCwgT2JzZXJ2YWJsZX0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7TWF0U25hY2tCYXJ9IGZyb20gXCJAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXJcIjtcbmltcG9ydCB7RW52aXJvbm1lbnRIYW5kbGVyU2VydmljZX0gZnJvbSBcIi4uL2Vudmlyb25tZW50LWhhbmRsZXIuc2VydmljZVwiO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBGaGlyVmFsaWRhdG9yU2VydmljZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgc2VydmVyQmFzZVVybDogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBfc25hY2tCYXI6IE1hdFNuYWNrQmFyLFxuICAgIHByaXZhdGUgZW52aXJvbm1lbnRIYW5kbGVyOiBFbnZpcm9ubWVudEhhbmRsZXJTZXJ2aWNlKSB7XG4gICAgdGhpcy5zZXJ2ZXJCYXNlVXJsID0gdGhpcy5lbnZpcm9ubWVudEhhbmRsZXIuZ2V0RmhpclNlcnZlckJhc2VVUkwoKTtcbiAgfTtcblxuICBzaG93RXJyb3JNZXNzYWdlKG1lc3NhZ2VTdHI6IHN0cmluZyA9ICdTZXJ2ZXIgRXJyb3IuJyl7XG4gICAgdGhpcy5fc25hY2tCYXIub3BlbihtZXNzYWdlU3RyLCAneCcgLHtcbiAgICAgIGhvcml6b250YWxQb3NpdGlvbjogJ2NlbnRlcicsXG4gICAgICB2ZXJ0aWNhbFBvc2l0aW9uOiAndG9wJyxcbiAgICAgIHBhbmVsQ2xhc3M6IFsnZXJyb3ItY29sb3InXSxcbiAgICAgIGR1cmF0aW9uOiA1MDAwXG4gICAgfSk7XG4gIH1cblxuICBzaG93U3VjY2Vzc01lc3NhZ2UobWVzc2FnZVN0cjogc3RyaW5nKXtcbiAgICB0aGlzLl9zbmFja0Jhci5vcGVuKG1lc3NhZ2VTdHIsICd4JyAse1xuICAgICAgaG9yaXpvbnRhbFBvc2l0aW9uOiAnY2VudGVyJyxcbiAgICAgIHZlcnRpY2FsUG9zaXRpb246ICd0b3AnLFxuICAgICAgcGFuZWxDbGFzczogWydtYXQtdG9vbGJhcicsICdtYXQtcHJpbWFyeSddLFxuICAgICAgZHVyYXRpb246IDMwMDBcbiAgICB9KTtcbiAgfVxuXG4gIGNsb3NlTm90aWZpY2F0aW9uKCl7XG4gICAgdGhpcy5fc25hY2tCYXIuZGlzbWlzcygpO1xuICB9XG5cbiAgZ2V0VWlWYWxpZGF0aW9uTWVzc2FnZXMoZmhpclJlc291cmNlOiBhbnksIHJlc291cmNlRm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgaWYoIWZoaXJSZXNvdXJjZSB8fCAoISFmaGlyUmVzb3VyY2UgJiYgT2JqZWN0LmtleXMoZmhpclJlc291cmNlKS5sZW5ndGggPT09IDApKSB7XG4gICAgICByZXR1cm4gXCJQbGVhc2UgZW50ZXIgYSBGSElSIHJlc291cmNlIGZvciB2YWxpZGF0aW9uLlwiO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZXNvdXJjZUZvcm1hdCA9PT0gJ2pzb24nKXtcbiAgICAgIGlmKCF0aGlzLmlzSnNvbihmaGlyUmVzb3VyY2UpKXtcbiAgICAgICAgLy8gQ291bGQgbm90IHBhcnNlIHRoZSByZXNvdXJjZSBhdCBhbGwuIEl0IGlzIG5vdCBhIHZhbGlkIEpTT04gYXMgZmFyIGFzIHRoZSBqcyBwYXJzZXIgaXMgY29uY2VybmVkLlxuICAgICAgICByZXR1cm4gXCJJbnZhbGlkIGpzb24gZm9ybWF0IGRldGVjdGVkLlwiO1xuICAgICAgfVxuICAgICAgZWxzZSBpZighSlNPTi5wYXJzZShmaGlyUmVzb3VyY2UpLnJlc291cmNlVHlwZSl7XG4gICAgICAgIHJldHVybiBcIk1pc3NpbmcgcmVxdWlyZWQgcmVzb3VyY2VUeXBlIHByb3BlcnR5LlwiO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChyZXNvdXJjZUZvcm1hdCA9PT0gJ3htbCcpIHtcbiAgICAgIGlmKCF0aGlzLmlzWG1sU3RyaW5nKGZoaXJSZXNvdXJjZSkpe1xuICAgICAgICAvLyBDb3VsZCBub3QgcGFyc2UgdGhlIHJlc291cmNlIGF0IGFsbC4gSXQgaXMgbm90IGEgdmFsaWQgWE1MIGFzIGZhciBhcyB0aGUganMgcGFyc2VyIGlzIGNvbmNlcm5lZC5cbiAgICAgICAgcmV0dXJuIFwiSW52YWxpZCB4bWwgZm9ybWF0IGRldGVjdGVkLlwiO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIFRPRE8gd2UgbWF5IG5lZWQgdG8gdG8gc29tZSBlcnJvciBoYW5kbGluZyBoZXJlXG4gICAgICAgIGxldCBmaGlyUmVzb3VyY2VYTUw6IGFueSA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoZmhpclJlc291cmNlLCAndGV4dC94bWwnKTtcbiAgICAgICAgY29uc3QgcmVzb3VyY2VUeXBlID0gZmhpclJlc291cmNlWE1MLmNoaWxkTm9kZXNbMF0ubm9kZU5hbWU7XG4gICAgICAgIGNvbnN0IHhtbG5zQXR0cmlidXRlID0gZmhpclJlc291cmNlWE1MLnF1ZXJ5U2VsZWN0b3IocmVzb3VyY2VUeXBlKS5nZXRBdHRyaWJ1dGUoJ3htbG5zJyk7XG5cbiAgICAgICAgLy8gYWxsIEZISVIgcmVzb3VyY2VzIHNob3VsZCBoYXZlIHhtbG5zPVwiaHR0cDovL2hsNy5vcmcvZmhpclwiXG4gICAgICAgIGlmKCF4bWxuc0F0dHJpYnV0ZSB8fCB4bWxuc0F0dHJpYnV0ZSAhPSAnaHR0cDovL2hsNy5vcmcvZmhpcicpe1xuICAgICAgICAgIHJldHVybiBcIkludmFsaWQgb3IgbWlzc2luZyB4bWxucyBhdHRyaWJ1dGUuXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gZGlkIG5vdCBmaW5kIGFueSBvYnZpb3VzIGVycm9ycywgc28gcmV0dXJuaW5nIG5vdGhpbmdcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBpc0pzb24oc3RyOiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAodHlwZW9mIHN0ciAhPSAnc3RyaW5nJylcbiAgICAgIHN0ciA9IEpTT04uc3RyaW5naWZ5KHN0cik7XG4gICAgdHJ5IHtcbiAgICAgIEpTT04ucGFyc2Uoc3RyLnRyaW0oKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzWG1sU3RyaW5nKHN0cjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgICAgIGNvbnN0IHRoZURvbSA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoc3RyPy50cmltKCksICdhcHBsaWNhdGlvbi94bWwnKTtcbiAgICAgIHJldHVybiAhKHRoZURvbS5nZXRFbGVtZW50c0J5VGFnTmFtZSgncGFyc2VyZXJyb3InKS5sZW5ndGggPiAwKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBiZWF1dGlmeUpTT04oc3RyOiBzdHJpbmcpOiBzdHJpbmd7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KEpTT04ucGFyc2Uoc3RyKSwgbnVsbCwgMik7XG4gIH1cblxuICAvLyBJIGJvcnJvd2VkIHNvbWUgcmVnZXggY29kZVxuICBiZWF1dGlmeVhNTChzdHI6IHN0cmluZyk6IHN0cmluZ3tcbiAgICBsZXQgZm9ybWF0dGVkID0gJycsIGluZGVudD0gJyc7XG4gICAgY29uc3QgdGFiPScgICc7XG4gICAgc3RyLnNwbGl0KC8+XFxzKjwvKS5mb3JFYWNoKGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIGlmIChub2RlLm1hdGNoKCAvXlxcL1xcdy8gKSkge1xuICAgICAgICBpbmRlbnQgPSBpbmRlbnQuc3Vic3RyaW5nKHRhYi5sZW5ndGgpO1xuICAgICAgfVxuICAgICAgZm9ybWF0dGVkICs9IGluZGVudCArICc8JyArIG5vZGUgKyAnPlxcclxcbic7XG4gICAgICBpZiAobm9kZS5tYXRjaCggL148P1xcd1tePl0qW15cXC9dJC8gKSl7XG4gICAgICAgIGluZGVudCArPSB0YWI7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvcm1hdHRlZC5zdWJzdHJpbmcoMSwgZm9ybWF0dGVkLmxlbmd0aC0zKTtcbiAgfVxuXG4gIHZhbGlkYXRlRmhpclJlc291cmNlKGZoaXJSZXNvdXJjZTogYW55LCByZXNvdXJjZUZvcm1hdDogc3RyaW5nKTogIE9ic2VydmFibGU8YW55PiB7XG5cbiAgICBsZXQgaGVhZGVyczogYW55fCBudWxsPSBudWxsO1xuICAgIGxldCByZXF1ZXN0RGF0YTogYW55fCBudWxsID0gbnVsbDtcblxuICAgIC8vIFJlcXVlc3RzIGFyZSBmb3JtZWQgaW4gb3JkZXIgdG8gYmUgY29uc3VtZWQgYnkgdGhlIEFQSS5cbiAgICAvLyBOb3RlIHRoYXQgcmVxdWVzdERhdGEgaXMgbm90aGluZyBidXQgYSB3cmFwcGVyIHRvIHRoZSByZXF1ZXN0IGFuZCBzaG91bGQgbmV2ZXIgY2hhbmdlLlxuICAgIGlmIChyZXNvdXJjZUZvcm1hdCA9PT0gJ2pzb24nKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IHtcbiAgICAgICAgXCJyZXNvdXJjZVR5cGVcIjogXCJQYXJhbWV0ZXJzXCIsXG4gICAgICAgIFwicGFyYW1ldGVyXCI6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBcIm5hbWVcIjogXCJpZ1wiLFxuICAgICAgICAgICAgXCJ2YWx1ZVN0cmluZ1wiOiBcImhsNy5maGlyLnVzLm1kaSNjdXJyZW50XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBcInJlc291cmNlXCIsXG4gICAgICAgICAgICBcInJlc291cmNlXCI6IGZoaXJSZXNvdXJjZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBcImluY2x1ZGVGb3JtYXR0ZWRSZXNvdXJjZVwiLFxuICAgICAgICAgICAgXCJ2YWx1ZUJvb2xlYW5cIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgXCJuYW1lXCI6IFwiZm9ybWF0XCIsXG4gICAgICAgICAgICBcInZhbHVlU3RyaW5nXCI6IFwiYXBwbGljYXRpb24vZmhpcitqc29uXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBcImluY2x1ZGVGb3JtYXR0ZWRSZXNvdXJjZVwiLFxuICAgICAgICAgICAgXCJ2YWx1ZUJvb2xlYW5cIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgIF1cbiAgICAgIH1cblxuICAgICAgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXG4gICAgICAgIC5zZXQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9maGlyK2pzb24nKTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVzb3VyY2VGb3JtYXQgPT09ICd4bWwnKSB7XG5cbiAgICAgIHJlcXVlc3REYXRhID1cbiAgICAgICAgYDxQYXJhbWV0ZXJzIHhtbG5zPVwiaHR0cDovL2hsNy5vcmcvZmhpclwiPlxuICAgICAgICAgIDxwYXJhbWV0ZXI+XG4gICAgICAgICAgICA8bmFtZSB2YWx1ZT1cImlnXCIvPlxuICAgICAgICAgICAgPHZhbHVlU3RyaW5nIHZhbHVlPVwiaGw3LmZoaXIudXMubWRpIzEuMC4wXCIvPlxuICAgICAgICAgIDwvcGFyYW1ldGVyPlxuICAgICAgICAgIDxwYXJhbWV0ZXI+XG4gICAgICAgICAgICA8bmFtZSB2YWx1ZT1cImZvcm1hdFwiLz5cbiAgICAgICAgICAgIDx2YWx1ZVN0cmluZyB2YWx1ZT1cImFwcGxpY2F0aW9uL2ZoaXIreG1sXCIvPlxuICAgICAgICAgIDwvcGFyYW1ldGVyPlxuICAgICAgICAgIDxwYXJhbWV0ZXI+XG4gICAgICAgICAgICA8bmFtZSB2YWx1ZT1cImluY2x1ZGVGb3JtYXR0ZWRSZXNvdXJjZVwiLz5cbiAgICAgICAgICAgIDx2YWx1ZUJvb2xlYW4gdmFsdWU9XCJ0cnVlXCIvPlxuICAgICAgICAgIDwvcGFyYW1ldGVyPlxuICAgICAgICAgIDxwYXJhbWV0ZXI+XG4gICAgICAgICAgICA8bmFtZSB2YWx1ZT1cInJlc291cmNlXCIgLz5cbiAgICAgICAgICAgIDxyZXNvdXJjZT5cbiAgICAgICAgICAgICAgJHtmaGlyUmVzb3VyY2V9XG4gICAgICAgICAgICA8L3Jlc291cmNlPlxuICAgICAgICAgIDwvcGFyYW1ldGVyPlxuICAgICAgPC9QYXJhbWV0ZXJzPmA7XG4gICAgICBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKClcbiAgICAgICAgLnNldCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2ZoaXIreG1sJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuc2VydmVyQmFzZVVybCArIFwiJHZhbGlkYXRlXCIsIHJlcXVlc3REYXRhLCB7aGVhZGVyczogaGVhZGVyc30pLnBpcGUobWFwKChyZXN1bHQ6IGFueSkgPT4gKFxuICAgICAgcmVzdWx0IGFzIE9iamVjdFxuICAgICkpKTtcbiAgfVxufVxuIl19