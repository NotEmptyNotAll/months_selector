import {Component, OnInit} from '@angular/core';
import {REGION} from "../region-page/mock-region";
import {Order} from "./orders";
import {ApiDataServiceService} from "../Service/api-data-service.service";
import {TableDataService} from "../table-page/tableData.service";
import {OrderService} from "./order.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
    data: Order[]
    mainColumn: any[]

    constructor(public apiService: ApiDataServiceService,
                public tableService:TableDataService,
                public orderService:OrderService,
                private router: Router) {
        if(orderService.getUserValidate()){
            this.getOrd()
        }else {
            this.router.navigate(['/'])
        }
    }

    async getOrd() {
     // this.data = await this.apiService.get<Order[]>('getCroppedOrders')
        this.data=this.orderService.getOrders()
      this.mainColumn = [
        {field:  'id', header:'Order id ', width: '30%'},
        {field: 'orderName', header: 'Order no', width: '30%'},
        {field: 'customerId', header: 'Customer id ', width: '30%'},
        {field: 'date', header: 'Date', width: '30%'},
        {field: 'jobsSum', header: 'Jobs sum', width: '30%'},
        {field: 'componentsSum', header: 'Components sum', width: '30%'}
      ];
        this.tableService.setMainData(this.data)

    }

    ngOnInit() {

    }

}