import axios from "axios";
//import router from "@/router"; // ovako importamo router izvan VUE componente
import keks from "@/store.js";
import router from "@/router/index.js";

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
    if (error.response.status == 401) {
      console.log("ovdje bacam ");
      Auth.logout();
      //$router.go();
    }
    // console.error('Interceptor', error.response);
  }
);

// naš objekt za sve pozive koji se dotiču `Post`ova
let Posts = {
  async getAll1(searchTerm, filters) {
    // `/posts?title={searchTerm}&key1={filters.key1}&key2={filters.key2}`
    try {
      //return Service.get(`/posts?title=${searchTerm}`);
      let response = await Service.get(
        `/tesiranjePosts?title=${searchTerm}&key1=${filters.key1}&key2=${filters.key2}&key3=${filters.key3}`
      );
      let data = response.data;
      console.log("Podaci s backenda", data);

      data = data.map((element) => {
        return {
          comments: element.comments,
          createdBy: element.createdBy,
          createdByID: element.createdByID,
          date: element.date,
          imgUrl: element.imgUrl,
          text: element.text,
          title: element.title,
        };
      });
      return data;

      //return await Service.get(`/data`);
    } catch (error) {
      console.log("moj error ", error);
    }
  },
  async getAll(searchTerm) {
    try {
      //return Service.get(`/posts?title=${searchTerm}`);
      let response = await Service.get(`/tesiranjeMongoTAN`);
      let data = response.data;
      console.log("Podaci s backenda", data);
      /*data = data.map((doc) => {
      return {
        id: doc.id,
        url: doc.source,
        email: doc.createdBy,
        title: doc.title,
        posted_at: Number(doc.postedAt),
      };
    });*/
      return data;

      //return await Service.get(`/data`);
    } catch (error) {
      console.log("moj error ", error);
    }
  },
  async add(post) {
    let x = {
      name: "Jane Doe",
      email: "jane@abc.com",
      age: 26,
      hobbies: ["databases", "painting", "soccer"],
    };
    let response = await Service.post("/tesiranjeMongoTAN", post);

    return response;
  },
  async delete(postId) {
    let response = await Service.delete(`/tesiranjeMongoTAN/${postId}`);

    return response;
  },
};
// naš objekt za sve pozive koji se dotiču `Auth`
let Auth = {
  async login(email, password) {
    let response = await Service.post("/auth", {
      email: email,
      password: password,
    });
    let user = response.data;
    //spremanje tokena u local storage
    localStorage.setItem("user", JSON.stringify(user));
    return true;
  },
  logout() {
    localStorage.removeItem("user");
  },
  async register(user) {
    let response = await Service.post("/user", {
      name: user.username,
      email: user.email,
      password: user.password,
    });
    console.log("login: ", response.data);
    return true;
  },
  getUser() {
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
  authenticated() {
    let user = Auth.getUser();
    if (user) {
      return true;
    }
    return false;
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

export { Service, Posts, Auth }; // exportamo Service za ručne pozive ili Posts za metode.
