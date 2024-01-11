import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
//TODO: how are these sorted?
// The profiles can be found here https://build.fhir.org/ig/HL7/fhir-mdi-ig/toc.html
export class ValidatorConstants {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ValidatorConstants, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ValidatorConstants }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: ValidatorConstants, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLWNvbnN0YW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1maGlyLXZhbGlkYXRvci9zcmMvbGliL3Byb3ZpZGVycy92YWxpZGF0b3ItY29uc3RhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUE7O0FBRzFDLDZCQUE2QjtBQUU3QixvRkFBb0Y7QUFDcEYsTUFBTSxPQUFPLGtCQUFrQjtJQUovQjtRQU1FLGlCQUFZLEdBQUc7WUFDYixFQUFFLElBQUksRUFBRywrQkFBK0IsRUFBdUIsR0FBRyxFQUFFLDRFQUE0RSxFQUFDO1lBQ2pKLEVBQUUsSUFBSSxFQUFHLDJCQUEyQixFQUEyQixHQUFHLEVBQUUsd0VBQXdFLEVBQUM7WUFDN0ksRUFBRSxJQUFJLEVBQUcsK0JBQStCLEVBQXVCLEdBQUcsRUFBRSw0RUFBNEUsRUFBQztZQUNqSixFQUFFLElBQUksRUFBRyx3Q0FBd0MsRUFBYyxHQUFHLEVBQUUsNEVBQTRFLEVBQUM7WUFDakosRUFBRSxJQUFJLEVBQUcsK0NBQStDLEVBQU8sR0FBRyxFQUFFLDRGQUE0RixFQUFDO1lBQ2pLLEVBQUUsSUFBSSxFQUFHLDBCQUEwQixFQUE0QixHQUFHLEVBQUUsdUVBQXVFLEVBQUM7WUFDNUksRUFBRSxJQUFJLEVBQUcsbURBQW1ELEVBQUcsR0FBRyxFQUFFLGlGQUFpRixFQUFDO1lBQ3RKLEVBQUUsSUFBSSxFQUFHLHlDQUF5QyxFQUFhLEdBQUcsRUFBRSxzRkFBc0YsRUFBQztZQUMzSixFQUFFLElBQUksRUFBRywrQkFBK0IsRUFBdUIsR0FBRyxFQUFFLDRFQUE0RSxFQUFDO1lBQ2pKLEVBQUUsSUFBSSxFQUFHLGtDQUFrQyxFQUFvQixHQUFHLEVBQUUsK0VBQStFLEVBQUM7WUFDcEosRUFBRSxJQUFJLEVBQUcsZ0RBQWdELEVBQU0sR0FBRyxFQUFFLDZGQUE2RixFQUFDO1lBQ2xLLEVBQUUsSUFBSSxFQUFHLG9DQUFvQyxFQUFrQixHQUFHLEVBQUUsMEVBQTBFLEVBQUM7WUFDL0ksRUFBRSxJQUFJLEVBQUcsbUNBQW1DLEVBQW1CLEdBQUcsRUFBRSxpRkFBaUYsRUFBQztZQUN0SixFQUFFLElBQUksRUFBRyxpREFBaUQsRUFBSyxHQUFHLEVBQUUsbUZBQW1GLEVBQUM7WUFDeEosRUFBRSxJQUFJLEVBQUcsMkJBQTJCLEVBQTJCLEdBQUcsRUFBRSx3RUFBd0UsRUFBQztZQUM3SSxFQUFFLElBQUksRUFBRyxxQ0FBcUMsRUFBaUIsR0FBRyxFQUFFLGtGQUFrRixFQUFDO1lBQ3ZKLEVBQUUsSUFBSSxFQUFHLGdEQUFnRCxFQUFNLEdBQUcsRUFBRSxxRkFBcUYsRUFBQztZQUMxSixFQUFFLElBQUksRUFBRywyQ0FBMkMsRUFBVyxHQUFHLEVBQUUsaUZBQWlGLEVBQUM7U0FDdkosQ0FBQTtLQVNGO0lBUEMscUJBQXFCO2FBQ2QsYUFBUSxHQUFHLHVEQUF1RCxBQUExRCxDQUEyRDthQUVuRSxzQkFBaUIsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQUFBekQsQ0FBMEQ7YUFDM0Usb0JBQWUsR0FBYSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLE1BQU0sQ0FBQyxBQUF4RCxDQUF5RDthQUN4RSxlQUFVLEdBQVcsSUFBSSxBQUFmLENBQWdCOzhHQTVCdEIsa0JBQWtCO2tIQUFsQixrQkFBa0I7OzJGQUFsQixrQkFBa0I7a0JBSjlCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcblxuQEluamVjdGFibGUoKVxuLy9UT0RPOiBob3cgYXJlIHRoZXNlIHNvcnRlZD9cblxuLy8gVGhlIHByb2ZpbGVzIGNhbiBiZSBmb3VuZCBoZXJlIGh0dHBzOi8vYnVpbGQuZmhpci5vcmcvaWcvSEw3L2ZoaXItbWRpLWlnL3RvYy5odG1sXG5leHBvcnQgY2xhc3MgVmFsaWRhdG9yQ29uc3RhbnRzIHtcblxuICBQUk9GSUxFX0xJU1QgPSBbXG4gICAgeyBuYW1lIDogXCJCdW5kbGUgLSBEb2N1bWVudCBNREkgdG8gRURSU1wiLCAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovL2hsNy5vcmcvZmhpci91cy9tZGkvU3RydWN0dXJlRGVmaW5pdGlvbi9CdW5kbGUtZG9jdW1lbnQtbWRpLXRvLWVkcnNcIn0sXG4gICAgeyBuYW1lIDogXCJDb21wb3NpdGlvbiAtIE1ESSB0byBFRFJTXCIsICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovL2hsNy5vcmcvZmhpci91cy9tZGkvU3RydWN0dXJlRGVmaW5pdGlvbi9Db21wb3NpdGlvbi1tZGktdG8tZWRyc1wifSxcbiAgICB7IG5hbWUgOiBcIkxpc3QgLSBDYXVzZSBvZiBEZWF0aCBQYXRod2F5XCIsICAgICAgICAgICAgICAgICAgICAgIHVybDogXCJodHRwOi8vaGw3Lm9yZy9maGlyL3VzL21kaS9TdHJ1Y3R1cmVEZWZpbml0aW9uL0xpc3QtY2F1c2Utb2YtZGVhdGgtcGF0aHdheVwifSxcbiAgICB7IG5hbWUgOiBcIk9ic2VydmF0aW9uIC0gQ2F1c2Ugb2YgRGVhdGggQ29uZGl0aW9uXCIsICAgICAgICAgICAgIHVybDogXCJodHRwOi8vaGw3Lm9yZy9maGlyL3VzL21kaS9TdHJ1Y3R1cmVEZWZpbml0aW9uL0xpc3QtY2F1c2Utb2YtZGVhdGgtcGF0aHdheVwifSxcbiAgICB7IG5hbWUgOiBcIk9ic2VydmF0aW9uIC0gQ29uZGl0aW9uIENvbnRyaWJ1dGluZyB0byBEZWF0aFwiLCAgICAgIHVybDogXCJodHRwOi8vaGw3Lm9yZy9maGlyL3VzL21kaS9TdHJ1Y3R1cmVEZWZpbml0aW9uL09ic2VydmF0aW9uLWNvbmRpdGlvbi1jb250cmlidXRpbmctdG8tZGVhdGhcIn0sXG4gICAgeyBuYW1lIDogXCJPYnNlcnZhdGlvbiAtIERlYXRoIERhdGVcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovL2hsNy5vcmcvZmhpci91cy9tZGkvU3RydWN0dXJlRGVmaW5pdGlvbi9PYnNlcnZhdGlvbi1kZWF0aC1kYXRlXCJ9LFxuICAgIHsgbmFtZSA6IFwiT2JzZXJ2YXRpb24gLSBEZWF0aCBJbmp1cnkvRXZlbnQgT2NjdXJyZWQgYXQgV29ya1wiLCAgdXJsOiBcImh0dHA6Ly9obDcub3JnL2ZoaXIvdXMvbWRpL1N0cnVjdHVyZURlZmluaXRpb24vT2JzZXJ2YXRpb24tZGVhdGgtaW5qdXJ5LWF0LXdvcmtcIn0sXG4gICAgeyBuYW1lIDogXCJPYnNlcnZhdGlvbiAtIEhvdyBEZWF0aCBJbmp1cnkgT2NjdXJyZWRcIiwgICAgICAgICAgICB1cmw6IFwiaHR0cDovL2hsNy5vcmcvZmhpci91cy9tZGkvU3RydWN0dXJlRGVmaW5pdGlvbi9PYnNlcnZhdGlvbi1ob3ctZGVhdGgtaW5qdXJ5LW9jY3VycmVkXCJ9LFxuICAgIHsgbmFtZSA6IFwiT2JzZXJ2YXRpb24gLSBNYW5uZXIgb2YgRGVhdGhcIiwgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly9obDcub3JnL2ZoaXIvdXMvbWRpL1N0cnVjdHVyZURlZmluaXRpb24vT2JzZXJ2YXRpb24tbWFubmVyLW9mLWRlYXRoXCJ9LFxuICAgIHsgbmFtZSA6IFwiT2JzZXJ2YXRpb24gLSBEZWNlZGVudCBQcmVnbmFuY3lcIiwgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly9obDcub3JnL2ZoaXIvdXMvbWRpL1N0cnVjdHVyZURlZmluaXRpb24vT2JzZXJ2YXRpb24tZGVjZWRlbnQtcHJlZ25hbmN5XCJ9LFxuICAgIHsgbmFtZSA6IFwiT2JzZXJ2YXRpb24gLSBUb2JhY2NvIFVzZSBDb250cmlidXRlZCB0byBEZWF0aFwiLCAgICAgdXJsOiBcImh0dHA6Ly9obDcub3JnL2ZoaXIvdXMvbWRpL1N0cnVjdHVyZURlZmluaXRpb24vT2JzZXJ2YXRpb24tdG9iYWNjby11c2UtY29udHJpYnV0ZWQtdG8tZGVhdGhcIn0sXG4gICAgeyBuYW1lIDogXCJCdW5kbGUgLSBNZXNzYWdlIFRveGljb2xvZ3kgdG8gTURJXCIsICAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovL2hsNy5vcmcvZmhpci91cy9tZGkvU3RydWN0dXJlRGVmaW5pdGlvbi9CdW5kbGUtbWVzc2FnZS10b3gtdG8tbWRpXCJ9LFxuICAgIHsgbmFtZSA6IFwiTWVzc2FnZUhlYWRlciAtIFRveGljb2xvZ3kgdG8gTURJXCIsICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly9obDcub3JnL2ZoaXIvdXMvbWRpL1PiiIZ0cnVjdHVyZURlZmluaXRpb24vTWVzc2FnZUhlYWRlci10b3hpY29sb2d5LXRvLW1kaVwifSxcbiAgICB7IG5hbWUgOiBcIkRpYWdub3N0aWNSZXBvcnQgLSBUb3hpY29sb2d5IExhYiBSZXN1bHQgdG8gTURJXCIsICAgIHVybDogXCJodHRwOi8vaGw3Lm9yZy9maGlyL3VzL21kaS9TdHJ1Y3R1cmVEZWZpbml0aW9uL0RpYWdub3N0aWNSZXBvcnQtdG94aWNvbG9neS10by1tZGlcIn0sXG4gICAgeyBuYW1lIDogXCJTcGVjaW1lbiAtIFRveGljb2xvZ3kgTGFiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovL2hsNy5vcmcvZmhpci91cy9tZGkvU3RydWN0dXJlRGVmaW5pdGlvbi9TcGVjaW1lbi10b3hpY29sb2d5LWxhYlwifSxcbiAgICB7IG5hbWUgOiBcIk9ic2VydmF0aW9uIC0gVG94aWNvbG9neSBMYWIgUmVzdWx0XCIsICAgICAgICAgICAgICAgIHVybDogXCJodHRwOi8vaGw3Lm9yZy9maGlyL3VzL21kaS9TdHJ1Y3R1cmVEZWZpbml0aW9uL09ic2VydmF0aW9uLXRveGljb2xvZ3ktbGFiLXJlc3VsdFwifSxcbiAgICB7IG5hbWUgOiBcIlJlc291cmNlIFByb2ZpbGU6IFVTIENvcmUgUHJhY3RpdGlvbmVyIFByb2ZpbGVcIiwgICAgIHVybDogXCJodHRwOi8vaGw3Lm9yZy9maGlyL3VzL2NvcmUvU1RVNC9TdHJ1Y3R1cmVEZWZpbml0aW9uLXVzLWNvcmUtcHJhY3RpdGlvbmVyLmh0bWwjcm9vdFwifSxcbiAgICB7IG5hbWUgOiBcIlJlc291cmNlIFByb2ZpbGU6IFVTIENvcmUgUGF0aWVudCBQcm9maWxlXCIsICAgICAgICAgIHVybDogXCJodHRwczovL2hsNy5vcmcvZmhpci91cy9jb3JlL1NUVTQvU3RydWN0dXJlRGVmaW5pdGlvbi11cy1jb3JlLXBhdGllbnQuaHRtbCNyb290XCJ9LFxuICBdXG5cbiAgLy8gVmFsaWRhdG9yIEFQSSBsaW5rXG4gIHN0YXRpYyBQUk9EX1VSSSA9IFwiaHR0cHM6Ly9oZWF0LmljbC5ndHJpLm9yZy9maGlyLXZhbGlkYXRvci1zZXJ2aWNlL2ZoaXJcIjtcblxuICBzdGF0aWMgRElTUExBWUVEX0NPTFVNTlMgPSBbJ3RvZ2dsZScsICdpY29uJywgJ3NldmVyaXR5JywgJ2ZoaXJQYXRoJywgJ2xvY2F0aW9uJ107XG4gIHN0YXRpYyBTRVZFUklUWV9MRVZFTFM6IHN0cmluZ1tdID0gWydlcnJvcicsICd3YXJuaW5nJywgJ2luZm9ybWF0aW9uJywgJ25vdGUnXTtcbiAgc3RhdGljIEZPTlRfV0lEVEg6IG51bWJlciA9IDcuNTQ7XG5cbn1cbiJdfQ==