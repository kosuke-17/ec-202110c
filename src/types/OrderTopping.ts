import { Topping } from "./Topping";

export class OrderTopping {
  constructor(
    //注文トッピングID
    public _id: number,
    //トッピングID
    private _toppingId: number,
    //注文商品ID
    private _orderItemId: number,
    //トッピング
    private _Topping: Array<Topping>
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get toppingId(): number {
    return this._toppingId;
  }

  public set toppingId(toppingId: number) {
    this._toppingId = toppingId;
  }

  public get orderItemId(): number {
    return this._orderItemId;
  }

  public set orderItemId(orderItemId: number) {
    this._orderItemId = orderItemId;
  }

  public get Topping(): Array<Topping> {
    return this._Topping;
  }

  public set Topping(Topping: Array<Topping>) {
    this._Topping = Topping;
  }
}
