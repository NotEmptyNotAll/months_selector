import {ErrorHandler, Injectable} from '@angular/core';
import axios from "axios";
import {AxiosInstance} from "axios";
import {Order} from "../orders-page/orders";
import {User} from "./User";

// @ts-ignore
@Injectable({
    providedIn: 'root'

})
export class ApiDataServiceService {

    mainURL: string = 'http://10.102.200.11:5051/'
     testUrl: string = 'http://localhost:5051/'
    private axiosClient: AxiosInstance;
    private errorHandler: ErrorHandler;
    private ordersResp: Order[];
    private users: User[];
    private userData: User;
    private lang: string = 'en'
    public isLoading: boolean = false

    public getLang() {
        return this.lang
    }

    public setLang(lang: string) {
        this.lang = lang
    }


    public getUserData() {
        return this.userData
    }

    public setUserData(user: User) {
        this.userData = user
    }

    constructor() {
        this.axiosClient = axios.create({
            timeout: 3000,
            headers: {
                "X-Initialized-At": Date.now().toString()
            }
        });
    }

    public async getUser<T>(url: string): Promise<T> {

        try {

            var axiosResponse = await this.axiosClient.request<T>({
                method: "get",
                url: this.mainURL + url,
            });

            return (axiosResponse.data);

        } catch (error) {

            return (Promise.reject(this.normalizeError(error)));

        }

    }

    public async testPost<T>(url: string, data: any): Promise<T> {
        this.isLoading = true
        try {

            var axiosResponse = await this.axiosClient.request<T>({
                method: "post",
                data: data,

                url: this.testUrl+url,
            });
            return (axiosResponse.data);

        } catch (error) {
            console.log(error)
            return null;
            // return (Promise.reject(this.normalizeError(error)));

        } finally {
            this.isLoading = false
        }


    }

    public async post<T>(url: string, data: any,applyLoading:boolean): Promise<T> {
        this.isLoading = applyLoading
        try {

            var axiosResponse = await this.axiosClient.request<T>({
                method: "post",
                data: data,
                url: this.mainURL + url,
            });
            return (axiosResponse.data);

        } catch (error) {
            console.log(error)
            return null;
            // return (Promise.reject(this.normalizeError(error)));

        } finally {
            this.isLoading = false
        }


    }

    public async get<T>(url: string): Promise<T> {
        this.isLoading = true
        try {

            var axiosResponse = await this.axiosClient.request<T>({
                method: "get",
                url: this.mainURL + url,
            });

            return (axiosResponse.data);

        } catch (error) {

            return (Promise.reject(this.normalizeError(error)));

        } finally {
            this.isLoading = false
        }


    }


    private normalizeError(error: any) {

        // this.errorHandler.handleError(error);

        // NOTE: Since I'm not really dealing with a production API, this doesn't really
        // normalize anything (ie, this is not the focus of this demo).
        return ({
            id: "-1",
            code: "UnknownError",
            message: "An unexpected error occurred."
        });

    }

}
