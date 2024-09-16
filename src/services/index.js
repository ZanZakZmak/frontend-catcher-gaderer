import axios from "axios";
//import router from "@/router"; // ovako importamo router izvan VUE componente
import keks from "@/store.js";
import router from "@/router/index.js";
import { info } from "sass";

let Service = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000,
});

//setting headers
// prije svakog poslanog requesta na backend izvrši:
Service.interceptors.request.use((request) => {
  try {
    request.headers["Authorization"] = "Bearer " + Auth.getToken();
  } catch (error) {
    console.error(error);
  }
  return request;
});

// nakon svakog odgovora s backenda izvrši:
Service.interceptors.response.use(
  (response) => {
    console.log("Interceptor", response);
    return response;
  },
  (error) => {
    console.log("Interceptor", error);
    if (error.response.status == 401) {
      console.log("ovdje bacam ");
      Auth.logout();
      //$router.go();
    }
    return error;
    // console.error('Interceptor', error.response);
  }
);

// naš objekt za sve pozive koji se dotiču `Post`ova
let Posts = {
  Social: {
    async getAll(searchTerm, filters) {
      try {
        let response = await Service.get(
          `/posts/social?search=${searchTerm}&areaFilter=${filters.areaFilter}&categoryFilter=${filters.categoryFilter}`
        );
        let data = response.data;
        console.log("Podaci s backenda", data);

        data = data.map((element) => {
          return {
            id: element._id,
            title: element.title,
            text: element.text,
            imgUrl: element.imgUrl,
            createdBy: element.createdBy,
            createdByID: element.createdByID,
            createdTime: element.createdTime,
            area: element.area,
            category: [...element.category],
            comments: [...element.comments],
          };
        });
        return data;

        //return await Service.get(`/data`);
      } catch (error) {
        console.log("moj error ", error);
      }
    },
    async add(postData) {
      try {
        let response = await Service.post("/posts", postData);
        return response;
      } catch (error) {
        return { errorMassage: error };
      }
    },
  },
  // naš objekt za sve pozive koji se dotiču `info`
  Info: {
    async getAll(searchTerm, filters) {
      try {
        let response = await Service.get(
          `/posts/info?search=${searchTerm}&infoTypeFilter=${filters.infoTypeFilter}&categoryFilter=${filters.categoryFilter}`
        );
        let data = response.data;
        console.log("Podaci s backenda", data);

        data = data.map((element) => {
          return {
            id: element._id,
            title: element.title,
            text: element.text,
            imgUrl: element.imgUrl,
            createdBy: element.createdBy,
            createdByID: element.createdByID,
            createdTime: element.createdTime,
            infoType: element.infoType,
            category: [...element.category],
            comments: [...element.comments],
          };
        });
        return data;

        //return await Service.get(`/data`);
      } catch (error) {
        console.log("moj error ", error);
      }
    },
    async add(postData) {
      try {
        let response = await Service.post("/posts", postData);
        return response;
      } catch (error) {
        return { errorMassage: error };
      }
    },
  },
  //funkcije za single post
  async getOne(postId) {
    try {
      let response = await Service.get(`/post/${postId}`);
      let data = response.data;
      console.log("Podaci s backenda", data);
      return data;
    } catch (error) {
      console.log("moj error ", error);
    }
  },
  async delete(postId) {
    //let response = await Service.delete(`/tesiranjeMongoTAN/${postId}`);
    //return response;
  },
  // naš objekt za sve pozive koji se dotiču `comments`
  Comments: {
    //add comment
    async add(postId, postData) {
      try {
        let response = await Service.post(
          `/posts/${postId}/comments`,
          postData
        );
        return response;
      } catch (error) {
        return { errorMassage: error };
      }
    },
    async delete(postId, commentId) {
      try {
        await Service.delete(`/posts/${postId}/comments/${commentId}`);
      } catch (error) {
        return { errorMassage: error };
      }
    },
  },
};

