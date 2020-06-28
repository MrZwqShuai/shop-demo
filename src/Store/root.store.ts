import { observable, action } from "mobx";
class RootStore {
  @observable userId: string = "";
  @observable userInfo: object = {};
  @observable isLogin: boolean = false;
  @observable token: string = "";
  @observable cartModalVisbile: boolean = false;
  @observable addressModalVisbile: boolean = false;
  @observable modalVisibleType: string = "";
  @observable modalVisible: { CART: boolean; ADDRESS: boolean } = {
    CART: false,
    ADDRESS: false,
  };
  @observable customModal: JSX.Element;

  @action
  toggleModalVisible(modalVisibleType: string): void {
    this.modalVisible[modalVisibleType] = !this.modalVisible[modalVisibleType];
  }

  @action
  setToggleModalVisible(modalVisibleType: string, visible: boolean): void {
    this.modalVisible[modalVisibleType] = visible;
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

  @action
  setUserInfo(userInfo: object): void {
    this.userInfo = userInfo;
  }
}

export default new RootStore();
