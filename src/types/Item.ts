import { Topping } from './Topping';

export class Item {
  constructor(
    //商品ID
    private _id: number,
    //タイプ
    private _type: string,
    //説明
    private _discription: string,
    //Mの価格
    private _priceM: number,
    //Lの価格
    private _priceL: number,
    //画像パス
    private _imagePath: string,
    //削除フラグ
    private _deleteId: boolean,
    //トッピングリスト
    private _toppingList: Array<Topping>
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get type(): string {
    return this._type;
  }

  public set type(type: string) {
    this._type = type;
  }

  public get discription(): string {
    return this._discription;
  }

  public set discription(discription: string) {
    this._discription = discription;
  }

  public get priceM(): number {
    return this._priceM;
  }

  public set priceM(priceM: number) {
    this._priceM = priceM;
  }

  public get priceL(): number {
    return this._priceL;
  }

  public set priceL(priceL: number) {
    this._priceL = priceL;
  }

  public get imagePath(): string {
    return this._imagePath;
  }

  public set imagePath(imagePath: string) {
    this._imagePath = imagePath;
  }

  public get deleteId(): boolean {
    return this._deleteId;
  }

  public set deleteId(deleteId: boolean) {
    this._deleteId = deleteId;
  }

  public get toppingList(): Array<Topping> {
    return this._toppingList;
  }

  public set toppingList(toppingList: Array<Topping>) {
    this._toppingList = toppingList;
  }
}
