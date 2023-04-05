import { ResponseItem } from "./response-item";
export interface ApiResponse {
    formattedResource: string;
    issues: ResponseItem[];
}
