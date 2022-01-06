import { Topping } from "./Topping";

export class Item {
  constructor(
    //商品ID
    public _id: number,
    //タイプ
    public _type: string,
    //名前
    public _name: string,
    //説明
    public _description: string,
    //Mの価格
    public _priceM: number,
    //Lの価格
    public _priceL: number,
    //画像パス
    public _imagePath: string,
    //削除フラグ
    public _deleteId: boolean,
    //トッピングリスト
    public _toppingList: Array<Topping>,
    //いいねの状態のフラグ
    public _isFavorite: boolean,
    //いいね数
    public _favoriteCount: number
  ) {}

  public get isFavorite(): boolean {
    return this._isFavorite;
  }

  public set isFavorite(isFavorite: boolean) {
    this._isFavorite = isFavorite;
  }

  public get favoriteCount(): number {
    return this._favoriteCount;
  }

  public set favoriteCount(favoriteCount: number) {
    this._favoriteCount = favoriteCount;
  }

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
  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get description(): string {
    return this._description;
  }

  public set description(description: string) {
    this._description = description;
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
