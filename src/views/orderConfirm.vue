<template>
  <div class="container">
    <h1 class="page-title">注文内容確認</h1>
    <!-- table -->
    <div class="row">
      <table class="striped">
        <thead>
          <tr>
            <th class="cart-table-th">商品名</th>
            <th>サイズ、価格(税抜)、数量</th>
            <th>トッピング、価格(税抜)</th>
            <th>小計</th>
          </tr>
        </thead>
        <tbody
          v-for="(orderItem, index) of currentOrderItemList"
          v-bind:key="orderItem.id"
        >
          <tr>
            <td class="cart-item-name">
              <div class="cart-item-icon">
                <img :src="orderItem.item.imagePath" />
              </div>
              <span>{{ orderItem.item.name }}</span>
            </td>
            <td>
              <span class="price">&nbsp;{{ orderItem.size }}</span
              >&nbsp;&nbsp;{{ orderItem.orderItemUnitPrice(index) }}円
              &nbsp;&nbsp; {{ orderItem.quantity }}個
            </td>
            <td>
              <ul
                v-for="topping of orderItem.orderToppingList"
                v-bind:key="topping.id"
              >
                <li>
                  {{ topping.name }}&nbsp;（{{
                    orderItem.toppingPrice(orderItem.size)
                  }}円）
                </li>
              </ul>
            </td>
            <td>
              <div class="text-center">
                {{
                  orderItem
                    .calcSubTotalPrice(
                      orderItem.size,
                      orderItem.orderToppingList.length,
                      orderItem.quantity
                    )
                    .toLocaleString()
                }}円
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row cart-total-price">
      <div>消費税：8,000円</div>
      <div>ご注文金額合計：38,000円 (税込)</div>
    </div>

    <h2 class="page-title">お届け先情報</h2>
    <div class="order-confirm-delivery-info">
      <label class="item-topping">
        <input
          type="checkbox"
          v-model="changeAddressFlag"
          v-on:change="changeAddress()"
        />
        <span>お届け先を変更する</span>
      </label>

      <div class="row">
        <div class="errorMessage">{{ errorDestinationName }}</div>
        <div class="input-field">
          <input id="name" type="text" v-model="destinationName" />
          <label for="name" class="active">お名前</label>
        </div>
      </div>
      <div class="row">
        <div class="errorMessage">{{ errorDestinationEmail }}</div>
        <div class="input-field">
          <input id="email" type="email" v-model="destinationEmail" />
          <label for="email" class="active">メールアドレス</label>
        </div>
      </div>
      <div class="row">
        <div class="errorMessage">{{ errorDestinationZipcode }}</div>
        <div class="input-field">
          <input
            id="zipcode"
            type="number"
            v-model="destinationZipcode"
            oninput="javascript:if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="7"
          />
          <label for="zipcode" class="active">郵便番号(ハイフンなし)</label>
          <button class="btn" type="button" @click="searchAddress">
            <span>住所検索</span>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="errorMessage">{{ errorDestinationAddress }}</div>
        <div class="input-field">
          <input id="address" type="text" v-model="destinationAddress" />
          <label for="address" class="active">住所</label>
        </div>
      </div>
      <div class="row">
        <div class="errorMessage">{{ errorDestinationTel }}</div>
        <div class="input-field">
          <input
            id="tel"
            type="tel"
            v-model="destinationTel"
            oninput="javascript:if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="11"
          />
          <label for="tel" class="active">電話番号(ハイフンなし)</label>
        </div>
      </div>
      <div class="errorMessage">{{ errorOrderDate }}</div>
      <div class="row order-confirm-delivery-datetime">
        <div class="input-field">
          <!-- typeはdatetime-localでも良い？ -->
          <input id="deliveryDate" type="date" v-model="orderDate" />
          <label for="address">配達日時</label>
        </div>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="10"
            v-model="deliveryTime"
          />
          <span>10時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="11"
            v-model="deliveryTime"
          />
          <span>11時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="12"
            v-model="deliveryTime"
          />
          <span>12時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="13"
            v-model="deliveryTime"
          />
          <span>13時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="14"
            v-model="deliveryTime"
          />
          <span>14時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="15"
            v-model="deliveryTime"
          />
          <span>15時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="16時"
            v-model="deliveryTime"
          />
          <span>16時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="17"
            v-model="deliveryTime"
          />
          <span>17時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="18"
            v-model="deliveryTime"
          />
          <span>18時</span>
        </label>
      </div>
    </div>

    <h2 class="page-title">お支払い方法</h2>
    <div class="row order-confirm-payment-method">
      <div class="selectPaymentMethod">
        <span>
          <label class="order-confirm-payment-method-radio">
            <input
              name="paymentMethod"
              type="radio"
              value="1"
              v-model="paymentMethod"
            />
            <span>代金引換</span>
          </label>
          <label class="order-confirm-payment-method-radio">
            <input
              name="paymentMethod"
              type="radio"
              value="2"
              v-model="paymentMethod"
            />
            <span>クレジットカード</span>
          </label>
        </span>
      </div>
      <div class="creditCard" v-if="paymentMethod == 2">
        <div class="row creditNum">
          <div class="errorMessage">{{ errorCreditCardNumber }}</div>
          <div class="input-field col s12">
            <input
              id="creditNum"
              type="number"
              class="validate"
              oninput="javascript:if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="16"
              v-model="creditCardNumber"
            />
            <label for="creditNum">クレジットカード番号</label>
          </div>
        </div>
        <div class="errorMessage">{{ errorCreditCardExpiryDate }}</div>
        <div class="expiryDate">
          <div>
            <label for="expiryDate">有効期限：</label>
            <select
              class="browser-default expiryMonth"
              v-model="creditCardExpiryMonth"
            >
              <option value="" disabled selected>選択してください</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>
          <div>
            <br />
            <label></label>
            <select
              class="browser-default expiryMonth"
              v-model="creditCardExpiryYear"
            >
              <option value="" disabled selected>選択してください</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="errorMessage">{{ errorCreditCardName }}</div>
          <div class="input-field col s12">
            <input
              id="creditName"
              type="text"
              class="validate"
              maxlength="50"
              v-model="creditCardName"
            />
            <label for="creditName">カード名義人</label>
          </div>
        </div>
        <div class="row">
          <div class="errorMessage">{{ errorSecurityCode }}</div>
          <div class="input-field col s12">
            <input
              id="securityCode"
              type="number"
              class="validate"
              oninput="javascript:if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="4"
              v-model="securityCode"
            />
            <label for="securityCode">セキュリティコード</label>
          </div>
        </div>
      </div>
      <div class="row order-confirm-btn">
        <button class="btn" type="button" @click="orderItems">
          <span>この内容で注文する</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { OrderItem } from "@/types/OrderItem";
