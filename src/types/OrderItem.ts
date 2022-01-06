import { Item } from "./Item";
import { OrderTopping } from "./OrderTopping";

export class OrderItem {
  constructor(
    //注文商品ID
    public _id: number,
    //商品ID
    public _itemId: number,
    //注文ID
    public _orderId: number,
    //数量
    public _quantity: number,
    //サイズ
    public _size: string,
    //商品
    public _item: Item,
    //注文トッピングリスト
    public _orderToppingList: Array<OrderTopping>
  ) {}

  /**
   * 商品の税抜き価格を計算して返す.
   *
   * @remarks 表示されている商品の税抜価格を選択されたオプションで計算する
   * @return 商品の合計金額
   */
  calcSubTotalPrice(
    size: string,
    toppingCount: number,
    quantity: number
  ): number {
    let sizePrice = 0;
    let toppingPrice = 0;
    const mSizePrice = 200;
    const lSizePrice = 300;
    //各サイズを選択された時の商品の金額と、トッピングの金額を取得する
    if (size === "M") {
      sizePrice = this.item.priceM;
      toppingPrice = mSizePrice;
    } else if (size === "L") {
      sizePrice = this.item.priceL;
      toppingPrice = lSizePrice;
    }
    return (sizePrice + toppingPrice * toppingCount) * quantity;
  }

  /**
   * ショッピングカートで商品のサイズごとの単価を返す.
   *
   * @returns 商品の単価
   */
  orderItemUnitPrice(): number {
    let itemPrice = 0;
    if (this.size === "M") {
      itemPrice = this.item.priceM;
    } else if (this.size === "L") {
      itemPrice = this.item.priceL;
    }
    return itemPrice;
  }
  /**
   * トッピングの値段を返す.
   *
   * @remarks サイズによって異なるトッピングの値段を返す。
   * @param orderItemSize - 選択された商品のサイズ
   * @returns サイズごとのトッピングの値段
   */
  toppingPrice(orderItemSize: string): number {
    let toppingPrice = 0;
    //Mサイズを選択した時のトッピングの値段
    const toppingPriceforMsize = 200;
    //Lサイズを選択した時のトッピングの値段
    const toppingPriceforLsize = 300;

    if (orderItemSize === "M") {
      toppingPrice = toppingPriceforMsize;
    } else if (orderItemSize === "L") {
      toppingPrice = toppingPriceforLsize;
    }
    return toppingPrice;
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get itemId(): number {
    return this._itemId;
  }

  public set itemId(itemId: number) {
    this._itemId = itemId;
  }

  public get orderId(): number {
    return this._orderId;
  }

  public set orderId(orderId: number) {
    this._orderId = orderId;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public set quantity(quantity: number) {
    this._quantity = quantity;
  }

  public get size(): string {
    return this._size;
  }

  public set size(size: string) {
    this._size = size;
  }

  public get item(): Item {
    return this._item;
  }

  public set item(item: Item) {
    this._item = item;
  }

  public get orderToppingList(): Array<OrderTopping> {
    return this._orderToppingList;
  }

  public set orderToppingList(orderToppingList: Array<OrderTopping>) {
    this._orderToppingList = orderToppingList;
  }
}
