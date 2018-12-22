export interface IService {
    baseUrl: string;
}

export class BaseService implements IService {
    get baseUrl(): string {
        if (window.location.hostname.indexOf('localhost') >= 0) {
            return 'http://localhost:8000/api';
        }
        return 'https://mpgagolf.pythonanywhere.com/api';
    }
    get authUrl(): string {
        if (window.location.hostname.indexOf('localhost') >= 0) {
            return 'http://localhost:8000/rest-auth';
        }
        return  'https://mpgagolf.pythonanywhere.com/rest-auth';
    }
}