import { User } from "@/types/User";
import axios from "axios";
import { format } from "date-fns";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class OrderConfirm extends Vue {
  // カートに入っている商品
  private currentOrderItemList = new Array<OrderItem>();
  // 消費税
  private tax = 0;
  // ユーザーID
  private userId = 0;
  // 状態
  private status = "";
  // 税込合計金額
  private totalPrice = 0;
  // 注文日
  private orderDate = "";
  // 宛先氏名
  private destinationName = "";
  // 宛先Eメール
  private destinationEmail = "";
  // 宛先郵便番号
  private destinationZipcode = "";
  // 宛先住所
  private destinationAddress = "";
  // 宛先電話番号
  private destinationTel = "";
  // 配達日時
  private deliveryTime = "10";
  // 支払い方法
  private paymentMethod = "1";
  // ユーザー
  private user = new User(0, "", "", "", "", "", "");
  private orderItemFormList: any[] = [];
  // 宛先氏名のエラーメッセージ
  private errorDestinationName = "";
  // 宛先Eメールのエラーメッセージ
  private errorDestinationEmail = "";
  // 宛先郵便番号のエラーメッセージ
  private errorDestinationZipcode = "";
  // 宛先住所のエラーメッセージ
  private errorDestinationAddress = "";
  // 宛先電話番号のエラーメッセージ
  private errorDestinationTel = "";
  // 配達日時のエラーメッセージ
  private errorOrderDate = "";
  // クレジットカード番号
  private creditCardNumber = "";
  //有効期限（月）
  private creditCardExpiryMonth = "選択してください";
  //有効期限（年）
  private creditCardExpiryYear = "選択してください";
  //カード名義人
  private creditCardName = "";
  //セキュリティコード
  private securityCode = "";
  //クレジットカード番号のエラーメッセージ
  private errorCreditCardNumber = "";
  //有効期限のエラーメッセージ
  private errorCreditCardExpiryDate = "";
  //カード名義人のエラーメッセージ
  private errorCreditCardName = "";
  //セキュリティコードのエラーメッセージ
  private errorSecurityCode = "";
  //届け先を変更するフラグ
  private changeAddressFlag = false;
  /**
   *注文確認画面表示の準備.
   *
   * @remarks ショッピングカートに入っている商品の配列を変数に格納.
   *
   */
  created(): void {
    this.currentOrderItemList = this.$store.getters.getOrderItemList;

    //ログインユーザーの届け先情報を自動入力する
    this.autoInput();
  }

  /**
   * 注文商品情報の送信.
   *
   * @remarks クレジットカード決済（paymentMethod = "2"）を選択された時は、外部APIを呼んでクレジットカード情報を送信する
   */
  async orderItems(): Promise<void> {
    // 入力値エラーチェックし、エラーが１つ以上あれば処理を止める
    if (this.hasErrorsWithUserInformation() == true) {
      return;
    }
    // 支払い方法によって、金額受け渡しのステータスを変える
    if (this.paymentMethod === "1") {
      this.status = "1";
    } else if (this.paymentMethod === "2") {
      this.status = "2";
    }
    // リロードするとorderItemFormListがundefindになる(リロード問題発生)
    for (let item of this.currentOrderItemList) {
      this.orderItemFormList.push({
        itemId: item.itemId,
        orderId: item.orderId,
        quantity: item.quantity,
        size: item.size,
      });
    }

    // サーバーに送るために日付を加工
    const createOrderDate = new Date(this.orderDate);
    const formatOrderDate = format(
      createOrderDate,
      `yyyy/MM/dd ${this.deliveryTime}:00:00`
    );

    /*
     *クレジットカード情報を送信する。
     *
     *本メソッドは非同期でWebAPIを呼び出しクレジットカード情報を送信するためasync/await axiosを利用。
     *これらを利用する場合は明示的に戻り値にPromiseオブジェクト型を指定する必要が。
     */
    if (this.status === "2") {
      // 入力値エラーチェックし、エラーが１つ以上あれば処理を止める
      if (this.hasErrorsWithCreditCardInformation() == true) {
        return;
      }
      const creditCardResponse = await axios.post(
        "http://153.127.48.168:8080/sample-credit-card-web-api/credit-card/payment",
        {
          user_id: this.userId,
          amount: this.totalPrice,
          card_number: this.creditCardNumber,
          card_exp_year: this.creditCardExpiryYear,
          card_exp_month: this.creditCardExpiryMonth,
          card_name: this.creditCardName,
          card_cvv: this.securityCode,
        }
      );
      //クレジットカード情報が不正の場合はエラーメッセージを表示する
      if (creditCardResponse.data.status === "error") {
        alert("クレジットカード情報が不正です");
        return;
        //クレジットカード情報の送信に成功した場合は、注文処理に移る
      }
    }
    const response = await axios.post(
      "http://153.127.48.168:8080/ecsite-api/order",
      {
        userId: this.userId,
        status: this.status,
        totalPrice: this.totalPrice,
        destinationName: this.destinationName,
        destinationEmail: this.destinationEmail,
        destinationZipcode: this.destinationZipcode,
        destinationAddress: this.destinationAddress,
        destinationTel: this.destinationTel,
        deliveryTime: formatOrderDate,
        paymentMethod: this.paymentMethod,
        orderItemFormList: this.orderItemFormList,
      }
    );

    if (response.data.status === "success") {
      //成功した場合は、注文完了画面に遷移する
      this.$store.commit("resetOrderItemList");
      this.$router.push("/orderFinished");
    } else if (response.data.status === "error") {
      //失敗した場合はエラーメッセージを表示する
      alert("購入できませんでした。再度カートから購入手続きをお願いします。");
      this.$router.push("/cartList");
    }
  }

  /**
   * 郵便番号から住所情報を取得.
   *
   * @returns Promiseオブジェクト
   */
  async searchAddress(): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const axiosJsonpAdapter = require("axios-jsonp");
      const response = await axios.get("https://zipcoda.net/api", {
        adapter: axiosJsonpAdapter,
        params: {
          zipcode: this.destinationZipcode,
        },
      });
      this.destinationAddress = response.data.items[0].components.join("");
      console.log("成功");
    } catch (e) {
      alert("正しい郵便番号を入力してください");
    }
  }
  /**
   * お届け先情報のエラーチェック処理.
   *
   * @returns エラーがある:true / エラーがない:false
   */
  private hasErrorsWithUserInformation(): boolean {
    let hasError = false;
    this.errorDestinationName = "";
    this.errorDestinationEmail = "";
    this.errorDestinationZipcode = "";
    this.errorDestinationAddress = "";
    this.errorDestinationTel = "";
    this.errorOrderDate = "";

    if (this.destinationName === "") {
      this.errorDestinationName = "お名前を入力してください";
      hasError = true;
    }
    if (this.destinationEmail === "") {
      this.errorDestinationEmail = "メールアドレスを入力してください";
      hasError = true;
    }
    if (this.destinationZipcode === "") {
      this.errorDestinationZipcode = "郵便番号を入力してください";
      hasError = true;
    }
    if (this.destinationAddress === "") {
      this.errorDestinationAddress = "住所を入力してください";
      hasError = true;
    }
    if (this.destinationTel === "") {
      this.errorDestinationTel = "電話番号を入力してください";
      hasError = true;
    }
    if (this.deliveryTime === "" || this.orderDate === "") {
      this.errorOrderDate = "配達日時を選択してください";
      hasError = true;
    }
    return hasError;
  }
  /**
   * クレジットカード情報のエラーチェック処理.
   *
   * @returns エラーがある:true / エラーがない:false
   */
  private hasErrorsWithCreditCardInformation(): boolean {
    let hasError = false;
    this.errorCreditCardNumber = "";
    this.errorCreditCardExpiryDate = "";
    this.errorCreditCardName = "";
    this.errorSecurityCode = "";

    if (this.creditCardNumber === "") {
      this.errorCreditCardNumber = "クレジットカード番号を入力してください";
      hasError = true;
    } else if (
      this.creditCardNumber.length !== 14 &&
      this.creditCardNumber.length !== 16
    ) {
      this.errorCreditCardNumber =
        "14桁か16桁のクレジットカード番号を入力してください";
      hasError = true;
    }
    if (
      this.creditCardExpiryMonth === "選択してください" ||
      this.creditCardExpiryYear === "選択してください"
    ) {
      this.errorCreditCardExpiryDate = "有効期限を入力してください";
      hasError = true;
    }
    if (this.creditCardName === "") {
      this.errorCreditCardName = "カード名義人を入力してください";
      hasError = true;
    } else if (this.creditCardName.length > 50) {
      this.errorCreditCardName = "カード名義人は50文字以内で入力してください";
      hasError = true;
    } else if (this.isHalfWidthAlpha(this.creditCardName) === false) {
      this.errorCreditCardName = "半角のアルファベットで入力してください";
      hasError = true;
    }
    if (this.securityCode === "") {
      this.errorSecurityCode = "セキュリティコードを入力してください";
      hasError = true;
    } else if (
      this.securityCode.length !== 3 &&
      this.securityCode.length !== 4
    ) {
      this.errorSecurityCode = "3桁か4桁のセキュリティコードを入力してください";
      hasError = true;
    }
    return hasError;
  }

  /**
   * 半角英字を含むか判定.
   *
   * @returns 半角英字がある:true / 半角英字がない:false
   */
  private isHalfWidthAlpha(creditCardName: string) {
    if (creditCardName.match(/^[A-Za-z]*$/)) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * ログインユーザー情報をお届け先情報に自動入力する
   */
  autoInput(): void {
    this.destinationName = this["$store"].getters.getLoginUserInfo._name;
    this.destinationEmail = this["$store"].getters.getLoginUserInfo._email;
    this.destinationZipcode = this["$store"].getters.getLoginUserInfo._zipcode;
    this.destinationAddress = this["$store"].getters.getLoginUserInfo._address;
    this.destinationTel = this["$store"].getters.getLoginUserInfo._telephone;
  }

  /**
   * 届け先入力欄を空欄にする
   * @remarks 届け先情報を登録されているユーザー情報とは異なる届け先をしていたいとき、
   *          届け先を変更するにチェックを入れると、自動入力されていた情報がリセットされる
   */
  changeAddress(): void {
    if (this.changeAddressFlag === true) {
      this.destinationName = "";
      this.destinationEmail = "";
      this.destinationZipcode = "";
      this.destinationAddress = "";
      this.destinationTel = "";
    }
  }
}
</script>

