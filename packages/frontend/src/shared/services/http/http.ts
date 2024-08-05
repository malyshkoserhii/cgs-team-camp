import axios from "axios"
import { APP_KEYS } from "~shared/consts";
import { SERVER_URL } from "~shared/consts/app-keys.const";

class HttpService {
    constructor(
        public baseUrl: string = SERVER_URL,
        public fetchingService: typeof axios = axios,
        public apiVersion: string = 'api'
    ) {}

    private getFullApiUrl(url: string): string {
        return `${this.baseUrl}/${this.apiVersion}/${url}`;
    }

    private populateTokenToHeaderConfig() {
        return {
            'Authorization': localStorage.getItem(APP_KEYS.STORAGE_KEYS.TOKEN) || '',
        };
    }

    private extractUrlAndDataFromConfig({ data, url, ...configWithoutDataAndUrl }: any): any {
        return configWithoutDataAndUrl;
    }

    async get(config: any, withAuth: boolean = true) {
        if (withAuth) {
            config.headers = {
                ...config.headers,
                ...this.populateTokenToHeaderConfig(),
            };
        }
        const response = await this.fetchingService.get(this.getFullApiUrl(config.url), this.extractUrlAndDataFromConfig(config));
        return response.data;
    }

    async post(config: any, withAuth: boolean = true) {
        if (withAuth) {
            config.headers = {
                ...config.headers,
                ...this.populateTokenToHeaderConfig(),
            };
        }
        const response = await this.fetchingService.post(this.getFullApiUrl(config.url), config.data, this.extractUrlAndDataFromConfig(config));
        if (config.receiveAuthHeader) {
            const token = response.headers['authorization'];
            localStorage.setItem(APP_KEYS.STORAGE_KEYS.TOKEN, token);
        }
        return response.data;
    }

    async put(config: any, withAuth: boolean = true) {
        if (withAuth) {
            config.headers = {
                ...config.headers,
                ...this.populateTokenToHeaderConfig(),
            };
        }
        const response = await this.fetchingService.put(this.getFullApiUrl(config.url), config.data, this.extractUrlAndDataFromConfig(config));
        return response.data;
    }

    async delete(config: any, withAuth: boolean = true) {
        if (withAuth) {
            config.headers = {
                ...config.headers,
                ...this.populateTokenToHeaderConfig(),
            };
        }
        const response = await this.fetchingService.delete(this.getFullApiUrl(config.url), this.extractUrlAndDataFromConfig(config));
        return response.data;
    }
}

export default HttpService;