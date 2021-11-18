import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  BarModel,
  ChartModel,
  GoodsModel,
  OrderDetailModel,
  Order,
  UserModel,
  DishesModel,
  Delivery,
  OrderStatus,
  PaymentSummary,
  PaymentType,
  Pickup,
} from "../../model";
import { MyError } from "./my-error";
import { BaseService } from "./base.service";
import {
  groupBy,
  map,
  mergeMap,
  switchMap,
  takeLast,
  toArray,
} from "rxjs/operators";
import { combineLatest, from, Observable, of } from "rxjs";
import { uniq, sumBy } from "lodash";
import { NzModalService } from "ng-zorro-antd";
import * as firebase from 'firebase/app';

// todo: make this depend on the Order DTO
export type OrderModel = (Pickup | Delivery) & {
  id?: string;
  userId: string;
  createdOn: string;
  paymentType: PaymentType;
  paymentId?: string;
  status: OrderStatus;
  orderedDishes: {
    id: string;
    count: number;
    price: number;
    readyOn: Date;
    model: DishesModel;
  }[];
  paymentSummary: PaymentSummary;
};

@Injectable({ providedIn: "root" })
export class OrderService extends BaseService<Order> {
  constructor(
    public db: AngularFirestore,
    public myErr: MyError,
    public modalService: NzModalService
  ) {
    super(db, myErr, "orders", modalService);
  }

  getList1() {
    return this.db
      .collection<Order>("orders")
      .snapshotChanges()
      .pipe(
        switchMap((orders) => {
          const orderIds = uniq(orders.map((o) => o.payload.doc.id));
          const userIds = uniq(orders.map((o) => o.payload.doc.data().userId));
          return combineLatest(
            of(
              orders.map((o) => ({
                id: o.payload.doc.id,
                ...o.payload.doc.data(),
              }))
            ),
            combineLatest(
              orderIds.map((orderId) =>
                this.db
                  .collection<OrderDetailModel>("orderdetail", (ref) =>
                    ref.where("orderId", "==", orderId)
                  )
                  .valueChanges()
                  .pipe(
                    map((detail) => detail[0]),
                    mergeMap((detail) => {
                      return this.db
                        .doc<GoodsModel>(`/goods/${detail.goodId}`)
                        .valueChanges()
                        .pipe(map((g) => ({ ...g, ...detail })));
                    })
                  )
              )
            ),
            combineLatest(
              userIds.map((userId) =>
                this.db
                  .doc<UserModel>(`/users/${userId}`)
                  .snapshotChanges()
                  .pipe(
                    map((user) => ({
                      id: user.payload.id,
                      ...user.payload.data(),
                    }))
                  )
              )
            )
          );
        }),
        map(([orders, details, users]) => {
          return orders.map((order) => {
            const user = users.find((u) => u.id === order.userId);
            return {
              ...order,
              details: details.filter((d) => d.orderId === order.id),
              userName: user ? user.displayName : "",
            };
          });
        })
      );
  }

  getOrderList() {
    return this.db
      .collection<Order>("orders")
      .snapshotChanges()
      .pipe(
        switchMap((orders) => {
          const orderIds = uniq(orders.map((o) => o.payload.doc.id));
          const userIds = uniq(orders.map((o) => o.payload.doc.data().userId));
          if (orders.length > 0) {
            return combineLatest(
              of(
                orders.map((o) => ({
                  id: o.payload.doc.id,
                  ...o.payload.doc.data(),
                }))
              ),
              combineLatest(
                orderIds.map((orderId) =>
                  this.db
                    .collection<OrderDetailModel>("orderdetail", (ref) =>
                      ref.where("orderId", "==", orderId)
                    )
                    .valueChanges()
                    .pipe(
                      mergeMap((detail) => {
                        return combineLatest(
                          detail.map((d) => {
                            return this.db
                              .doc<GoodsModel>(`/goods/${d.goodId}`)
                              .valueChanges()
                              .pipe(map((g) => ({ ...d, ...g })));
                          })
                        );
                      })
                    )
                )
              ),
              combineLatest(
                userIds.map((userId) =>
                  this.db
                    .doc<UserModel>(`/users/${userId}`)
                    .snapshotChanges()
                    .pipe(
                      map((user) => ({
                        id: user.payload.id,
                        ...user.payload.data(),
                      }))
                    )
                )
              )
            );
          } else {
            return of([], [], []);
          }
        }),
        map(([orders, details, users]) => {
          return orders
            ? orders.map((order) => {
                const user = users.find((u) => u.id === order.userId);
                return {
                  ...order,
                  details: details
                    .map((d) => d.filter((de) => de.orderId === order.id))
                    .filter((c) => c.length > 0)[0],
                  userName: user ? user.displayName : "",
                };
              })
            : [];
        })
      );
  }

  getOrderList1() {
    return combineLatest([
      this.db.collection<Order>("orders").snapshotChanges(),
      this.db.collection<OrderDetailModel>("orderdetail").snapshotChanges(),
      this.db.collection<GoodsModel>("goods").snapshotChanges(),
      this.db.collection<UserModel>("users").snapshotChanges(),
    ]).pipe(
      map((results) => {
        const orderList = results[0].map((action) => {
          const data = action.payload.doc.data();
          return { id: action.payload.doc.id, ...data } as Order;
        });
        const detailList = results[1].map((action) => {
          const data = action.payload.doc.data();
          return { id: action.payload.doc.id, ...data } as OrderDetailModel;
        });
        const goodList = results[2].map((action) => {
          const data = action.payload.doc.data();
          return { id: action.payload.doc.id, ...data } as GoodsModel;
        });
        const userList = results[3].map((action) => {
          const data = action.payload.doc.data();
          return { id: action.payload.doc.id, ...data } as UserModel;
        });
        const dgList = detailList.map((d) => {
          const good = goodList.find((g) => g.id === d.goodId);
          return { ...d, ...good };
        });
        return orderList
          ? orderList.map((order) => {
              const user = userList.find((u) => u.id === order.userId);
              return {
                ...order,
                details: dgList.filter((d) => d.orderId === order.id),
                userName: user ? user.displayName : "",
              };
            })
          : [];
      })
    );
  }

