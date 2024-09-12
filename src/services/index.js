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
  async getAll(searchTerm, filters) {
    try {
      let response = await Service.get(
        `/posts?search=${searchTerm}&areaFilter=${filters.areaFilter}&categoryFilter=${filters.categoryFilter}`
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
  async add1(postData) {
    try {
      let response = await Service.post("/posts", postData);
      return response;
    } catch (error) {
      return { errorMassage: error };
    }
  },
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
  /*async getAll(searchTerm) {
    try {
      //return Service.get(`/posts?title=${searchTerm}`);
      let response = await Service.get(`/tesiranjeMongoTAN`);
      let data = response.data;
      console.log("Podaci s backenda", data);
      
      return data;

      //return await Service.get(`/data`);
    } catch (error) {
      console.log("moj error ", error);
    }
  },*/
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
// naš objekt za sve pozive koji se dotiču `comments`
let Comments = {
  //add comment
  async addComment(postId, postData) {
    try {
      let response = await Service.post(`/post/${postId}/comment`, postData);
      return response;
    } catch (error) {
      return { errorMassage: error };
    }
  },
  async delete(postId, commentId) {
    try {
      await Service.delete(
        `/post/:postid${postId}/comments/:comid${commentId}`
      );
    } catch (error) {
      return { errorMassage: error };
    }
  },
};
// naš objekt za sve pozive koji se dotiču `encyclopedia`
let Encyclopedia = {
  async getAll(searchTerm, filters) {
    try {
      let response = await Service.get(
        `/encyclopedia`
        //?search=${searchTerm}&areaFilter=${filters.areaFilter}&categoryFilter=${filters.categoryFilter}
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
      let response = await Service.get(`/post/${encyclopediaId}`);
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
  authenticated() {
    let user = Auth.getUser();
    //promjeno zbog dohvata sa statea
    if (user.token) {
      return true;
    }
    return false;
  },
  //state koristimo kako bi unjeli ove varijable da su dostupne u vue.js
  // get sluzi za takozvane getter funkcije koje funkcijoniraju u js slicno kao computed to jest mogu bit funkcija ali ih možemo čitati poput varijable.
  state: {
    get user() {
      console.log("test case", Auth.getUser());
      return Auth.getUser();
    },
    get authenticated() {
      return Auth.authenticated();
    },
  },
};

export { Service, Posts, Auth, Comments, Encyclopedia }; // exportamo Service za ručne pozive ili Posts za metode.
