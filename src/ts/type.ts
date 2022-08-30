interface address {
  province: string;
  city: string;
  county: string;
  detail: string;
}

interface user {
  id: number;
  name: string;
  birth: number;
  gender: number | string;
  phone: string;
  //   address: address | string;
  address: any;
}

interface Data {
  userInfos: user[];
  showInfos: any[];
  user: user;
  addressValue: any;
  birthValue: Date;
}

export { user, Data, address };
