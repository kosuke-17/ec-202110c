<template>
  <div class="container">
    <div class="row login-page">
      <div class="col s12 z-depth-6 card-panel">
        <h1>お問い合わせ</h1>
        <!-- <div class="error">{{ errorMessage }}</div> -->
        <form class="login-form">
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">account_circle</i>
              <input class="validate" id="name" type="text" v-model="name" />
              <label for="name" data-error="wrong" data-success="right"
                >お名前</label
              >
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">mail_outline</i>
              <input class="validate" id="email" type="email" v-model="email" />
              <label for="email" data-error="wrong" data-success="right"
                >メールアドレス</label
              >
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">mode_edit</i>
              <textarea
                id="textarea"
                class="materialize-textarea"
                v-model="content"
              />
              <label for="textarea" data-error="wrong" data-success="right"
                >お問い合わせ内容</label
              >
            </div>
          </div>
          <div class="row login-btn">
            <button class="btn" type="button" @click="submitToCompany">
              <span>送信</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  private name = "";
  private email = "";
  private content = "";

  async submitToCompany(): Promise<void> {
    const payload = {
      text:
        "お問い合わせがありました\n" +
        "お名前: " +
        this.name +
        "\n" +
        "メールアドレス: " +
        this.email +
        "\n" +
        "【問い合わせ内容】\n" +
        this.content,
    };
    const url =
      "https://hooks.slack.com/services/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";
    if (this.name && this.email && this.content) {
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
      })
        .then((data) => {
          console.log("Success:", data);
          alert("送信が完了しました。");
          this.name = "";
          this.email = "";
          this.content = "";
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      alert("お問い合わせ内容は全て入力してください");
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
</style>
