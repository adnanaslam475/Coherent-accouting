export interface UserStatistics {
    requestsPerDay: RequestsPerDay[];
    requestsPerMicroservice: RequestsPerMicroservice[];
}

export interface RequestsPerDay {
    date: string;
    requests: number;
}

export interface RequestsPerMicroservice {
    microServiceName: string;
    percent: number;
    requests: number;
}

export interface UserLocation {
    isForUpdate: boolean;
}

export interface Country {
    country: string;
    isoAlpha2Country: string;
}

export interface UserLocationDialogData {
    isoAlpha2Country: string;
    accountType: string;
}
