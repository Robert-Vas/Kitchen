import { Component, OnInit } from '@angular/core';
import { Order, OrderStatus } from 'src/app/shared/model/order.model';
import { OrderModel, OrderService } from 'src/app/shared/services/firebase-api/order.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss']
})
export class QrScannerComponent implements OnInit {

  public scannerEnabled = false;
  public confirmIsVisible = false;
  public errorIsVisible = false;
  public order: OrderModel;
  public errorMessage = '';
  private orderNo = '';
  private confirmationNo = '';
  public dishes = [];
  private orderSubscription: Subscription;
  

  constructor(private orderService: OrderService, private modalService: NzModalService) { }

  ngOnInit() {
  }

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
  }

  public scanSuccessHandler($event: any) {
    this.scannerEnabled = false;
    this.parseQrCode($event);
    this.getOrder();
  }

  private parseQrCode(code: string) {
    let orderInfo = code.split('|');
    this.orderNo = orderInfo[0];
    this.confirmationNo = orderInfo[1];
  }

  private markOrderComplete() {
    this.order.status = OrderStatus.Done;
    this.orderSubscription.unsubscribe();
    this.orderService.editOrder(this.order, this.order.id);
    this.showSuccessMessage();
  }

  private getOrder() {
    this.orderSubscription = this.orderService.getOrderWithSubModels(this.orderNo).subscribe(o => {
      console.log(o);
      this.order = o[0];
      if (!this.order) {
        this.showErrorModal('Unable to find order no. ' + this.orderNo);
      }
      else if (!this.confirmOrder()) {
        this.showErrorModal('Unable to confirm order.');
      }
      else {
        this.checkStatus();
      }
    }); 
  }

  private checkStatus() {
    if (this.order.status != OrderStatus.Start && this.order.status != OrderStatus.Ready) {
      this.showErrorModal('Order status is ' + this.order.status + ". Cannot confirm order.");
    }
    else {
      this.showConfirmModal();
    }
  }

  private confirmOrder() {
    return this.confirmationNo === this.order.paymentId;
  }

  private showConfirmModal(): void {
    this.confirmIsVisible = true;
  }

  private handleConfirmOk(): void {
    this.confirmIsVisible = false;
    this.markOrderComplete();
  }

  private handleConfirmCancel(): void {
    this.confirmIsVisible = false;
    this.scannerEnabled = false;
  }

  private showErrorModal(message: string): void {
    this.errorMessage = message;
    this.errorIsVisible = true;
  }

  private handleErrorOk(): void {
    this.errorIsVisible = false;
  }

  private showSuccessMessage(): void {
    const modal = this.modalService.success({
      nzTitle: 'Order confirmed.',
      nzContent: 'Order number ' + this.order.id + ' has been confirmed.'
    });

    setTimeout(() => modal.destroy(), 1500);
  }
}
