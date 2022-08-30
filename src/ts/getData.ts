import type { user } from "./type";
function getInitData() {
  //   let data: user[];
  //   const curYear = new Date().getFullYear();
  //   new Promise((resolve, reject) => {
  //     console.log(111);
  //     setTimeout(() => {
  //       console.log(211);
  //       data = [
  //         {
  //           id: 1,
  //           name: "12.",
  //           birth: 2001,
  //           gender: 1,
  //           phone: "110",
  //           address: {
  //             province: "湖南省",
  //             city: "株洲市",
  //             county: "醴陵市",
  //             detail: "船湾镇",
  //           },
  //         },
  //         {
  //           id: 2,
  //           name: "13.",
  //           birth: 2002,
  //           gender: 0,
  //           phone: "119",
  //           address: {
  //             province: "湖南省",
  //             city: "株洲市",
  //             county: "醴陵市",
  //             detail: "船湾镇",
  //           },
  //         },
  //         {
  //           id: 3,
  //           name: "14.",
  //           birth: 1998,
  //           gender: 1,
  //           phone: "120",
  //           address: {
  //             province: "湖南省",
  //             city: "株洲市",
  //             county: "醴陵市",
  //             detail: "船湾镇",
  //           },
  //         },
  //       ];
  //       resolve(data);
  //     }, 100);
  //   }).then(() => {
  //     // 对数据做一些处理 生日 要今年减去这个值 / 性别 1是男的 0是女的 / address 要转成一个字符串
  //     data.map((user) => {
  //       user.birth = curYear - user.birth;
  //       user.gender = user.gender ? "男" : "女";
  //       if (typeof user.address === "object") {
  //         user.address = `${user.address.province} ${user.address.city} ${user.address.county} ${user.address.detail}`;
  //       }
  //     });
  //     console.log(data);
  //     return data;
  //   });

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let data = [
        {
          id: 1,
          name: "12.",
          birth: 2001,
          gender: 1,
          phone: "110",
          address: {
            province: "湖南省",
            city: "株洲市",
            county: "醴陵市",
            detail: "船湾镇",
          },
        },
        {
          id: 2,
          name: "13.",
          birth: 2002,
          gender: 0,
          phone: "119",
          address: {
            province: "湖南省",
            city: "株洲市",
            county: "醴陵市",
            detail: "船湾镇",
          },
        },
        {
          id: 3,
          name: "14.",
          birth: 1998,
          gender: 1,
          phone: "120",
          address: {
            province: "湖南省",
            city: "株洲市",
            county: "醴陵市",
            detail: "船湾镇",
          },
        },
      ];
      resolve(data);
    }, 100);
  });
}

export default getInitData;
