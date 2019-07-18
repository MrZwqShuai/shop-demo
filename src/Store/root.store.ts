import { observable, action } from "mobx";
class RootStore {
  @observable userId: string = "";
  @observable isLogin: boolean = false;
  @observable token: string = "";
  @observable cartModalVisbile: boolean = false;
  @observable customModal: JSX.Element;
  @action
  toggleCartModalVisbile(): void {
    console.log(this, "RootStore");
    this.cartModalVisbile = !this.cartModalVisbile;
  }
  @action
  setCustomModal(e: JSX.Element): void {
    this.customModal = e;
  }
  /**
   *
   * @param token token值
   */
  @action
  setToken(token: string): void {
    this.token = token;
  }

  @action
  setLogin(isLogin: boolean): void {
    this.isLogin = isLogin;
  }
}

export default new RootStore();
