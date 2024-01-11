import { Inject, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class EnvironmentHandlerService {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: EnvironmentHandlerService, deps: [{ token: 'serverBaseUrl' }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: EnvironmentHandlerService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: EnvironmentHandlerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: ['serverBaseUrl']
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnQtaGFuZGxlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWZoaXItdmFsaWRhdG9yL3NyYy9saWIvZW52aXJvbm1lbnQtaGFuZGxlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUtqRCxNQUFNLE9BQU8seUJBQXlCO0lBRXBDLFlBQTZDLGFBQWtCO1FBQWxCLGtCQUFhLEdBQWIsYUFBYSxDQUFLO0lBQUksQ0FBQztJQUVwRSxvQkFBb0I7UUFDbEIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDckMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDM0M7UUFDRCxPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDOzhHQVZVLHlCQUF5QixrQkFFaEIsZUFBZTtrSEFGeEIseUJBQXlCLGNBRnhCLE1BQU07OzJGQUVQLHlCQUF5QjtrQkFIckMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQUdjLE1BQU07MkJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRW52aXJvbm1lbnRIYW5kbGVyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdCgnc2VydmVyQmFzZVVybCcpIHByaXZhdGUgc2VydmVyQmFzZVVybDogYW55KSB7IH1cblxuICBnZXRGaGlyU2VydmVyQmFzZVVSTCgpOiBzdHJpbmcge1xuICAgIGxldCBzZXJ2ZXJCYXNlVXJsID0gdGhpcy5zZXJ2ZXJCYXNlVXJsO1xuICAgIGlmICghdGhpcy5zZXJ2ZXJCYXNlVXJsLmVuZHNXaXRoKFwiL1wiKSkge1xuICAgICAgc2VydmVyQmFzZVVybCA9IHNlcnZlckJhc2VVcmwuY29uY2F0KFwiL1wiKTtcbiAgICB9XG4gICAgcmV0dXJuIHNlcnZlckJhc2VVcmw7XG4gIH1cblxufVxuXG4iXX0=