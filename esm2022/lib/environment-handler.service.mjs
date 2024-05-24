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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: EnvironmentHandlerService, deps: [{ token: 'serverBaseUrl' }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: EnvironmentHandlerService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: EnvironmentHandlerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: ['serverBaseUrl']
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnQtaGFuZGxlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWZoaXItdmFsaWRhdG9yL3NyYy9saWIvZW52aXJvbm1lbnQtaGFuZGxlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUtqRCxNQUFNLE9BQU8seUJBQXlCO0lBRXBDLFlBQTZDLGFBQWtCO1FBQWxCLGtCQUFhLEdBQWIsYUFBYSxDQUFLO0lBQUksQ0FBQztJQUVwRSxvQkFBb0I7UUFDbEIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUN0QyxhQUFhLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBQ0QsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQzs4R0FWVSx5QkFBeUIsa0JBRWhCLGVBQWU7a0hBRnhCLHlCQUF5QixjQUZ4QixNQUFNOzsyRkFFUCx5QkFBeUI7a0JBSHJDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFHYyxNQUFNOzJCQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEVudmlyb25tZW50SGFuZGxlclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoJ3NlcnZlckJhc2VVcmwnKSBwcml2YXRlIHNlcnZlckJhc2VVcmw6IGFueSkgeyB9XG5cbiAgZ2V0RmhpclNlcnZlckJhc2VVUkwoKTogc3RyaW5nIHtcbiAgICBsZXQgc2VydmVyQmFzZVVybCA9IHRoaXMuc2VydmVyQmFzZVVybDtcbiAgICBpZiAoIXRoaXMuc2VydmVyQmFzZVVybC5lbmRzV2l0aChcIi9cIikpIHtcbiAgICAgIHNlcnZlckJhc2VVcmwgPSBzZXJ2ZXJCYXNlVXJsLmNvbmNhdChcIi9cIik7XG4gICAgfVxuICAgIHJldHVybiBzZXJ2ZXJCYXNlVXJsO1xuICB9XG5cbn1cblxuIl19