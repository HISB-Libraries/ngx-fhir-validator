export interface ValidationResults {
    isValid?: boolean | null;
    hasBasicErrors?: boolean;
    infoCount?: number;
    notesCount?: number;
    warningsCount?: number;
    errorsCount?: number;
    resource?: string | null;
}