  // I am sorry for making another one of these, but I was too confused and pressed for time to learn what the others even were for
  // free story: consolidate the order service
  getListAgain(): Observable<OrderModel[]> {
    return combineLatest([
      this.db
        .collection<Order>("orders", (order) => order.orderBy("createdOn", "asc"))
        .snapshotChanges() // we don't have a high enough version of angular fire to use { idField: "id" }
        .pipe(
          // therefore, we have to add id to the order ourselves
          map((actions) =>
            actions.map((action) => {
              const data = action.payload.doc.data() as Order;
              const id = action.payload.doc.id;
              return { id, ...data };
            })
          )
        ),
      this.db.collection<DishesModel>("dishes").valueChanges(),
    ]).pipe(
      // combine the orders and dishes into one big model
      map(([orders, dishes]) =>
        orders.map((order) => {
          const orderedDishes = Object.entries(order.orderedDishes || {});
          return <OrderModel>{
            ...order,
            orderedDishes: orderedDishes.map(([dishId, dish]) => {
              const model = dishes.find((d) => d.id === dishId);
              return {
                id: dishId,
                model,
                ...dish,
              };
            }),
          };
        })
      )
    );
  }

  getBarList(): Observable<Array<BarModel>> {
    return this.db
      .collection<Order>("orders", (model) => model.orderBy("date", "asc"))
      .valueChanges()
      .pipe(
        switchMap((orders) => {
          return from(orders).pipe(
            groupBy((g) => (g.createdOn || (g as any).date).substring(0, 10)),
            mergeMap((group) => group.pipe(toArray())),
            map((arr) => {
              return new BarModel({
                name: (arr[0].createdOn || (arr[0] as any).date).substring(
                  0,
                  10
                ),
                value: +sumBy(arr, "total").toFixed(2),
              });
            }),
            takeLast(10),
            toArray()
          );
        })
      );
  }

  getBarHorizontalList(): Observable<Array<BarModel>> {
    return combineLatest([
      this.db.collection<OrderDetailModel>("orderdetail").snapshotChanges(),
      this.db.collection<GoodsModel>("goods").snapshotChanges(),
    ]).pipe(
      map(([orderDetails, goods]) => {
        const detailList = orderDetails.map((action) => {
          const data = action.payload.doc.data();
          return { id: action.payload.doc.id, ...data } as OrderDetailModel;
        });
        const goodList = goods.map((action) => {
          const data = action.payload.doc.data();
          return { id: action.payload.doc.id, ...data } as GoodsModel;
        });
        const cateList = new Array<BarModel>();
        detailList.forEach((d) => {
          const cateName = goodList.find((g) => g.id === d.goodId).cateName;
          cateList.push({ name: cateName, value: d.num });
        });
        return from(cateList).pipe(
          groupBy((g) => g.name),
          mergeMap((group) => group.pipe(toArray())),
          map((arr) => {
            return new BarModel({
              name: arr[0].name,
              value: sumBy(arr, "value"),
            });
          }),
          toArray()
        );
      }),
      mergeMap((r) => r)
    );
  }

  getSaleAndNums(count = 15): Observable<Array<ChartModel>> {
    return this.db
      .collection<Order>("orders", (model) => model.orderBy("date", "asc"))
      .snapshotChanges()
      .pipe(
        switchMap((orders) => {
          const detailList = orders.map((action) => {
            const data = action.payload.doc.data();
            return { id: action.payload.doc.id, ...data } as Order;
          });
          return from(detailList).pipe(
            groupBy((g) => g.createdOn.substring(0, 10)),
            mergeMap((group) => group.pipe(toArray())),
            map((arr) => {
              return new ChartModel({
                name: arr[0].createdOn.substring(0, 10),
                sales: +sumBy(arr, "total").toFixed(2),
                num: sumBy(arr, "num"),
              });
            }),
            takeLast(count),
            toArray()
          );
        })
      );
  }

  getOrderWithSubModels(id) {
    return combineLatest([
      this.db
        .collection<Order>("orders", (ref) =>
        ref.where(firebase.firestore.FieldPath.documentId(), "==", id))
        .snapshotChanges() // we don't have a high enough version of angular fire to use { idField: "id" }
        .pipe(
          // therefore, we have to add id to the order ourselves
          map((actions) =>
            actions.map((action) => {
              const data = action.payload.doc.data() as Order;
              const id = action.payload.doc.id;
              return { id, ...data };
            })
          )
        ),
      this.db.collection<DishesModel>("dishes").valueChanges(),
    ]).pipe(
      // combine the orders and dishes into one big model
      map(([orders, dishes]) =>
        orders.map((order) => {
          const orderedDishes = Object.entries(order.orderedDishes || {});
          return <OrderModel>{
            ...order,
            orderedDishes: orderedDishes.map(([dishId, dish]) => {
              const model = dishes.find((d) => d.id === dishId);
              return {
                id: dishId,
                model,
                ...dish,
              };
            }),
          };
        })
      )
    );
  }

  editOrder(body, id) {
    return this.db.collection('orders').doc(id).update(body);
  }
}