<style scoped>
@charset "UTF-8";

.order-confirm-delivery-info {
  margin: 0 200px 0 200px;
}

.order-confirm-delivery-datetime {
  text-align: center;
}

.order-confirm-delivery-time {
  margin-right: 10px;
}

.order-confirm-payment-method {
  text-align: left;
  width: 60%;
  margin: 0 auto;
}

.order-confirm-payment-method-radio {
  margin-right: 10px;
}
.expiryDate {
  display: flex;
}

.cardCredit {
  text-align: center;
}

.expiryDate {
  margin-bottom: 20px;
}

.order-confirm-btn {
  text-align: center;
  margin-top: 20px;
}

.errorMessage {
  color: red;
}

.selectPaymentMethod {
  text-align: center;
}
.creditNum {
  margin-top: 20px;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.cart-table-th {
  text-align: center;
}

.cart-item-icon img {
  margin: auto;
  display: block;
  border-radius: 20px;
  width: 100px;
  height: 100px;
  padding: 0 0 15px 0;
}
.cart-item-name {
  text-align: center;
  font-size: 15px;
}

.cart-total-price {
  font-size: 35px;
  text-align: center;
}

.order-confirm-btn {
  text-align: center;
}
.price {
  background-color: #ff4500;
  border-radius: 50%; /* 角丸にする設定 */
  color: black;
}
</style>
