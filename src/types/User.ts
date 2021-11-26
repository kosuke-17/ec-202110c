export class User {
  constructor(
    //ユーザー
    public _id: number,
    //名前
    private _name: string,
    //Eメール
    private _email: string,
    //パスワード
    private _password: string,
    //郵便番号
    private _zipcode: string,
    //住所
    private _address: string,
    //電話番号
    private _telephone: string
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get email(): string {
    return this._email;
  }

  public set email(email: string) {
    this._email = email;
  }

  public get password(): string {
    return this._password;
  }

  public set password(password: string) {
    this._password = password;
  }

  public get zipcode(): string {
    return this._zipcode;
  }

  public set zipcode(zipcode: string) {
    this._zipcode = zipcode;
  }

  public get address(): string {
    return this._address;
  }

  public set address(address: string) {
    this._address = address;
  }

  public get telephone(): string {
    return this._telephone;
  }

  public set telephone(telephone: string) {
    this._telephone = telephone;
  }
}
