<template>
  <div class="container">
    <h1 class="page-title">注文内容確認</h1>
    <!-- table -->
    <table class="striped">
      <thead>
        <tr>
          <th class="cart-table-th">商品名</th>
          <th>サイズ、価格(税抜)、数量</th>
          <th>トッピング、価格(税抜)</th>
          <th>小計</th>
        </tr>
      </thead>
      <tbody v-for="(item, index) of orderItemList" v-bind:key="index">
        <tr>
          <td class="cart-item-name">
            <div class="cart-item-icon">
              <img src="img/1.jpg" />
            </div>
            <span>{{ item.item.name }}</span>
            <span>{{ orderItemList }}</span>
          </td>
          <td>
            <span class="price">&nbsp;{{ item.size }}</span
            >&nbsp;&nbsp;{{ item.item.price }}円 &nbsp;&nbsp;
            {{ item.quantity }}個
          </td>
          <td>
            <ul v-for="toppings of item.orderToppingList" v-bind:key="toppings">
              <li>{{ topping.topping.name }}</li>
            </ul>
          </td>
          <td><div class="text-center">円</div></td>
          <td>
            <button class="btn" type="button">
              <span>削除</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="row cart-total-price">
      <div>消費税：8,000円</div>
      <div>ご注文金額合計：38,000円 (税込)</div>
    </div>
    <div class="row order-confirm-btn">
      <button
        class="btn"
        type="button"
        onclick="location.href='order_confirm.html'"
      >
        <span>注文に進む</span>
      </button>
    </div>

    <div class="row cart-total-price">
      <div>消費税：8,000円</div>
      <div>ご注文金額合計：38,000円 (税込)</div>
    </div>

    <h2 class="page-title">お届け先情報</h2>
    <div class="order-confirm-delivery-info">
      <div class="row">
        <div class="input-field">
          <input id="name" type="text" v-model="destinationName" />
          <label for="name">お名前</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input id="email" type="email" v-model="destinationEmail" />
          <label for="email">メールアドレス</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input
            id="zipcode"
            type="text"
            maxlength="7"
            v-model="destinationZipcode"
          />
          <label for="zipcode">郵便番号(ハイフンなし)</label>
          <button class="btn" type="button" @click="searchAddress">
            <span>住所検索</span>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input id="address" type="text" v-model="destinationAddress" />
          <label for="address">住所</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input id="tel" type="tel" v-model="destinationTel" />
          <label for="tel">電話番号</label>
        </div>
      </div>
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
            checked="checked"
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
      <span>
        <label class="order-confirm-payment-method-radio">
          <input
            name="paymentMethod"
            type="radio"
            value="1"
            v-model="status"
            checked="checked"
          />
          <span>代金引換</span>
        </label>
        <label class="order-confirm-payment-method-radio">
          <input name="paymentMethod" type="radio" value="2" v-model="status" />
          <span>クレジットカード</span>
        </label>
      </span>
    </div>
    <div class="row order-confirm-btn">
      <button class="btn" type="button" @click="orderInfomation">
        <span>この内容で注文する</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Order } from "@/types/Order";
import { OrderItem } from "@/types/OrderItem";
import { User } from "@/types/User";
import axios from "axios";
import { format } from "date-fns";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
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
  private deliveryTime = "";
  // 支払い方法
  private paymentMethod = "";
  // ユーザー
  private user = new User(0, "", "", "", "", "", "");
  // 送信用の注文商品をリストで渡す(型の指定をどうするか考える)
  private orderItemFormList: any[] = [];

  /**
   * 注文商品情報の取得
   */
  created(): void {
    this.currentOrderItemList = this.$store.getters.getOrderItemList;
  }

  /**
   * 注文商品情報の送信.
   */
  async orderInfomation(): Promise<void> {
    // リロードするとorderItemFormListがundefindになる(リロード問題発生)
    // console.dir(JSON.stringify(this.orderItemsList));
    for (let item of this.currentOrderItemList) {
      // console.log(item.itemId, item.quantity, item.size);

      this.orderItemFormList.push({
        itemId: item.itemId,
        orderId: item.orderId,
        quantity: item.quantity,
        size: item.size,
      });
    }
    // console.dir(JSON.stringify(this.orderItemFormList));

    this.status = this.paymentMethod;
    // サーバーに送るために日付を加工
    const createOrderDate = new Date(this.orderDate);
    const formatOrderDate = format(
      createOrderDate,
      `yyyy/MM/dd ${this.deliveryTime}:00:00`
    );

    console.dir(
      JSON.stringify({
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
      })
    );

    const response = await axios.post(
      "http://153.127.48.168:8080/ecsite-api/order",
      {
        userId: this.userId,
        status: "1",
        totalPrice: this.totalPrice,
        destinationName: this.destinationName,
        destinationEmail: this.destinationEmail,
        destinationZipcode: this.destinationZipcode,
        destinationAddress: this.destinationAddress,
        destinationTel: this.destinationTel,
        deliveryTime: formatOrderDate,
        paymentMethod: "1",
        orderItemFormList: this.orderItemFormList,
      }
    );
    console.dir(JSON.stringify(response));

    if (response.data.status === "success") {
      this.$router.push("/orderFinished");
    } else if (response.data.status === "error") {
      alert("登録失敗しました。再度カートから購入手続きをお願いします。");
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
}
</script>