import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {AutoComplete} from "primeng/autocomplete";
import {OrderRequest} from "../order.request";
import {SimpleData} from "../SimpleData";
import {FilterService} from "../filter.service";
import {ApiDataServiceService} from "../../../Service/api-data-service.service";

@Component({
  selector: 'app-work-item-filter-page',
  templateUrl: './work-item-filter-page.component.html',
  styleUrls: ['./work-item-filter-page.component.css']
})
export class WorkItemFilterPageComponent implements OnInit {

  @Output() onSuggest: EventEmitter<any> = new EventEmitter();

  private work = {name: '', id: null}
  @ViewChild(AutoComplete) chidFilter: AutoComplete

  // @Output() onSuggest: EventEmitter<any> = new EventEmitter();
  private orderRequest: OrderRequest
  private works: any[] = []
  filtered: any[];
  selected: SimpleData;

  constructor(public filterService: FilterService,
              public apiService: ApiDataServiceService,
  ) {
  }

  ngOnInit(): void {
    this.getCustomer('');
  }

  filter(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    // let query = event.query;
    // for (let i = 0; i < this.customers.length; i++) {
    //     let stat = this.customers[i];
    //     if (stat.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
    //         filteredTemp.push(stat);
    //     }
    // }

    this.getCustomer(event.query)
  }

  async getCustomer(name) {
    this.apiService.applySubLoading=false
    this.works = await this.apiService.post<SimpleData[]>('getWorkItems'
        , {name: name, sizeResponse: 50}, false)
  }

  clear() {
    this.orderRequest = this.filterService.getOrderRequest()
    this.orderRequest.workId = null
    this.filterService.setOrderRequest(this.orderRequest)

    this.onSuggest.emit();
    this.getCustomer('')
  }


  changeState() {

    this.orderRequest = this.filterService.getOrderRequest()
    if (this.selected !== null && this.selected.id !== undefined && this.selected.id !== null) {
      this.orderRequest.workId = this.selected.id
    } else {
      this.orderRequest.workId = null
    }
    this.filterService.setOrderRequest(this.orderRequest)

    this.onSuggest.emit();

  }
}
