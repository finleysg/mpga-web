export interface IService {
  baseUrl: string;
  authUrl: string;
}

export class BaseService implements IService {
  useLocal: boolean;

  get baseUrl(): string {
    if (this.useLocal && window.location.hostname.indexOf('localhost') >= 0) {
      return 'http://localhost:8000/api';
    }
    return 'https://mpgagolf.pythonanywhere.com/api';
  }
  get authUrl(): string {
    if (this.useLocal && window.location.hostname.indexOf('localhost') >= 0) {
      return 'http://localhost:8000/rest-auth';
    }
    return 'https://mpgagolf.pythonanywhere.com/rest-auth';
  }
  get adminUrl(): string {
    if (this.useLocal && window.location.hostname.indexOf('localhost') >= 0) {
      return 'http://localhost:8000/admin/';
    }
    return 'https://mpgagolf.pythonanywhere.com/admin/';
  }
}