// naš objekt za sve pozive koji se dotiču `encyclopedia`
let Encyclopedia = {
  async getAll(searchTerm, filters) {
    try {
      let response = await Service.get(
        `/encyclopedia?search=${searchTerm}&poisonousFilter=${filters.poisonousFilter}&categoryFilter=${filters.categoryFilter}`
      );
      let data = response.data;
      console.log("Podaci s backenda", data);

      data = data.map((element) => {
        return {
          id: element._id,
          name: element.name,
          nameLat: element.nameLat,
          namesAlt: element.namesAlt,
          imgUrl: element.imgUrl,
          poison: element.poison,
          category: element.category,
          description: element.description,
        };
      });
      return data;

      //return await Service.get(`/data`);
    } catch (error) {
      console.log("moj error ", error);
    }
  },
  async add(encyclopediaData) {
    try {
      let response = await Service.post("/encyclopedia", encyclopediaData);
      return response;
    } catch (error) {
      return { errorMassage: error };
    }
  },
  async getOne(encyclopediaId) {
    try {
      let response = await Service.get(`/encyclopedia/${encyclopediaId}`);
      let data = response.data;
      console.log("Podaci s backenda", data);
      return data;
    } catch (error) {
      console.log("moj error ", error);
    }
  },
};

// naš objekt za sve pozive koji se dotiču `Auth`
let Auth = {
  async login(email, password) {
    let response = await Service.post("/auth", {
      email: email,
      password: password,
    });

    //preko statusa za axsios error
    if (response.status > 300) {
      //return response.response.data.error;
      return false;
    } else {
      let user = response.data;
      //spremanje tokena u local storage
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    }
  },
  logout() {
    localStorage.removeItem("user");
  },
  async register(user) {
    let response = await Service.post("/user", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
    console.log("login: ", response.status);

    //preko statusa za axsios error
    if (response.status > 300) {
      //return response.response.data.error;
      console.log("desio se false");
      return false;
    } else {
      console.log("desio se true");
      return true;
    }
  },
  getUser() {
    //promjenio zbog statea
    if (localStorage.length === 0) {
      return { token: null, id: null, userName: null, email: null };
    }
    return JSON.parse(localStorage.getItem("user"));
  },
  getToken() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      return user.token;
    } else {
      return false;
    }
  },
  // provjera jesmo li autentificirani
  //used ?
  authenticated() {
    let user = Auth.getUser();
    //promjeno zbog dohvata sa statea
    if (user?.token) {
      return true;
    }
    return false;
  },

  //edit profile rute
  async changePassword(newPassword, oldPassword) {
    let response = await Service.patch("/user/password", {
      newPassword: newPassword,
      oldPassword: oldPassword,
    });

    //preko statusa za axsios error
    if (response.status > 300) {
      return response.response.data.error;
    } else {
      return "uspjesna promjena";
    }
  },
  async changeEmail(newEmail, oldPassword) {
    let response = await Service.patch("/user/email", {
      newEmail: newEmail,
      oldPassword: oldPassword,
    });
    //preko statusa za axsios error
    if (response.status > 300) {
      return response.response.data.error;
    } else {
      return "uspjesna promjena";
    }
  },
  async changeUsername(newUsername, oldPassword) {
    let response = await Service.patch("/user/username", {
      newUsername: newUsername,
      oldPassword: oldPassword,
    });
    //preko statusa za axsios error
    if (response.status > 300) {
      return response.response.data.error;
    } else {
      return "uspjesna promjena";
    }

    /* try {
    } catch (error) {
      // Handle the error from the backend
      if (error.response) {
        // If the server responded with a non-2xx status
        console.log("response error", error.response.data.error);
      } else {
        // Handle any other errors (like network issues)
        console.log("response error An unexpected error occurred");
      }
    }*/
  },
  //state koristimo kako bi unjeli ove varijable da su dostupne u vue.js
  // get sluzi za takozvane getter funkcije koje funkcijoniraju u js slicno kao computed to jest mogu bit funkcija ali ih možemo čitati poput varijable.
  state: {
    get user() {
      return Auth.getUser();
    },
    get authenticated() {
      return Auth.authenticated();
    },
  },
};

export { Service, Posts, Auth, Encyclopedia }; // exportamo Service za ručne pozive ili Posts za metode.
